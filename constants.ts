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

export const EMAIL_TEMPLATE: ({
  text,
}: {
  text: string;
}) => Record<SendEmailServices, Record<SendEmailType, string>> = ({
  text,
}) => ({
  agendabela: {
    welcome: `<h3>Bem-vindo ao AgendaBela!</h3><p>${text}</p>`,
  },
});
