import { KMSClient, EncryptCommand, DecryptCommand } from "@aws-sdk/client-kms";
import { KMS } from "aws-sdk";

export class KMSService {
  private kmsClient: KMSClient;
  private legacyKMS: KMS;

  constructor() {
    this.kmsClient = new KMSClient({
      region: process.env.AWS_REGION || "us-east-1",
    });
    this.legacyKMS = new KMS();
  }

  async encrypt(plaintext: string): Promise<string> {
    const command = new EncryptCommand({
      KeyId: process.env.KMS_KEY_ID,
      Plaintext: Buffer.from(plaintext),
    });

    const response = await this.kmsClient.send(command);

    if (!response.CiphertextBlob) {
      throw new Error("Failed to encrypt data");
    }

    return Buffer.from(response.CiphertextBlob).toString("base64");
  }

  async decrypt(ciphertext: string): Promise<string> {
    const response = await this.legacyKMS
      .decrypt({
        CiphertextBlob: Buffer.from(ciphertext, "base64"),
        KeyId: process.env.KMS_KEY_ID!,
      })
      .promise();

    if (!response.Plaintext) {
      throw new Error("Failed to decrypt data");
    }

    return response.Plaintext.toString("utf-8");
  }
}
