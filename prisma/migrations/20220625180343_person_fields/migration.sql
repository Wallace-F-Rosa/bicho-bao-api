/*
  Warnings:

  - A unique constraint covering the columns `[nameId]` on the table `Person` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[photoId]` on the table `Person` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `active` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameId` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "active" BOOLEAN NOT NULL,
ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "nameId" INTEGER NOT NULL,
ADD COLUMN     "photoId" INTEGER;

-- CreateTable
CREATE TABLE "Address" (
    "use" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "line" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "personId" INTEGER NOT NULL,
    "period_start" TIMESTAMP(3),
    "period_end" TIMESTAMP(3),

    CONSTRAINT "Address_pkey" PRIMARY KEY ("personId","line","postalCode")
);

-- CreateTable
CREATE TABLE "HumanName" (
    "id" SERIAL NOT NULL,
    "use" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "family" TEXT NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "HumanName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactPoint" (
    "system" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "use" TEXT NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "ContactPoint_pkey" PRIMARY KEY ("personId","value")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "id" SERIAL NOT NULL,
    "contentType" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "personId" INTEGER,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Communication" (
    "id" SERIAL NOT NULL,
    "language" TEXT NOT NULL,

    CONSTRAINT "Communication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonCommunication" (
    "personId" INTEGER NOT NULL,
    "communicationId" INTEGER NOT NULL,

    CONSTRAINT "PersonCommunication_pkey" PRIMARY KEY ("personId","communicationId")
);

-- CreateIndex
CREATE UNIQUE INDEX "HumanName_personId_key" ON "HumanName"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "HumanName_personId_text_key" ON "HumanName"("personId", "text");

-- CreateIndex
CREATE UNIQUE INDEX "Attachment_personId_url_key" ON "Attachment"("personId", "url");

-- CreateIndex
CREATE UNIQUE INDEX "Communication_language_key" ON "Communication"("language");

-- CreateIndex
CREATE UNIQUE INDEX "Person_nameId_key" ON "Person"("nameId");

-- CreateIndex
CREATE UNIQUE INDEX "Person_photoId_key" ON "Person"("photoId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactPoint" ADD CONSTRAINT "ContactPoint_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "HumanName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Attachment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonCommunication" ADD CONSTRAINT "PersonCommunication_communicationId_fkey" FOREIGN KEY ("communicationId") REFERENCES "Communication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonCommunication" ADD CONSTRAINT "PersonCommunication_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
