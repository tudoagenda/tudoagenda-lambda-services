import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { PrismaService } from "../services/prisma.service";
import { createErrorResponse } from "../utils/responses";

const prismaService = new PrismaService();

export const handleRedirectShortUrl = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  try {
    // Connect to the database
    await prismaService.connect();
    
    // Get the short URL ID from the path parameters
    const id = event.pathParameters?.id;
    
    if (!id) {
      return createErrorResponse(400, "Short URL ID is required");
    }
    
    // Get the Prisma client
    const prisma = prismaService.getClient();
    
    // Find the short URL in the database
    const shortUrl = await prisma.shortUrl.findUnique({
      where: { id },
    });
    
    if (!shortUrl) {
      return createErrorResponse(404, "Short URL not found");
    }
    
    // Return a redirect response
    return {
      statusCode: 302,
      headers: {
        Location: shortUrl.url,
      },
      body: '',
    };
  } catch (error) {
    console.error("handleRedirectShortUrl Error: ", error);
    return createErrorResponse(500, "Internal server error");
  } finally {
    // Always disconnect from the database
    await prismaService.disconnect();
  }
}; 