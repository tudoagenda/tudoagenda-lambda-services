import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { Resend } from "resend";
import { SendEmailBody } from "../types";
import { EMAIL_SENDER, EMAIL_SUBJECT, EMAIL_TEMPLATE } from "../constants";

const resend = new Resend(process.env.RESEND_API_KEY);

export const handleSendEmail = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  const body = JSON.parse(event.body || "{}") as SendEmailBody;

  const { service, type, to, text } = body;

  if (!to || !type || !service || !text) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing required fields" }),
    };
  }

  try {
    await resend.emails.send({
      from: EMAIL_SENDER[service][type],
      to: "clientes@tudoagenda.com.br",
      bcc: to,
      subject: EMAIL_SUBJECT[service][type],
      html: EMAIL_TEMPLATE({ text })[service][type],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Message sent successfully" }),
    };
  } catch (error) {
    console.error("handleSendEmail Error: ", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
