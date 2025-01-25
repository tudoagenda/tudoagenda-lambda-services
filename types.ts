export type SendEmailServices = "agendabela";
export type SendEmailType = "welcome";

export type SendEmailBody = {
  to: string[];
  service: SendEmailServices;
  type: SendEmailType;
  text?: string;
  html?: string;
};

type SendWhatsappMessageType =
  | "client-confirmation"
  | "professional-confirmation";

type SendWhatsappMessageContent = {
  salon: string;
  name: string;
  date: string;
  time: string;
  service: string;
};

export type SendWhatsappMessageBody = {
  to: string;
  type: SendWhatsappMessageType;
  content: SendWhatsappMessageContent;
};
