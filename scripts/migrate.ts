import { execSync } from 'child_process';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Run database migrations
 */
async function runMigrations() {
  try {
    console.log('Running database migrations...');
    
    // Run Prisma migrations
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    
    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
    process.exit(1);
  }
}

// Run the migrations
runMigrations(); 