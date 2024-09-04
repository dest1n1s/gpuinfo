import { NodeCard } from "@/components/app/node-card";
import { listPartitionsDetailed } from "@/lib/gpu";
import { PartitionInfoSchema } from "@/types/gpu";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { Fragment } from "react/jsx-runtime";

export async function loader() {
  return { partitions: await listPartitionsDetailed() };
}

export async function action() {
  return { partitions: await listPartitionsDetailed() };
}

export default function Page() {
  const loaderData = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const partitions = PartitionInfoSchema.array().parse((fetcher.data || loaderData).partitions);

  useEffect(() => {
    const interval = setInterval(async () => {
      fetcher.submit(new FormData(), { method: "post" });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col w-full pt-10 pb-20 gap-10">
      <h1 className="text-3xl font-bold">Monitor GPU Status</h1>
      {partitions.map(partition => (
        <Fragment key={partition.partition}>
          <Link to={`#${partition.partition}`}>
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
