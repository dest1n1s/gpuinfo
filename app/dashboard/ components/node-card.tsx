import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GPUInfoWithUser, NodeInfo } from "@/types/gpu";
import { format } from "date-fns";

export type GPUAccordionItemProps = {
  gpu: GPUInfoWithUser;
};
export const GPUAccordionItem = ({ gpu }: GPUAccordionItemProps) => {
  return (
    <AccordionItem value={`${gpu.index}`}>
      <AccordionTrigger className="flex gap-2">
        <div className="flex flex-col gap-1 grow">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <div>GPU {gpu.index}</div>
              {gpu.user && <div className="text-gray-600">({gpu.user})</div>}
            </div>
            <div className="flex">
              {gpu.utilization}%
              <Separator orientation="vertical" className="mx-1" />
              {gpu.memory_used}M<span className="font-bold">/</span>
              {gpu.memory_total}M
            </div>
          </div>
          <Progress value={(gpu.memory_used / gpu.memory_total) * 100} />
        </div>
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-6 items-center">
        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="font-bold">GPU Name</div>
          <div className="col-span-2 justify-self-end">{gpu.gpu_name}</div>
          <div className="font-bold">Memory Usage</div>
          <div className="col-span-2 justify-self-end">
            {gpu.memory_used}M<span className="font-bold">/</span>
            {gpu.memory_total}M
          </div>
          <div className="font-bold">GPU Usage</div>
          <div className="col-span-2 justify-self-end">{gpu.utilization}%</div>
          <div className="font-bold">Fan Speed</div>
          <div className="col-span-2 justify-self-end">{gpu.fan_speed} RPM</div>
          <div className="font-bold">Temperature</div>
          <div className="col-span-2 justify-self-end">{gpu.temperature}°C</div>
        </div>
        {/* <div className="self-start">
          Data updated at{" "}
          <span className="font-bold">{format(gpu.time, "yyyy-MM-dd HH:mm:ss")}</span>.
        </div> */}
        {gpu.process.length === 0 && (
          <Button size="sm" disabled>
            No process running
          </Button>
        )}
        {gpu.process.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm">
                View {gpu.process.length} {gpu.process.length > 1 ? "Processes" : "Process"} running
                on GPU {gpu.index}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-[720px] grid-cols-1">
              <AlertDialogHeader>
                <AlertDialogTitle>Processes running on GPU {gpu.index}</AlertDialogTitle>
                <AlertDialogDescription>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">User</TableHead>
                        <TableHead className="text-right">Process</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {gpu.process.map(process => (
                        <TableRow key={process.command}>
                          <TableCell className="font-medium">{process.username}</TableCell>
                          <TableCell className="text-right">{process.command}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>Done</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

export type NodeCardProps = {
  node: NodeInfo;
};
export const NodeCard = ({ node }: NodeCardProps) => {
  const latestUpdateTime = node.gpus.reduce((acc, gpu) => {
    return gpu.time > acc ? gpu.time : acc;
  }, new Date(0));

  return (
    <Card className="w-full lg:w-[400px]">
      <CardHeader>
        <CardTitle>{node.ip}</CardTitle>
      </CardHeader>
      <CardContent>
        {node.gpus.length > 0 && (
          <div className="self-start">
            Data updated at{" "}
            <span className="font-bold">{format(latestUpdateTime, "yyyy-MM-dd HH:mm:ss")}</span>.
          </div>
        )}
        <div className="flex flex-col w-full gap-4">
          {node.gpus.length > 0 && (
            <Accordion type="multiple" className="w-full">
              {node.gpus.map(gpu => (
                <GPUAccordionItem key={gpu.index} gpu={gpu} />
              ))}
            </Accordion>
          )}
          {node.gpus.length === 0 && (
            <p>
              No GPUs detected on <span className="font-bold">{node.ip}</span>.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
