import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { PrismaService } from "../services/prisma.service";
import { createErrorResponse } from "../utils/responses";
import { nanoid } from 'nanoid';
import axios from 'axios';

const prismaService = new PrismaService();

// Generate a referral code with 8 characters
const generateReferralCode = () => nanoid(8);

export const handleCreateReferral = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  try {
    // Connect to the database
    await prismaService.connect();
    
    // Parse the request body
    if (!event.body) {
      return createErrorResponse(400, "Request body is required");
    }
    
    const { email, referralType, expiresAt } = JSON.parse(event.body);
    
    if (!email) {
      return createErrorResponse(400, "Email is required");
    }
    
    // Get the Prisma client
    const prisma = prismaService.getClient();
    
    // Generate a referral code
    const code = generateReferralCode();

    // Use the provided custom referral link or generate a default one
    const referralLink = `https://tudoagenda.com.br/agendabela/automatize-seu-atendimento?ref=${code}`;
    const shortenedReferralLink = await axios.post('https://nduzhzdi52.execute-api.us-east-1.amazonaws.com/create-short-url', {
      url: referralLink,
    });
    const shortUrl = (shortenedReferralLink as any).data.url;
    
    // Create a new referral in the database
    const referral = await prisma.referral.create({
      data: {
        code,
        userId: email, // Use email as userId since we don't have a User model
        referralType: referralType || 'DEFAULT',
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        used: false,
        shortUrl,
      },
    });
    
    
    return {
      statusCode: 201,
      body: JSON.stringify({
        id: referral.id,
        code: referral.code,
        email,
        referralType: referral.referralType,
        expiresAt: referral.expiresAt,
        used: referral.used,
        createdAt: referral.createdAt,
        updatedAt: referral.updatedAt,
        referralLink,
        shortUrl,
      }),
    };
  } catch (error) {
    console.error("handleCreateReferral Error: ", error);
    return createErrorResponse(500, "Internal server error");
  } finally {
    // Always disconnect from the database
    await prismaService.disconnect();
  }
}; 