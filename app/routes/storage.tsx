import StoragePage from "@/components/app/storage-page";
import { storageBackendUrl } from "@/config/env";
import {
  compareHistoryInfo,
  fetchAllHistory,
  fetchAvailableDates,
  getTotal,
  listAllUsers,
} from "@/lib/storage";
import { HistoryInfoSchema, StorageInfoSchema, TotalStorageSchema } from "@/types/storage";
import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
  const users = await listAllUsers(`${storageBackendUrl}/show`);
  const dates = await fetchAvailableDates(`${storageBackendUrl}/query`);
  const total = await getTotal(`${storageBackendUrl}/total`);
  const [usersWithHistory, totalWithHistory] = await fetchAllHistory(
    `${storageBackendUrl}/query`,
    `${storageBackendUrl}/history`,
    users,
    total,
  );
  return {
    users: usersWithHistory,
    dates: dates.sort(compareHistoryInfo).reverse(),
    total: totalWithHistory,
  };
};

export default function Storage() {
  const loaderData = useLoaderData<typeof loader>();
  const users = StorageInfoSchema.array().parse(loaderData.users);
  const dates = HistoryInfoSchema.array().parse(loaderData.dates);
  const total = TotalStorageSchema.parse(loaderData.total);

  return <StoragePage users={users} dates={dates} total={total} title="Old Storage" />;
}
