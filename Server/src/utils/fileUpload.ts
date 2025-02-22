
import s3Client from "@/cloud/aws";

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { Request } from "express";
import { File } from "formidable";
import fs from "fs";
import path from "path";
import { generateS3ClientPublicUrl } from "./helper";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


export const updateAvatarToAws = async (
  file: File,
  uniqueFileName: string,
  avatarId?: string
) => {
  const bucketName = process.env.AWS_PUBLIC_BUCKET;
  if (avatarId) {
    const deleteCommand = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: avatarId,
    });
    await s3Client.send(deleteCommand);
  }

  const putCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: uniqueFileName,
    Body: fs.readFileSync(file.filepath),
  });
  await s3Client.send(putCommand);

  return {
    id: uniqueFileName,
    url: generateS3ClientPublicUrl("ebook-public", uniqueFileName),
  };
};


export const uploadBookToLocalDir = (file: File, uniqueFileName: string) => {
  const bookStoragePath = path.join(__dirname, "../books");

  if (!fs.existsSync(bookStoragePath)) {
    fs.mkdirSync(bookStoragePath);
  }

  const filePath = path.join(bookStoragePath, uniqueFileName);

  fs.writeFileSync(filePath, fs.readFileSync(file.filepath));
};

export const uploadBookToAws = async (
  filepath: string,
  uniqueFileName: string
) => {
  const putCommand = new PutObjectCommand({
    Bucket: process.env.AWS_PUBLIC_BUCKET,
    Key: uniqueFileName,
    Body: fs.readFileSync(filepath),
  });
  await s3Client.send(putCommand);

  return {
    id: uniqueFileName,
    url: generateS3ClientPublicUrl(
      process.env.AWS_PUBLIC_BUCKET!,
      uniqueFileName
    ),
  };
};

interface FileInfo {
  bucket: string;
  uniqueKey: string;
  contentType: string;
}

export const generateFileUploadUrl = async (
  client: S3Client,
  fileInfo: FileInfo
) => {
  const { bucket, uniqueKey, contentType } = fileInfo;
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: uniqueKey,
    ContentType: contentType,
  });

  return await getSignedUrl(client, command);
};
