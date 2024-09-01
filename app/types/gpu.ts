import { z } from "zod";

export type ProcessInfo = {
  username: string;
  command: string;
};

export type GPUInfo = {
  gpu_name: string;
  index: number;
  fan_speed: number;
  memory_total: number;
  memory_used: number;
  process: ProcessInfo[];
  temperature: number;
  utilization: number;
  time: Date;
};

export type GPUInfoWithUser = GPUInfo & {
  user: string | null;
};

export type NodeInfo = {
  ip: string;
  gpus: GPUInfoWithUser[];
};

export type PartitionInfo<Node> = {
  partition: string;
  nodes: Node[];
};

export const GPUInfoWithUserSchema = z.object({
  gpu_name: z.string(),
  index: z.number(),
  fan_speed: z.number(),
  memory_total: z.number(),
  memory_used: z.number(),
  process: z.array(
    z.object({
      username: z.string(),
      command: z.string(),
    }),
  ),
  temperature: z.number(),
  utilization: z.number(),
  time: z.coerce.date(),
  user: z.string().nullable(),
});

export const NodeInfoSchema = z.object({
  ip: z.string(),
  gpus: z.array(GPUInfoWithUserSchema),
});

export const PartitionInfoSchema = z.object({
  partition: z.string(),
  nodes: z.array(NodeInfoSchema),
});
