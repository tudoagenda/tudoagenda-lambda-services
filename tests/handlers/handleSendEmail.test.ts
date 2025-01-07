import { handleSendEmail } from "../../handlers/handleSendEmail";
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";

// Add this type to handle the response structure
type LambdaResponse = APIGatewayProxyResultV2 & {
  statusCode: number;
  body: string;
};

jest.mock("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ id: "test-id" }),
    },
  })),
}));

describe("handleSendEmail", () => {
  test("should return 400 when required fields are missing", async () => {
    const event = {
      body: JSON.stringify({}),
    };

    const response = (await handleSendEmail(
      event as APIGatewayProxyEventV2
    )) as LambdaResponse;
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body).message).toBe("Missing required fields");
  });

  test("should return 200 when email is sent successfully", async () => {
    const event = {
      body: JSON.stringify({
        service: "agendabela",
        type: "welcome",
        to: ["test@example.com"],
        text: "Welcome message",
      }),
    };

    const response = (await handleSendEmail(
      event as APIGatewayProxyEventV2
    )) as LambdaResponse;
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).message).toBe("Message sent successfully");
  });
});
