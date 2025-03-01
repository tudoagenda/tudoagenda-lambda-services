import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { PrismaService } from "../services/prisma.service";
import { createErrorResponse } from "../utils/responses";
import { nanoid } from 'nanoid';

const prismaService = new PrismaService();

// Generate a short ID with 8 characters
const generateShortId = () => nanoid(8);

export const handleCreateShortUrl = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  try {
    // Connect to the database
    await prismaService.connect();
    
    // Parse the request body
    if (!event.body) {
      return createErrorResponse(400, "Request body is required");
    }
    
    const { url } = JSON.parse(event.body);
    
    if (!url) {
      return createErrorResponse(400, "URL is required");
    }
    
    // Get the Prisma client
    const prisma = prismaService.getClient();
    
    // Generate a short ID
    const id = generateShortId();
    
    // Create a new short URL in the database
    const shortUrl = await prisma.shortUrl.create({
      data: {
        id,
        url,
      },
    });
    
    return {
      statusCode: 201,
      body: JSON.stringify({
        id: shortUrl.id,
        url: shortUrl.url,
        shortUrl: `${process.env.API_URL || 'https://api.tudoagenda.com'}/url/${shortUrl.id}`,
        createdAt: shortUrl.createdAt,
        updatedAt: shortUrl.updatedAt,
      }),
    };
  } catch (error) {
    console.error("handleCreateShortUrl Error: ", error);
    return createErrorResponse(500, "Internal server error");
  } finally {
    // Always disconnect from the database
    await prismaService.disconnect();
  }
}; 