import { nodes, partition } from "@/config/env";
import { GPUInfo, NodeInfo } from "@/types/gpu";
import { db, mongoConnectPromise } from "./database/database";

export const getNodes = async (): Promise<string[]> => {
  await mongoConnectPromise;
  if (partition) {
    return (await db.collection("partition").findOne({}))![partition];
  } else {
    return nodes;
  }
};

export const listAllNodes = async (): Promise<NodeInfo[]> => {
  await mongoConnectPromise;
  return Promise.all(
    (await getNodes()).map(async node => {
      const gpus = await Promise.all(
        (await db.collection<GPUInfo>(node).find().toArray())
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
          .toSorted((a, b) => a.index - b.index)
          .map(async gpu => ({
            ...gpu,
            user: (await db.collection(node + "-user").findOne({ idx: gpu.index }))?.user ?? null,
          })),
      );

      return { ip: node, gpus };
    }),
  );
};
