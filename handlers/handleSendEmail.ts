import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { Resend } from "resend";
import { SendEmailBody } from "../types";
import { EMAIL_SENDER, EMAIL_SUBJECT } from "../constants";

const resend = new Resend(process.env.RESEND_API_KEY);

export const handleSendEmail = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  const body = JSON.parse(event.body || "{}") as SendEmailBody;

  const { service, type, to, text, html } = body;

  if (!to || !type || !service) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing required fields" }),
    };
  }

  try {
    await resend.emails.send({
      from: EMAIL_SENDER[service][type],
      to,
      subject: EMAIL_SUBJECT[service][type],
      html: "<p>it works!</p>",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Hello from send-email route" }),
    };
  } catch (error) {
    console.error("handleSendEmail Error: ", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
