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
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col w-full">
      <div className="flex pt-10 pb-5">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 self-stretch items-start">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>node-1</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col w-full items-center gap-4">
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="flex gap-2">
                    <div className="flex flex-col gap-1 grow">
                      <div className="flex justify-between">
                        <div>0</div>
                        <div>24,315M/81,920M</div>
                      </div>
                      <Progress value={50} />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-6 items-center">
                    <div className="grid grid-cols-3 gap-4 items-center">
                      <div className="font-bold">GPU Name</div>
                      <div className="col-span-2 justify-self-end">NVIDIA A100</div>
                      <div className="font-bold">IP</div>
                      <div className="col-span-2 justify-self-end">slurm-1</div>
                      <div className="font-bold">Memory Usage</div>
                      <div className="col-span-2 justify-self-end">
                        24,315M<span className="font-bold">/</span>81,920M
                      </div>
                      <div className="font-bold">CPU Usage</div>
                      <div className="col-span-2 justify-self-end">50%</div>
                      <div className="font-bold">Temperature</div>
                      <div className="col-span-2 justify-self-end">65°C</div>
                    </div>
                    <div className="self-start">
                      Data updated at <span className="font-bold">12:00 PM</span>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm">View Processes</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Processes running on GPU 0 of node-1</AlertDialogTitle>
                          <AlertDialogDescription>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="w-[100px]">User</TableHead>
                                  <TableHead className="text-right">Process</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="font-medium">INV001</TableCell>
                                  <TableCell className="text-right">$250.00</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogAction>Done</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="flex gap-2">
                    <div>0</div>
                    <Progress value={50} />
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="flex gap-2">
                    <div>0</div>
                    <Progress value={50} />
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="flex gap-2">
                    <div>0</div>
                    <Progress value={50} />
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger className="flex gap-2">
                    <div>0</div>
                    <Progress value={50} />
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </CardContent>
        </Card>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>node-1</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4"></div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
