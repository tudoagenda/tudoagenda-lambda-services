export type WahaChattingSendMessageBody = {
  chatId: string;
  reply_to: string | null;
  text: string;
  linkPreview: boolean;
  linkPreviewHighQuality: boolean;
  session: string;
};