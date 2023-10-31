-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "product_url" SET DEFAULT 'default_product.png',
ALTER COLUMN "createdAt" DROP NOT NULL;
