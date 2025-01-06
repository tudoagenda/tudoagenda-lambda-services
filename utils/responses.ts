import { APIGatewayProxyResultV2 } from "aws-lambda";

export const createErrorResponse = (
  statusCode: number,
  message: string
): APIGatewayProxyResultV2 => ({
  statusCode,
  body: JSON.stringify({ message }),
});
