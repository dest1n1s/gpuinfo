export const mongodbUrl = process.env.MONGODB_URL || "mongodb://localhost:27017";
export const mongodbDbName = process.env.MONGODB_DB_NAME || "mongo";
export const mongodbDirectConnection = process.env.MONGODB_DIRECT_CONNECTION === "true";
export const passwdFilePath = process.env.PASSWD_FILE || "/etc/passwd";

export const storageBackendUrl = process.env.STORAGE_BACKEND_URL || "http://10.176.52.3:5000";
export const storageBackendUrlNew =
  process.env.STORAGE_BACKEND_URL_NEW || "http://10.176.52.11:5000";
