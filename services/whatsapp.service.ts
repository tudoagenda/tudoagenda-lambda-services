import axios from "axios";

export const WhatsAppService = {
  sendMessage: async (to: string, message: string) => {
    await axios.post(
      `https://graph.facebook.com/v21.0/${process.env.WHATSAPP_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: "5514996978287",
        type: "template",
        template: {
          name: "notification_sample",
          language: {
            code: "pt_BR",
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
  },
};
