import { diskStorage } from 'multer';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';

export const multerMultiplyOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = './uploads/venues'; // Folder to save uploaded files
      if (!existsSync(uploadDir)) {
        mkdirSync(uploadDir, { recursive: true }); // Create folder if it doesn't exist
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  }),

  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB

  fileFilter: (req, file, cb) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|svg\+xml)$/)) { 
      cb(null, true); // Allow JPG, JPEG, PNG, and SVG
    } else {
      cb(new Error('Unsupported file type'), false);
    }
  },
};
