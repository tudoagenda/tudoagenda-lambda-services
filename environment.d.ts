declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AWS_REGION: string;
      KMS_KEY_ID: string;
      COGNITO_USER_POOL_ID: string;
      RESEND_API_KEY: string;
    }
  }
}

export {};
