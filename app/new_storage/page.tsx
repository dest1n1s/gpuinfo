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
import StoragePage from "../storage/components/grid";

export const dynamic = "force-dynamic";

export default async function Storage() {
  const users = await listAllUsers(currentUsageUrl_new);
  const dates = await fetchAvailableDates(historyFileUrl_new);
  const total = await getTotal(totalUrl_new);
  const [usersWithHistory, totalWithHistory] = await fetchAllHistory(
    historyFileUrl_new,
    historyUsageUrl_new,
    users,
    total,
  );

  dates.sort(compareHistoryInfo).reverse();

  return (
    <StoragePage
      users={usersWithHistory}
      dates={dates}
      total={totalWithHistory}
      title="New Storage"
    />
  );
}
