import { nodes } from "@/config/env";
import { GPUInfo, NodeInfo } from "@/types/gpu";
import { db, mongoConnectPromise } from "./database/database";

export const listAllNodes = async (): Promise<NodeInfo[]> => {
  await mongoConnectPromise;
  return Promise.all(
    nodes.map(async node => {
      const gpus = (await db.collection<GPUInfo>(node).find().toArray())
        .reduce<GPUInfo[]>((acc, gpu) => {
          const exist = acc.find(g => g.index === gpu.index);
          if (exist) {
            if (gpu.time > exist.time) {
              return [...acc.filter(g => g.index !== gpu.index), gpu];
            }
            return acc;
          }
          return [...acc, gpu];
        }, [])
        .toSorted((a, b) => a.index - b.index);
      return { ip: node, gpus };
    }),
  );
};
