import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { SendEmailType, SendEmailServices } from "../types";
import { handleCreateUser } from "./handleCreateUser";
import { handleSendEmail } from "./handleSendEmail";
import { encryptPassword } from "../utils/encryption";
import { createErrorResponse } from "../utils/responses";
import { isValidEmail } from "../utils/validations";
import { generatePassword } from "../utils/generators";

interface CreateUserAndSendBody {
  email: string;
}

export const handleCreateUserAndSend = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  try {
    if (!event.body) {
      return createErrorResponse(400, "Request body is required");
    }

    const { email } = JSON.parse(event.body) as CreateUserAndSendBody;

    if (!isValidEmail(email)) {
      return createErrorResponse(400, "Invalid email format");
    }

    const password = generatePassword();
    const encryptedPassword = await encryptPassword(generatePassword());

    const createUserEvent = {
      body: JSON.stringify({
        email,
        password: encryptedPassword,
      }),
    } as APIGatewayProxyEventV2;

    await handleCreateUser(createUserEvent);

    const sendEmailEvent = {
      body: JSON.stringify({
        service: "agendabela" as SendEmailServices,
        type: "welcome" as SendEmailType,
        to: email,
        text: `Sua conta no Agendabela foi criada com sucesso. Você pode agora acessar o sistema com seu email (${email}). Sua senha temporária é: ${password}`,
      }),
    } as APIGatewayProxyEventV2;

    await handleSendEmail(sendEmailEvent);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "User created successfully",
        user: email,
      }),
    };
  } catch (error) {
    console.error("handleCreateUserAndSend Error:", error);

    // Differentiate between known errors and internal server errors
    if (error instanceof SyntaxError) {
      return createErrorResponse(400, "Invalid request body format");
    }

    return createErrorResponse(500, "Internal server error");
  }
};
