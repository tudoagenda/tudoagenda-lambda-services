export type SendEmailServices = "agendabela";
export type SendEmailType = "welcome";

export type SendEmailBody = {
  to: string[];
  service: SendEmailServices;
  type: SendEmailType;
  text?: string;
  html?: string;
};
