import { Storage } from '@google-cloud/storage';
import path from 'path';

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: process.env.GOOGLE_CLOUD_KEYFILE,
});

const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);

export const uploadToGCS = async (file, folder = '') => {
  try {
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}${path.extname(file.originalname)}`;
    const fileUpload = bucket.file(fileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
      public: true,
    });

    return new Promise((resolve, reject) => {
      stream.on('error', (error) => {
        reject(error);
      });

      stream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}/${fileName}`;
        resolve(publicUrl);
      });

      stream.end(file.buffer);
    });
  } catch (error) {
    console.error('Error uploading to GCS:', error);
    throw error;
  }
};