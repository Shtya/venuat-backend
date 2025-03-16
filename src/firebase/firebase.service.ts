// src/firebase/firebase.service.ts
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

/* 
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeSQXBtSA4qhB176IDI-k__UonNM5XD2A",
  authDomain: "venuat-6f346.firebaseapp.com",
  projectId: "venuat-6f346",
  storageBucket: "venuat-6f346.firebasestorage.app",
  messagingSenderId: "970490248340",
  appId: "1:970490248340:web:bdacb3b409e6ec45b58881"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
*/

@Injectable()
export class FirebaseService {
  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      });
    }
  }

  // async verifyToken(token: string): Promise<admin.auth.DecodedIdToken> {
  //   return admin.auth().verifyIdToken(token);
  // }
  async verifyToken(token: string): Promise<admin.auth.DecodedIdToken> {
    if (!token || typeof token !== 'string') {
      throw new Error('Invalid token');
    }
    return admin.auth().verifyIdToken(token);
  }
}