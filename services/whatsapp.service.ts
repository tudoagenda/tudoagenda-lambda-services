import axios from "axios";

export const WhatsAppService = {
  sendMessage: async (to: string, message: string) => {
    await axios.post(
      `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: to,
        type: "text",
        text: { body: message },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
        },
      }
    );
  },
};
