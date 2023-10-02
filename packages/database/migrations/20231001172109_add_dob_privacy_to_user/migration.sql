-- CreateEnum
CREATE TYPE "DobPrivacy" AS ENUM ('PUBLIC', 'FOLLOWERS', 'FOLLOWING', 'MUTUAL_FOLLOW', 'PRIVATE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dobDayMonthPrivacy" "DobPrivacy" NOT NULL DEFAULT 'PRIVATE',
ADD COLUMN     "dobYearPrivacy" "DobPrivacy" NOT NULL DEFAULT 'PRIVATE';
