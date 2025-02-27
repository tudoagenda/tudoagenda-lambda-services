import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { CognitoService } from "../services/cognito.service";
import { createErrorResponse } from "../utils/responses";

const cognitoService = new CognitoService();

export const handleGetAllAgendabelaUsers = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  try {
    const paginationToken = event.queryStringParameters?.paginationToken;
    
    const result = await cognitoService.getAllUsers(paginationToken);

    return {
      statusCode: 200,
      body: JSON.stringify({
        users: result.Users?.map(user => ({
          username: user.Username,
          attributes: user.Attributes,
          enabled: user.Enabled,
          status: user.UserStatus,
          created: user.UserCreateDate,
          modified: user.UserLastModifiedDate,
        })),
        paginationToken: result.PaginationToken,
      }),
    };
  } catch (error) {
    console.error("handleGetAllAgendabelaUsers Error: ", error);
    return createErrorResponse(500, "Internal server error");
  }
};
