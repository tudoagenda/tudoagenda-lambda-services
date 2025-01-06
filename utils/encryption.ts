import { KMSClient, EncryptCommand } from "@aws-sdk/client-kms";

const kmsClient = new KMSClient({
  region: process.env.AWS_REGION || "us-east-1",
});

export async function encryptPassword(password: string): Promise<string> {
  try {
    const command = new EncryptCommand({
      KeyId: process.env.KMS_KEY_ID,
      Plaintext: Buffer.from(password),
    });

    const response = await kmsClient.send(command);

    if (!response.CiphertextBlob) {
      throw new Error("Failed to encrypt password");
    }

    return Buffer.from(response.CiphertextBlob).toString("base64");
  } catch (error) {
    console.error("Error encrypting password:", error);
    throw new Error("Failed to encrypt password");
  }
}
