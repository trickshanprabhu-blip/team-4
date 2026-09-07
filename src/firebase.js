// ──────────────────────────────────────────────────────────
// Firebase Configuration — Phone Auth OTP
// ──────────────────────────────────────────────────────────
// 🔑 Replace the placeholder values below with your own
//    Firebase project config from:
//    https://console.firebase.google.com → Project Settings → General → Your apps
// ──────────────────────────────────────────────────────────

import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAGog8c5ELjX2KKkYtndctD-9UvVBDxlzc',
  authDomain: 'team-4-e605a.firebaseapp.com',
  projectId: 'team-4-e605a',
  storageBucket: 'team-4-e605a.firebasestorage.app',
  messagingSenderId: '612330294807',
  appId: '1:612330294807:web:3c5fb73c59586e2f8c1652',
  measurementId: 'G-XVNBMB3N8C',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

/**
 * Creates an invisible reCAPTCHA verifier on the given button element.
 * Call this once before sending the first OTP.
 */
export function setupRecaptcha(buttonId) {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, buttonId, {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved — will proceed with signInWithPhoneNumber
      },
    });
  }
  return window.recaptchaVerifier;
}

/**
 * Sends an OTP to the given phone number.
 * @param {string} phoneNumber — must include country code, e.g. "+919876543210"
 * @returns {Promise<import('firebase/auth').ConfirmationResult>}
 */
export async function sendOtp(phoneNumber) {
  const appVerifier = window.recaptchaVerifier;
  const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
  return confirmationResult;
}

/**
 * Verifies the OTP code entered by the user.
 * @param {import('firebase/auth').ConfirmationResult} confirmationResult
 * @param {string} otpCode — the 4/6-digit code
 * @returns {Promise<import('firebase/auth').UserCredential>}
 */
export async function verifyOtp(confirmationResult, otpCode) {
  const result = await confirmationResult.confirm(otpCode);
  return result;
}
