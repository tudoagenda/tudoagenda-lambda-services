import axios from "axios";

type AppointmentConfirmationMessageProps = {
  salon: string;
  date: string;
  time: string;
  service: string;
  professional: string;
};

const sendAppointmentConfirmation = async (
  to: string,
  {
    salon,
    date,
    time,
    service,
    professional,
  }: AppointmentConfirmationMessageProps
) => {
  await axios.post(
    `https://graph.facebook.com/v21.0/${process.env.WHATSAPP_NUMBER_ID}/messages`,
    {
      messaging_product: "whatsapp",
      to: to,
      type: "template",
      template: {
        name: "appointment_scheduled",
        language: {
          code: "pt_BR",
        },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: salon,
              },
              {
                type: "text",
                text: date,
              },
              {
                type: "text",
                text: time,
              },
              {
                type: "text",
                text: service,
              },
              {
                type: "text",
                text: professional,
              },
            ],
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
  sendAppointmentConfirmation,
};
