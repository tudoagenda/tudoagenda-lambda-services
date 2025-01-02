import { SendEmailServices, SendEmailType } from "./types";

export const EMAIL_SENDER: Record<
  SendEmailServices,
  Record<SendEmailType, string>
> = {
  agendabela: {
    welcome: "Bela do AgendaBela <no-reply@tudoagenda.com.br>",
  },
};

export const EMAIL_SUBJECT: Record<
  SendEmailServices,
  Record<SendEmailType, string>
> = {
  agendabela: {
    welcome: "Bem-vindo ao AgendaBela",
  },
};
