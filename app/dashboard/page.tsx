import { listAllNodes } from "@/lib/gpu";
import { NodeCard } from "./ components/node-card";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const nodeInfos = await listAllNodes();

  return (
    <div className="flex min-h-screen flex-col w-full pb-20">
      <div className="flex pt-10 pb-5">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      <div className="grid gap-x-6 gap-y-10 grid-cols-[repeat(1,fit-content(100%))] lg:grid-cols-[repeat(2,fit-content(100%))] xl:grid-cols-[repeat(3,fit-content(100%))] self-stretch place-content-around">
        {nodeInfos.map(node => (
          <NodeCard key={node.ip} node={node} />
        ))}
        {nodeInfos.length === 0 && (
          <div className="text-center w-full">
            <p>No nodes found</p>
          </div>
        )}
      </div>
    </div>
  );
}
