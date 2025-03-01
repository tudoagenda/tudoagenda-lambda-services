import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function setupDbFunctions() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Setting up database functions...');
    
    // Read the SQL file
    const sqlFilePath = path.join(__dirname, '../prisma/sql/create_short_id_function.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Execute the SQL
    await prisma.$executeRawUnsafe(sql);
    
    console.log('Database functions set up successfully');
  } catch (error) {
    console.error('Error setting up database functions:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the setup
setupDbFunctions(); 