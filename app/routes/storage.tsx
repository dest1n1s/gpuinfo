import StoragePage from "@/components/app/storage-page";
import { currentUsageUrl, historyFileUrl, historyUsageUrl, totalUrl } from "@/config/env";
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
  const users = await listAllUsers(currentUsageUrl);
  const dates = await fetchAvailableDates(historyFileUrl);
  const total = await getTotal(totalUrl);
  const [usersWithHistory, totalWithHistory] = await fetchAllHistory(
    historyFileUrl,
    historyUsageUrl,
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
