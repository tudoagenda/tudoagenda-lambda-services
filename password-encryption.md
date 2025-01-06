# Password Encryption Implementation Guide

## Overview

To securely handle password transmission between client and server, we'll implement RSA encryption on the client side and decryption on the server side. Here's how to implement this:

## Server-side Implementation

1. Update the handleCreateUser lambda to expect an encrypted password
2. Add decryption using AWS KMS
3. Use the decrypted password for Cognito user creation

## Client-side Implementation

1. Use the AWS KMS public key to encrypt the password before sending
2. Implementation steps:

   ```typescript
   // 1. Install the AWS SDK
   npm install @aws-sdk/client-kms

   // 2. Initialize KMS client
   import { KMSClient, GetPublicKeyCommand } from "@aws-sdk/client-kms";

   const kmsClient = new KMSClient({ region: "YOUR_REGION" });

   // 3. Get public key (this should be done once and cached)
   async function getPublicKey() {
     const command = new GetPublicKeyCommand({
       KeyId: "YOUR_KMS_KEY_ID" // You'll need to create a KMS key and get its ID
     });
     const response = await kmsClient.send(command);
     return response.PublicKey;
   }

   // 4. Encrypt password before sending
   import { publicEncrypt } from 'crypto';

   async function encryptPassword(password: string, publicKey: Buffer) {
     return publicEncrypt(
       {
         key: publicKey,
         padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
       },
       Buffer.from(password)
     ).toString('base64');
   }

   // 5. Usage in your API call
   const encryptedPassword = await encryptPassword(password, publicKey);
   await api.post('/users', {
     email,
     password: encryptedPassword,
     name
   });
   ```

## Security Considerations

- Never send plain-text passwords over HTTP
- Use HTTPS for all API calls
- Implement rate limiting on your API endpoints
- Consider implementing password strength requirements
- Store only hashed passwords (handled by Cognito in this case)
