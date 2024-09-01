import { z } from "zod";

export type StorageInfo = {
  userName: string;
  storage: number;
  fileCount: number;
  storageHistory: { [filename: string]: number };
  fileCountHistory: { [filename: string]: number };
};

export type HistoryInfo = {
  timestamp: Date;
  fileName: string;
};

export type TotalStorage = {
  restPercentage: number;
  restSize: number;
  totalSize: number;
  totalHistory: { [filename: string]: TotalStorage };
};

export const StorageInfoSchema = z.object({
  userName: z.string(),
  storage: z.number(),
  fileCount: z.number(),
  storageHistory: z.record(z.number()),
  fileCountHistory: z.record(z.number()),
});

export const HistoryInfoSchema = z.object({
  timestamp: z.coerce.date(),
  fileName: z.string(),
});

export const TotalStorageSchema: z.ZodType<TotalStorage> = z.object({
  restPercentage: z.number(),
  restSize: z.number(),
  totalSize: z.number(),
  totalHistory: z.lazy(() => z.record(TotalStorageSchema)),
});
