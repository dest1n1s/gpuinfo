import {
  compareHistoryInfo,
  fetchAllHistory,
  fetchAvailableDates,
  listAllUsers,
} from "@/lib/storage";
import StoragePage from "./components/grid";

export const dynamic = "force-dynamic";

export default async function Storage() {
  const users = await listAllUsers();
  const dates = await fetchAvailableDates();
  const usersWithHistory = await fetchAllHistory(users);

  dates.sort(compareHistoryInfo).reverse();

  return <StoragePage users={usersWithHistory} dates={dates} />;
}
