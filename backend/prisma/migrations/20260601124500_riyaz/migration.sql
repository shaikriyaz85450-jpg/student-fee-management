-- AlterTable
ALTER TABLE "Accountant" ADD COLUMN     "designation" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "profilePhoto" TEXT;

-- AlterTable
ALTER TABLE "Faculty" ADD COLUMN     "designation" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "profilePhoto" TEXT;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "profilePhoto" TEXT;
