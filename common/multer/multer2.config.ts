// src/config/multer.config.ts
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';
import * as fs from 'fs';
import { BadRequestException } from '@nestjs/common';

export const multerConfig = {
  storage: diskStorage({
    destination: (req: Request, file, callback) => {
      // Access query parameters
      const { folder, collection } = req.query;

      // Construct the destination path
      const destination = `./uploads/${folder}/${collection}`;

      // Create the directory if it doesn't exist
      if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
      }

      // Pass the destination to Multer
      callback(null, destination);
    },
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      const filename = `${uniqueSuffix}${ext}`;
      callback(null, filename);
    },
  }),
};