import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { WhatsAppService } from "../services/whatsapp.service";
import { SendWhatsappMessageBody } from "../types";

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

    const { to, type, content } = JSON.parse(
      event.body
    ) as SendWhatsappMessageBody;

    if (!to || !type || !content) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Invalid request body",
        }),
      };
    }

    if (
      type !== "client-confirmation" &&
      type !== "professional-confirmation"
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Invalid message type",
        }),
      };
    }

    await WhatsAppService.sendAppointmentConfirmation({ to, type, content });

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
