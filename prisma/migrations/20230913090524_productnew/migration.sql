/*
  Warnings:

  - Added the required column `productnew_id` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN  "productnew_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ProductNew" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "model" TEXT NOT NULL,
    "product_url" TEXT DEFAULT 'default_product.png',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TEXT,

    CONSTRAINT "ProductNew_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductNew_model_key" ON "ProductNew"("model");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_productnew_id_fkey" FOREIGN KEY ("productnew_id") REFERENCES "ProductNew"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
