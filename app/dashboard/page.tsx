import { listPartitionsDetailed } from "@/lib/gpu";
import Link from "next/link";
import { Fragment } from "react";
import { NodeCard } from "./ components/node-card";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const partitions = await listPartitionsDetailed();

  return (
    <div className="flex min-h-screen flex-col w-full pt-10 pb-20 gap-10">
      <h1 className="text-3xl font-bold">Monitor GPU Status</h1>
      {partitions.map(partition => (
        <Fragment key={partition.partition}>
          <Link href={`#${partition.partition}`}>
            <h2 id={partition.partition} className="text-2xl font-bold relative group">
              <a
                className="absolute -left-6 text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity"
                href={`#${partition.partition}`}
              >
                #
              </a>
              {partition.partition}
              <span className="text-neutral-300 mx-2 font-normal">|</span>
              <span className="text-lg font-normal text-neutral-500">
                {partition.nodes.length} node{partition.nodes.length > 1 ? "s" : ""}{" "}
              </span>
            </h2>
          </Link>
          <div className="grid gap-x-6 gap-y-10 grid-cols-[repeat(1,1fr)] lg:grid-cols-[repeat(2,1fr)] xl:grid-cols-[repeat(3,1fr)] self-stretch place-content-around items-start">
            {partition.nodes.map(node => (
              <NodeCard key={node.ip} node={node} />
            ))}
          </div>
        </Fragment>
      ))}
      {partitions.length === 0 && (
        <div className="text-center w-full">
          <p>No partitions found</p>
        </div>
      )}
    </div>
  );
}
