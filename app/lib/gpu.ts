import { logger } from "@/logging.server";
import { NodeInfo, PartitionInfo } from "@/types/gpu";
import { db, mongoConnectPromise } from "./database/database";

export const listPartitions = async (): Promise<PartitionInfo<string>[]> => {
  await mongoConnectPromise;
  return await db.collection<PartitionInfo<string>>("partitions").find().toArray();
};

export const listPartitionsDetailed = async (): Promise<PartitionInfo<NodeInfo>[]> => {
  logger.info("[listPartitionsDetailed] MongoDB request started");
  await mongoConnectPromise;
  const response = await db
    .collection("partitions")
    .aggregate<PartitionInfo<NodeInfo>>([
      {
        $lookup: {
          from: "latestNodes",
          localField: "nodes",
          foreignField: "ip",
          as: "nodes",
        },
      },
    ])
    .toArray();
  logger.info("[listPartitionsDetailed] MongoDB request finished");
  return response;
};
