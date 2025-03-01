/*
  Warnings:

  - The primary key for the `ShortUrl` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `ShortUrl` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(8)`.

*/
-- AlterTable
ALTER TABLE "ShortUrl" DROP CONSTRAINT "ShortUrl_pkey",
ALTER COLUMN "id" SET DEFAULT gen_short_id(),
ALTER COLUMN "id" SET DATA TYPE CHAR(8),
ADD CONSTRAINT "ShortUrl_pkey" PRIMARY KEY ("id");
