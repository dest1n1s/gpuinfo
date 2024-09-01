import { mongodbDbName, mongodbDirectConnection, mongodbUrl } from "@/config/env";
import { MongoClient } from "mongodb";
const mongoClient = new MongoClient(mongodbUrl, {
  directConnection: mongodbDirectConnection,
});

export const db = mongoClient.db(mongodbDbName);

export const mongoConnectPromise = mongoClient.connect();

export const withMongoSession = async <T>(callback: () => Promise<T>) => {
  await mongoConnectPromise;
  const session = mongoClient.startSession();
  try {
    return await session.withTransaction(callback);
  } finally {
    session.endSession();
  }
};
