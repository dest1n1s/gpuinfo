import { GPUInfo, NodeInfo, PartitionInfo } from "@/types/gpu";
import { db, mongoConnectPromise } from "./database/database";

export const listPartitions = async (): Promise<PartitionInfo<string>[]> => {
  await mongoConnectPromise;
  return await db.collection<PartitionInfo<string>>("partitions").find().toArray();
};

export const listPartitionsDetailed = async (): Promise<PartitionInfo<NodeInfo>[]> => {
  await mongoConnectPromise;
  return Promise.all(
    (await listPartitions()).map(async partition => {
      const nodes = await Promise.all(
        partition.nodes.map(async node => {
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
              .map(async gpu => {
                const userInfo = await db
                  .collection<{ user: string; start_time: Date }>(node + "-user")
                  .findOne({ idx: gpu.index });
                return {
                  ...gpu,
                  user: userInfo?.user ?? null,
                  start_time: userInfo?.start_time ?? null,
                };
              }),
          );

          return { ip: node, gpus };
        }),
      );

      return { ...partition, nodes };
    }),
  );
};
