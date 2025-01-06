# When to Use getPublicKey Function

The `getPublicKey` function should be used when implementing secure password handling on the client side of your application. Specifically:

1. **When**: You should call this function when your application initializes its authentication system, before any password-related operations.

2. **Purpose**: The function retrieves a public key from AWS KMS that will be used to encrypt passwords before sending them to the server.

3. **Usage Pattern**:
   - Call it once during initialization and cache the result
   - Don't call it for every password encryption operation
   - The public key rarely changes (only when KMS keys are rotated)

4. **Example Implementation**:
   ```typescript
   // During app initialization:
   let cachedPublicKey: Buffer | null = null;

   // Get the public key once and cache it
   async function initializeSecurityKeys() {
     if (!cachedPublicKey) {
       cachedPublicKey = await getPublicKey();
     }
     return cachedPublicKey;
   }

   // Later, when handling user registration/password changes:
   async function handleUserRegistration(email: string, password: string, name: string) {
     const publicKey = await initializeSecurityKeys();
     const encryptedPassword = await encryptPassword(password, publicKey);
     // ... proceed with API call
   }
   ```

5. **Best Practices**:
   - Don't expose the public key to users
   - Implement proper error handling
   - Consider implementing a refresh mechanism if the key becomes invalid
   - Always use HTTPS for API calls
   - Follow the complete security implementation guide in README-security.md

Remember: This function is part of the client-side security implementation and works in conjunction with server-side KMS decryption to ensure secure password transmission.