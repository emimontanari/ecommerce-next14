/*
  Warnings:

  - You are about to drop the column `isPay` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `itemInOrder` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Order` table. All the data in the column will be lost.
  - Added the required column `itemsInOrder` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "isPay",
DROP COLUMN "itemInOrder",
DROP COLUMN "updateAt",
ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "itemsInOrder" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
