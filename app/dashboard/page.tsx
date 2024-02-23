export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="flex pt-10 pb-5">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white shadow-md rounded-md p-4">
          <h2 className="text-xl font-bold">Total Users</h2>
          <p className="text-3xl font-bold">100</p>
        </div>
        <div className="bg-white shadow-md rounded-md p-4">
          <h2 className="text-xl font-bold">Total Posts</h2>
          <p className="text-3xl font-bold">100</p>
        </div>
        <div className="bg-white shadow-md rounded-md p-4">
          <h2 className="text-xl font-bold">Total Comments</h2>
          <p className="text-3xl font-bold">100</p>
        </div>
      </div>
    </div>
  );
}
