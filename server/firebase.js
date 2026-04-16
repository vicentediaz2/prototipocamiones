import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { initializeApp, applicationDefault, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let resolvedProjectId = null;

function loadServiceAccount() {
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

  if (!serviceAccountPath) {
    return null;
  }

  const resolvedPath = path.resolve(serviceAccountPath);
  const raw = fs.readFileSync(resolvedPath, "utf8");
  return JSON.parse(raw);
}

function extractProjectIdFromServiceAccount(serviceAccount) {
  if (!serviceAccount || typeof serviceAccount !== "object") {
    return null;
  }

  return serviceAccount.projectId ?? serviceAccount.project_id ?? null;
}

function loadServiceAccountFromEnv() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    return null;
  }

  return {
    projectId,
    clientEmail,
    privateKey
  };
}

export function initFirebaseAdmin() {
  if (getApps().length > 0) {
    return;
  }

  const serviceAccount = loadServiceAccount() ?? loadServiceAccountFromEnv();
  resolvedProjectId =
    process.env.FIREBASE_PROJECT_ID ?? extractProjectIdFromServiceAccount(serviceAccount) ?? resolvedProjectId;

  if (serviceAccount) {
    initializeApp({
      credential: cert(serviceAccount),
      projectId: resolvedProjectId ?? undefined
    });
    return;
  }

  initializeApp({
    credential: applicationDefault(),
    projectId: resolvedProjectId ?? undefined
  });
}

export function getDb() {
  initFirebaseAdmin();
  return getFirestore();
}

export function getFirebaseProjectId() {
  initFirebaseAdmin();
  const app = getApps()[0];
  return app?.options?.projectId ?? resolvedProjectId ?? process.env.FIREBASE_PROJECT_ID ?? null;
}
