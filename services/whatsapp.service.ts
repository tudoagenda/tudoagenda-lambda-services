import axios from "axios";
import { SendWhatsappMessageBody } from "../types";

type MessageParameters = {
  type: string;
  text: string;
};

const WhatsappTemplate: Record<SendWhatsappMessageBody["type"], string> = {
  "client-confirmation": "appointment_scheduled",
  "professional-confirmation": "appointment_scheduled_professional",
};

const buildMessageBody = (
  type: SendWhatsappMessageBody["type"],
  content: SendWhatsappMessageBody["content"]
): MessageParameters[] => {
  if (type === "client-confirmation") {
    return [
      {
        type: "text",
        text: content.salon,
      },
      {
        type: "text",
        text: content.date,
      },
      {
        type: "text",
        text: content.time,
      },
      {
        type: "text",
        text: content.service,
      },
      {
        type: "text",
        text: content.name,
      },
    ];
  }

  return [
    {
      type: "text",
      text: content.date,
    },
    {
      type: "text",
      text: content.time,
    },
    {
      type: "text",
      text: content.name,
    },
    {
      type: "text",
      text: content.service,
    },
  ];
};

const sendAppointmentConfirmation = async ({
  to,
  type,
  content,
}: SendWhatsappMessageBody) => {
  await axios.post(
    `https://graph.facebook.com/v21.0/${process.env.WHATSAPP_NUMBER_ID}/messages`,
    {
      messaging_product: "whatsapp",
      to: to,
      type: "template",
      template: {
        name: WhatsappTemplate[type],
        language: {
          code: "pt_BR",
        },
        components: [
          {
            type: "body",
            parameters: buildMessageBody(type, content),
          },
        ],
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const WhatsAppService = {
  sendAppointmentConfirmation,
};
