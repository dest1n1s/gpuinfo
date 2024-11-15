import { logger } from "@/logging.server";
import { NodeInfo, PartitionInfo } from "@/types/gpu";
import { cache } from "./cache.server";
import { db, mongoConnectPromise } from "./database/database";

export const listPartitions = async (): Promise<PartitionInfo<string>[]> => {
  await mongoConnectPromise;

  const cacheKey = "listPartitions";
  const inCache = cache.get<PartitionInfo<string>[]>(cacheKey);
  if (inCache) {
    logger.info("[listPartitions] Cache hit");
    return inCache;
  }
  logger.info("[listPartitions] MongoDB request started");
  const response = await db.collection<PartitionInfo<string>>("partitions").find().toArray();
  cache.set(cacheKey, response);
  logger.info("[listPartitions] MongoDB request finished");
  return response;
};

export const listPartitionsDetailed = async (): Promise<PartitionInfo<NodeInfo>[]> => {
  await mongoConnectPromise;

  const cacheKey = "listPartitionsDetailed";
  const inCache = cache.get<PartitionInfo<NodeInfo>[]>(cacheKey);
  if (inCache) {
    logger.info("[listPartitionsDetailed] Cache hit");
    return inCache;
  }
  logger.info("[listPartitionsDetailed] MongoDB request started");
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

  cache.set(cacheKey, response);
  logger.info("[listPartitionsDetailed] MongoDB request finished");
  return response;
};
