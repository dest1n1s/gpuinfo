export const mongodbUrl = process.env.MONGODB_URL || "mongodb://localhost:27017";
export const mongodbDbName = process.env.MONGODB_DB_NAME || "mongo";
export const mongodbDirectConnection = process.env.MONGODB_DIRECT_CONNECTION === "true";
export const totalUrl = process.env.TOTAL_URL || "http://10.176.52.3:5000/total";
export const currentUsageUrl = process.env.CURRENT_USAGE_URL || "http://10.176.52.3:5000/show";
export const historyFileUrl = process.env.HISTORY_FILE_URL || "http://10.176.52.3:5000/query";
export const historyUsageUrl = process.env.HISTORY_USAGE_URL || "http://10.176.52.3:5000/history";
export const passwdFilePath = process.env.PASSWD_FILE || "/etc/passwd";
export const totalUrl_new = process.env.TOTAL_URL_NEW || "http://10.176.52.11:5000/total";
export const currentUsageUrl_new =
  process.env.CURRENT_USAGE_URL_NEW || "http://10.176.52.11:5000/show";
export const historyFileUrl_new =
  process.env.HISTORY_FILE_URL_NEW || "http://10.176.52.11:5000/query";
export const historyUsageUrl_new =
  process.env.HISTORY_USAGE_URL_NEW || "http://10.176.52.11:5000/history";
