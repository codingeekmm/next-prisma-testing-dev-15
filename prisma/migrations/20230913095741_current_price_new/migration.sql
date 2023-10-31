/*
  Warnings:

  - Added the required column `current_price_new` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "current_price_new" DOUBLE PRECISION NOT NULL;
