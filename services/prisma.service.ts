import { PrismaClient } from '@prisma/client';

// Prevent multiple instances of Prisma Client in development
declare global {
  var prisma: PrismaClient | undefined;
}

export class PrismaService {
  private prisma: PrismaClient;

  constructor() {
    // Use existing prisma instance if available to prevent too many connections in development
    if (process.env.NODE_ENV === 'production') {
      this.prisma = new PrismaClient();
    } else {
      if (!global.prisma) {
        global.prisma = new PrismaClient();
      }
      this.prisma = global.prisma;
    }
  }

  /**
   * Get the Prisma client instance
   */
  getClient(): PrismaClient {
    return this.prisma;
  }

  /**
   * Connect to the database
   */
  async connect(): Promise<void> {
    try {
      await this.prisma.$connect();
      console.log('Successfully connected to the database');
    } catch (error) {
      console.error('Failed to connect to the database:', error);
      throw error;
    }
  }

  /**
   * Disconnect from the database
   */
  async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }
} 