import { PrismaClient } from '@prisma/client';
import * as path from 'path';

// Determine the current environment
const isAWSLambda = !!process.env.AWS_LAMBDA_FUNCTION_NAME;
const isProduction = process.env.NODE_ENV === 'production';

// Configuration for Prisma Client
const prismaClientConfig: any = {};

// If we're in AWS Lambda, tell Prisma where to find the engine binary
if (isAWSLambda || isProduction) {
  const enginePath = path.join(process.cwd(), 'client');
  prismaClientConfig.datasources = {
    db: {
      url: process.env.DATABASE_URL,
    },
  };
  // Point to the location of the engine binary
  prismaClientConfig.__internal = {
    engine: {
      binaryPath: path.join(enginePath, 'libquery_engine-rhel-openssl-3.0.x.so.node'),
    },
  };
}

// Create a singleton instance of PrismaClient
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient(prismaClientConfig);
} else {
  // For development, prevent multiple instances during hot-reloading
  if (!global.prisma) {
    global.prisma = new PrismaClient(prismaClientConfig);
  }
  prisma = global.prisma;
}

export default prisma; 