import { currentUsageUrl, historyFileUrl, historyUsageUrl, totalUrl } from "@/config/env";
import {
  compareHistoryInfo,
  fetchAllHistory,
  fetchAvailableDates,
  getTotal,
  listAllUsers,
} from "@/lib/storage";
import StoragePage from "./components/grid";

export const dynamic = "force-dynamic";

export default async function Storage() {
  const users = await listAllUsers(currentUsageUrl);
  const dates = await fetchAvailableDates(historyFileUrl);
  const total = await getTotal(totalUrl);
  const [usersWithHistory, totalWithHistory] = await fetchAllHistory(
    historyFileUrl,
    historyUsageUrl,
    users,
    total,
  );

  dates.sort(compareHistoryInfo).reverse();

  return (
    <StoragePage
      users={usersWithHistory}
      dates={dates}
      total={totalWithHistory}
      title="Old Storage"
    />
  );
}
