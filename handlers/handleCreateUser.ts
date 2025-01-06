import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { KMSService } from "../services/kms.service";
import { CognitoService } from "../services/cognito.service";
import { createErrorResponse } from "../utils/responses";

const kmsService = new KMSService();
const cognitoService = new CognitoService();

export const handleCreateUser = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  try {
    if (!event.body) {
      return createErrorResponse(400, "Request body is required");
    }

    const { email, password } = JSON.parse(event.body);

    if (!email || !password) {
      return createErrorResponse(400, "Email and password are required");
    }

    const decryptedPassword = await kmsService.decrypt(password);

    try {
      await cognitoService.getUser(email);
      await cognitoService.setUserPassword(email, decryptedPassword);

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "User password updated successfully",
          user: { username: email, updated: new Date().toISOString() },
        }),
      };
    } catch (userError: any) {
      if (userError.code === "UserNotFoundException") {
        const user = await cognitoService.createUser(email, decryptedPassword);

        return {
          statusCode: 200,
          body: JSON.stringify({
            message: "User created successfully",
            user: {
              username: user?.Username,
              attributes: user?.Attributes,
              created: user?.UserCreateDate,
            },
          }),
        };
      }
      throw userError;
    }
  } catch (error) {
    console.error("handleCreateUser Error: ", error);
    return createErrorResponse(500, "Internal server error");
  }
};
