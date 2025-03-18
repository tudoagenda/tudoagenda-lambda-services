import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { PrismaService } from "../services/prisma.service";
import { createErrorResponse } from "../utils/responses";

const prismaService = new PrismaService();

export const handleGetAllReferrals = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  try {
    // Connect to the database
    await prismaService.connect();
    
    const { email } = event.queryStringParameters || {};
    
    // Get the Prisma client
    const prisma = prismaService.getClient();
    
    // Set up the where clause for filtering
    // If email is provided, look for referrals where userId equals the email
    const where = email ? { userId: email } : {};
    
    // Get all referrals from the database
    const referrals = await prisma.referral.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        count: referrals.length,
        referrals: referrals.map(referral => ({
          id: referral.id,
          code: referral.code,
          email: referral.userId, // Since userId is now storing the email
          referralType: referral.referralType,
          expiresAt: referral.expiresAt,
          used: referral.used,
          createdAt: referral.createdAt,
          updatedAt: referral.updatedAt,
          referralLink: `${process.env.APP_URL || 'https://app.tudoagenda.com'}/signup?ref=${referral.code}`,
        })),
      }),
    };
  } catch (error) {
    console.error("handleGetAllReferrals Error: ", error);
    return createErrorResponse(500, "Internal server error");
  } finally {
    // Always disconnect from the database
    await prismaService.disconnect();
  }
}; 