import { CognitoIdentityServiceProvider } from "aws-sdk";

export class CognitoService {
  private cognito: CognitoIdentityServiceProvider;

  constructor() {
    this.cognito = new CognitoIdentityServiceProvider();
  }

  async createUser(email: string, password: string) {
    const params = {
      UserPoolId: process.env.COGNITO_USER_POOL_ID!,
      Username: email,
      UserAttributes: [
        { Name: "email", Value: email },
        { Name: "email_verified", Value: "true" },
        { Name: "custom:role", Value: "admin" },
      ],
      TemporaryPassword: password,
      MessageAction: "SUPPRESS",
    };

    const result = await this.cognito.adminCreateUser(params).promise();

    if (result.User) {
      await this.setUserPassword(email, password);
    }

    return result.User;
  }

  async setUserPassword(username: string, password: string) {
    await this.cognito
      .adminSetUserPassword({
        UserPoolId: process.env.COGNITO_USER_POOL_ID!,
        Username: username,
        Password: password,
        Permanent: true,
      })
      .promise();
  }

  async getUser(username: string) {
    return this.cognito
      .adminGetUser({
        UserPoolId: process.env.COGNITO_USER_POOL_ID!,
        Username: username,
      })
      .promise();
  }

  async getAllUsers(paginationToken?: string) {
    const params: CognitoIdentityServiceProvider.ListUsersRequest = {
      UserPoolId: process.env.COGNITO_USER_POOL_ID!,
      ...(paginationToken && { PaginationToken: paginationToken }),
    };

    return this.cognito.listUsers(params).promise();
  }
}
