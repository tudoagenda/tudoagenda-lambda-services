import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import {
  handleSendEmail,
  handleCreateUserAndSend,
  handleCreateUser,
  handleSendWhatsappMessage,
} from "./handlers";

export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  console.log("TUDOAGENDA SERVICES EVENT: ", JSON.stringify(event, null, 2));

  switch (event.routeKey) {
    case "POST /send-email":
      return handleSendEmail(event);
    case "POST /create-user-and-send":
      return handleCreateUserAndSend(event);
    case "POST /create-user":
      return handleCreateUser(event);
    case "POST /send-whatsapp-message":
      return handleSendWhatsappMessage(event);
    default:
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Route not found" }),
      };
  }
};
