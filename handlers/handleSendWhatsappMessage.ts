import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
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

    const { to, content } = JSON.parse(event.body);

    if (!to || !content) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Recipient and message are required",
        }),
      };
    }

    await WhatsAppService.sendAppointmentConfirmation(to, content);

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
