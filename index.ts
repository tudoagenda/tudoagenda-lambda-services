import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { handleSendEmail } from "./handlers";

export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  console.log("TUDOAGENDA SERVICES EVENT: ", JSON.stringify(event, null, 2));

  switch (event.routeKey) {
    case "POST /send-email":
      return handleSendEmail(event);
    default:
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Not found" }),
      };
  }
};
