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

export type NodeInfo = {
  ip: string;
  gpus: GPUInfo[];
};
