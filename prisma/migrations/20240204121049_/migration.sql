/*
  Warnings:

  - You are about to drop the column `Body` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `body` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "Body",
ADD COLUMN     "body" TEXT NOT NULL;
