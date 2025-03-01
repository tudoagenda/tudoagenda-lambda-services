declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AWS_REGION: string;
      KMS_KEY_ID: string;
      COGNITO_USER_POOL_ID: string;
      RESEND_API_KEY: string;
      // Database environment variables
      DB_HOST: string;
      DB_PORT: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      DATABASE_URL: string;
      // API environment variables
      API_URL?: string;
      // Node environment
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {};
