import { StorageInfo } from "@/types/storage";
import * as fs from 'fs';

function parsePasswdFile(fileContent: string): { [id: string]: string } {
    const lines = fileContent.split('\n');
    const idToUsername: { [id: string]: string } = {};

    for (const line of lines) {
        const fields = line.split(':');
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
        const fileContent = await fs.promises.readFile('/etc/passwd', 'utf-8');
        const idToUsername = parsePasswdFile(fileContent);
        return idToUsername;
    } catch (error) {
        console.error('There was a problem fetching the usernames:', error);
        throw error;
    }
}

// Call fetchUsernames() and use the returned dictionary in your code

// Use idToUsername in your code

async function fetchFileContent(url: string = 'http://10.176.52.3:5000/show'): Promise<string> {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const content = await response.text();
      return content;
    } catch (error) {
      console.error('There was a problem fetching the file:', error);
      throw error;
    }
  }

export const parseUserQuotas = (rawData: any[], idToUsername: { [id: string]: string }): StorageInfo[] => {
    return rawData
      .filter(item => item.type_block === 'USR')
      .map(item => ({
        userName: idToUsername[item.Name_block] ?? item.Name_block,
        storage: parseInt(item.KB_block, 10),
        fileCount: parseInt(item.files_file, 10)
      }));
  };

  export const listAllUsers = async() => {
      const fileContent = await fetchFileContent();
      const idToUsername = await fetchUsernames();
      const jsonData = JSON.parse(fileContent);
      const userQuotas = parseUserQuotas(jsonData, idToUsername);
      return userQuotas;
  }