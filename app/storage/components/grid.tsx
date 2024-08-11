"use client";

import { HistoryInfo, StorageInfo } from "@/types/storage";
import { format } from "date-fns";
import { useState } from "react";
import { UserCard } from "./user-card";

type StoragePageProps = {
  users: StorageInfo[];
  dates: HistoryInfo[];
};

export const dynamic = "force-dynamic";

export default function StoragePage({ users, dates }: StoragePageProps) {
  const [sortCriteria, setSortCriteria] = useState("usage");
  const [selectedFile, setSelectedFile] = useState("");

  const sortedUsers = users.sort((a, b) => {
    if (sortCriteria === "usage") {
      return b.storage - a.storage;
    } else if (sortCriteria === "username") {
      return a.userName.localeCompare(b.userName);
    } else if (sortCriteria === "delta_usage") {
      if (selectedFile) {
        const incrementA = a.storage - a.storageHistory[selectedFile];
        const incrementB = b.storage - b.storageHistory[selectedFile];
        return incrementB - incrementA;
      }
      return b.storage - a.storage;
    } else if (sortCriteria === "filecount") {
      return b.fileCount - a.fileCount;
    } else if (sortCriteria === "delta_filecount") {
      if (selectedFile) {
        const incrementA = a.fileCount - a.fileCountHistory[selectedFile];
        const incrementB = b.fileCount - b.fileCountHistory[selectedFile];
        return incrementB - incrementA;
      }
      return b.fileCount - a.fileCount;
    }
    return a.userName.localeCompare(b.userName);
  });

  return (
    <div className="flex min-h-screen flex-col w-full pb-20">
      <div className="flex pt-10 pb-5">
        <h1 className="text-3xl font-bold">Storage</h1>
        <select onChange={e => setSortCriteria(e.target.value)} className="ml-4 p-2 border rounded">
          <option value="usage">Sort by Usage</option>
          <option value="username">Sort by Username</option>
          <option value="delta_usage">Sort by Usage Increment</option>
          <option value="filecount">Sort by File Count</option>
          <option value="delta_filecount">Sort by File Count Increment</option>
        </select>
        <select onChange={e => setSelectedFile(e.target.value)} className="ml-4 p-2 border rounded">
          <option value="">Compare with Previous Date</option>
          {dates.map(({ timestamp, fileName }) => (
            <option key={fileName} value={fileName}>
              {format(new Date(timestamp), "yyyy-MM-dd HH:mm:ss")}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-x-6 gap-y-10 grid-cols-[repeat(1,fit-content(100%))] lg:grid-cols-[repeat(2,fit-content(100%))] xl:grid-cols-[repeat(3,fit-content(100%))] self-stretch place-content-around">
        {sortedUsers.map(storageInfo => (
          <UserCard
            key={storageInfo.userName}
            storageInfo={storageInfo}
            selectedFile={selectedFile}
          />
        ))}
        {users.length === 0 && (
          <div className="text-center w-full">
            <p>No users found</p>
          </div>
        )}
      </div>
    </div>
  );
}
