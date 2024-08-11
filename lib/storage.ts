import { currentUsageUrl, historyFileUrl, historyUsageUrl, passwdFilePath } from "@/config/env";
import { HistoryInfo, StorageInfo } from "@/types/storage";
import * as fs from "fs";

function parsePasswdFile(fileContent: string): { [id: string]: string } {
  const lines = fileContent.split("\n");
  const idToUsername: { [id: string]: string } = {};

  for (const line of lines) {
    const fields = line.split(":");
    const username = fields[0];
    const id = fields[2];

    if (username && id) {
      idToUsername[id] = username;
    }
  }

  return idToUsername;
}

async function fetchUsernames(): Promise<{ [id: string]: string }> {
  try {
    const fileContent = await fs.promises.readFile(passwdFilePath, "utf-8");
    const idToUsername = parsePasswdFile(fileContent);
    return idToUsername;
  } catch (error) {
    console.error("There was a problem fetching the usernames:", error);
    return {};
  }
}

async function fetchHistory(url: string = historyFileUrl): Promise<string> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const content = await response.text();
    return content;
  } catch (error) {
    console.error("There was a problem fetching the file:", error);
    throw error;
  }
}

function parseFileName(fileName: string): HistoryInfo {
  const match = fileName.match(/results_(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6})\.json/);
  if (!match) {
    throw new Error(`Invalid file name format: ${fileName}`);
  }

  const dateTimeString = match[1];
  const [datePart, timePart] = dateTimeString.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes, seconds] = timePart.split(":");
  const [wholeSecs, microsecs] = seconds.split(".");

  const timestamp = new Date(
    year,
    month - 1,
    day,
    Number(hours),
    Number(minutes),
    Number(wholeSecs),
    Math.floor(Number(microsecs) / 1000),
  );

  return {
    timestamp,
    fileName,
  };
}

export function parseHistory(fileNames: string[]): HistoryInfo[] {
  return fileNames.map(parseFileName);
}

async function fetchHistoryContent(url: string): Promise<string> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const content = await response.text();
    return content;
  } catch (error) {
    console.error("There was a problem fetching the file:", error);
    throw error;
  }
}

async function fetchFileContent(url: string = currentUsageUrl): Promise<string> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const content = await response.text();
    return content;
  } catch (error) {
    console.error("There was a problem fetching the file:", error);
    throw error;
  }
}

export const parseUserQuotas = (
  rawData: any[],
  idToUsername: { [id: string]: string },
): StorageInfo[] => {
  return rawData
    .filter(item => item.type_block === "USR")
    .map(item => ({
      userName: idToUsername[item.Name_block] ?? item.Name_block,
      storage: parseInt(item.KB_block, 10),
      fileCount: parseInt(item.files_file, 10),
      storageHistory: {},
      fileCountHistory: {},
    }));
};

export const listAllUsers = async () => {
  const fileContent = await fetchFileContent();
  const idToUsername = await fetchUsernames();
  const jsonData = JSON.parse(fileContent);
  const userQuotas = parseUserQuotas(jsonData, idToUsername);
  return userQuotas;
};

export const parseHistoryContent = (
  rawData: any[],
  idToUsername: { [id: string]: string },
  existingUsers: StorageInfo[],
  fileName: string,
): StorageInfo[] => {
  const userMap = new Map<string, StorageInfo>();
  existingUsers.forEach(user => {
    userMap.set(user.userName, user);
  });
  rawData
    .filter(item => item.type_block === "USR")
    .forEach(item => {
      const userName = idToUsername[item.Name_block] ?? item.Name_block;
      const storage = parseInt(item.KB_block, 10);
      const fileCount = parseInt(item.files_file, 10);

      if (userMap.has(userName)) {
        const userInfo = userMap.get(userName)!;
        userInfo.storageHistory[fileName] = storage;
        userInfo.fileCountHistory[fileName] = fileCount;
      }
    });

  return Array.from(userMap.values());
};

export const fetchDelta = async (HistoryInfo: HistoryInfo, Users: StorageInfo[]) => {
  var url =
    historyUsageUrl + "/" + HistoryInfo.fileName.replace("results_", "").replace(".json", "");
  const idToUsername = await fetchUsernames();
  const historyContent = await fetchHistoryContent(url);
  const jsonData = JSON.parse(historyContent);
  const historyUserQuotas = parseHistoryContent(
    jsonData,
    idToUsername,
    Users,
    HistoryInfo.fileName,
  );
  return historyUserQuotas;
};

export const fetchAllHistory = async (Users: StorageInfo[]) => {
  const history = await fetchHistory();
  const jsonData = JSON.parse(history);
  const allHistory = parseHistory(jsonData);
  let usersWithHistory = Users;
  for (const historyInfo of allHistory) {
    usersWithHistory = await fetchDelta(historyInfo, Users);
  }
  return usersWithHistory;
};

export const fetchAvailableDates = async () => {
  const history = await fetchHistory();
  const jsonData = JSON.parse(history);
  return parseHistory(jsonData);
};

export function compareHistoryInfo(a: HistoryInfo, b: HistoryInfo): number {
  return a.timestamp.getTime() - b.timestamp.getTime();
}
