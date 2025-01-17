import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { createErrorResponse } from "../utils/responses";
import { WhatsAppService } from "../services/whatsapp.service";

export const handleSendWhatsappMessage = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Request body is required",
        }),
      };
    }

    const { to, message } = JSON.parse(event.body);

    if (!to || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Recipient and message are required",
        }),
      };
    }

    await WhatsAppService.sendMessage(to, message);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "WhatsApp message sent successfully",
        to,
      }),
    };
  } catch (error) {
    console.error("handleSendWhatsappMessage Error: ", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal server error",
      }),
    };
  }
};
