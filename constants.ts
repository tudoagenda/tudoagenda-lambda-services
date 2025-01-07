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

const EMAIL_HTML_DOCUMENT = (text: string) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
  <head />
  <body>
    ${text}
  </body>
</html>
`;

export const EMAIL_TEMPLATE: ({
  text,
}: {
  text: string;
}) => Record<SendEmailServices, Record<SendEmailType, string>> = ({
  text,
}) => ({
  agendabela: {
    welcome: EMAIL_HTML_DOCUMENT(text),
  },
});
