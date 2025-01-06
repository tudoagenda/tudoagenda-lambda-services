import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { CognitoIdentityServiceProvider, KMS } from "aws-sdk";

interface CreateUserRequest {
  email: string;
  password: string;
}

export const handleCreateUser = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Request body is required" }),
      };
    }

    const { email, password }: CreateUserRequest = JSON.parse(event.body);

    if (!email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Email and password are required",
        }),
      };
    }

    const kms = new KMS();
    const cognito = new CognitoIdentityServiceProvider();

    // Check if user exists
    try {
      await cognito
        .adminGetUser({
          UserPoolId: process.env.COGNITO_USER_POOL_ID!,
          Username: email,
        })
        .promise();

      // User exists, update password
      const decryptedPassword = await kms
        .decrypt({
          CiphertextBlob: Buffer.from(password, "base64"),
          KeyId: process.env.KMS_KEY_ID!,
        })
        .promise();

      if (!decryptedPassword.Plaintext) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Failed to decrypt password" }),
        };
      }

      await cognito
        .adminSetUserPassword({
          UserPoolId: process.env.COGNITO_USER_POOL_ID!,
          Username: email,
          Password: decryptedPassword.Plaintext.toString("utf-8"),
          Permanent: true,
        })
        .promise();

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "User password updated successfully",
          user: {
            username: email,
            updated: new Date().toISOString(),
          },
        }),
      };
    } catch (userError: any) {
      // User doesn't exist, proceed with creation
      if (userError.code === "UserNotFoundException") {
        // Decrypt the password using KMS
        const decryptedPassword = await kms
          .decrypt({
            CiphertextBlob: Buffer.from(password, "base64"),
            KeyId: process.env.KMS_KEY_ID!,
          })
          .promise();

        if (!decryptedPassword.Plaintext) {
          return {
            statusCode: 400,
            body: JSON.stringify({ message: "Failed to decrypt password" }),
          };
        }

        const params = {
          UserPoolId: process.env.COGNITO_USER_POOL_ID!,
          Username: email,
          UserAttributes: [
            {
              Name: "email",
              Value: email,
            },
            {
              Name: "email_verified",
              Value: "true",
            },
          ],
          TemporaryPassword: decryptedPassword.Plaintext.toString("utf-8"),
          MessageAction: "SUPPRESS",
        };

        const result = await cognito.adminCreateUser(params).promise();

        if (result.User) {
          // Set the permanent password
          await cognito
            .adminSetUserPassword({
              UserPoolId: process.env.COGNITO_USER_POOL_ID!,
              Username: email,
              Password: decryptedPassword.Plaintext.toString("utf-8"),
              Permanent: true,
            })
            .promise();

          return {
            statusCode: 200,
            body: JSON.stringify({
              message: "User created successfully",
              user: {
                username: result.User.Username,
                attributes: result.User.Attributes,
                created: result.User.UserCreateDate,
              },
            }),
          };
        }

        throw new Error("Failed to create user");
      }
      throw userError;
    }
  } catch (error) {
    console.error("handleCreateUser Error: ", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error", error }),
    };
  }
};
