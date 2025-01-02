import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";

export const handleSendEmail = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from send-email route" }),
  };
};
