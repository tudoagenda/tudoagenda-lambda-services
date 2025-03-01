import { SendEmailServices, SendEmailType } from "./types";

export const EMAIL_SENDER: Record<
  SendEmailServices,
  Record<SendEmailType, string>
> = {
  agendabela: {
    welcome: "Bela do AgendaBela <no-reply@tudoagenda.com.br>",
    missing_profile: "Bela do AgendaBela <no-reply@tudoagenda.com.br>",
    missing_services: "Bela do AgendaBela <no-reply@tudoagenda.com.br>",
    missing_appointment: "Bela do AgendaBela <no-reply@tudoagenda.com.br>",
  },
};

export const EMAIL_SUBJECT: Record<
  SendEmailServices,
  Record<SendEmailType, string>
> = {
  agendabela: {
    welcome: "Bem-vindo ao AgendaBela",
    missing_profile: "Precisa de ajuda com o AgendaBela?",
    missing_services: "Que tal adicionar serviços no AgendaBela?",
    missing_appointment: "Quer saber como usar o AgendaBela com seus clientes?",
  },
};

export const EMAIL_TEMPLATE: ({
  text,
}: {
  text: string;
}) => Record<SendEmailServices, Record<SendEmailType, string>> = ({
  text,
}) => ({
  agendabela: {
    welcome: text,
    missing_profile: text,
    missing_services: text,
    missing_appointment: text,
  },
});
