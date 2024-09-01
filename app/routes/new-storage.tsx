import StoragePage from "@/components/app/storage-page";
import {
  currentUsageUrl_new,
  historyFileUrl_new,
  historyUsageUrl_new,
  totalUrl_new,
} from "@/config/env";
import {
  compareHistoryInfo,
  fetchAllHistory,
  fetchAvailableDates,
  getTotal,
  listAllUsers,
} from "@/lib/storage";
import { HistoryInfoSchema, StorageInfoSchema, TotalStorageSchema } from "@/types/storage";
import { useLoaderData } from "@remix-run/react";

export const dynamic = "force-dynamic";

export const loader = async () => {
  const users = await listAllUsers(currentUsageUrl_new);
  const dates = await fetchAvailableDates(historyFileUrl_new);
  const total = await getTotal(totalUrl_new);
  const [usersWithHistory, totalWithHistory] = await fetchAllHistory(
    historyFileUrl_new,
    historyUsageUrl_new,
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
