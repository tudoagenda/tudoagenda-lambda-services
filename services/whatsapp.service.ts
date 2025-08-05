import axios from "axios";
import { SendWhatsappMessageBody } from "../types";
import { WAHA_API_URL } from "./constants";
import { WahaChattingSendMessageBody } from "./types";

const buildMessageBody = (type: SendWhatsappMessageBody["type"], content: SendWhatsappMessageBody["content"]): string => {
  if (type === 'client-confirmation') {
    return `Olá ${content.name}, seu agendamento com ${content.salon} foi confirmado para ${content.date} às ${content.time}.\n\nObrigado por usar o Agenda Bela 😃💜`;
  }

  return `Olá ${content.name}, você tem um novo agendamento: \n\nCliente: ${content.clientName}\nServiço: ${content.service}\nHorário: ${content.hour}\nData: ${content.date}\nTelefone: ${content?.phone ?? 'Não informado'}\n\nObrigado por usar o Agenda Bela 😃💜`;
};


const sendAppointmentConfirmation = async ({
  to,
  type,
  content,
}: SendWhatsappMessageBody) => {
  await axios.post<WahaChattingSendMessageBody>(
    WAHA_API_URL.chatting.sendMessage,
    {
      chatId: to,
      reply_to: null,
      text: buildMessageBody(type, content),
      linkPreview: true,
      linkPreviewHighQuality: false,
      session: "default",
    },
    {
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": process.env.WAHA_API_KEY,
      },
    }
  );
};

export const WhatsAppService = {
  sendAppointmentConfirmation,
};