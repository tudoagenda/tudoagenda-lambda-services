import { KMSClient, GetPublicKeyCommand } from "@aws-sdk/client-kms";
import { publicEncrypt, constants } from "crypto";

// Singleton instance of KMS client
const kmsClient = new KMSClient({
  region: process.env.AWS_REGION || "us-east-1",
});

// Cache for the public key
let cachedPublicKey: Buffer | null = null;

/**
 * Retrieves the public key from AWS KMS and caches it
 */
async function getPublicKey(): Promise<Buffer> {
  try {
    if (cachedPublicKey) {
      return cachedPublicKey;
    }

    const command = new GetPublicKeyCommand({
      KeyId: process.env.KMS_KEY_ID,
    });

    const response = await kmsClient.send(command);

    if (!response.PublicKey) {
      throw new Error("Failed to retrieve public key from KMS");
    }

    cachedPublicKey = Buffer.from(response.PublicKey);
    return cachedPublicKey;
  } catch (error) {
    console.error("Error getting public key:", error);
    throw error;
  }
}

/**
 * Encrypts a password using the KMS public key
 */
export async function encryptPassword(password: string): Promise<string> {
  try {
    const publicKey = await getPublicKey();

    const encrypted = publicEncrypt(
      {
        key: publicKey,
        padding: constants.RSA_PKCS1_OAEP_PADDING,
      },
      Buffer.from(password)
    );

    return encrypted.toString("base64");
  } catch (error) {
    console.error("Error encrypting password:", error);
    throw new Error("Failed to encrypt password");
  }
}

/**
 * Initializes the encryption system by pre-fetching the public key
 */
export async function initializeEncryption(): Promise<void> {
  try {
    await getPublicKey();
  } catch (error) {
    console.error("Failed to initialize encryption system:", error);
    throw error;
  }
}
