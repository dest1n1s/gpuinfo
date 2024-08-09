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
import { StorageInfo } from "@/types/storage";
import { format } from "date-fns";

export type UserCardProps = {
    storageInfo: StorageInfo;
  };

export const UserCard = ({ storageInfo }: UserCardProps) => {
    return (
      <Card className="w-full lg:w-[400px]">
        <CardHeader>
          <CardTitle>{storageInfo.userName}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-2">
              <div>Storage Usage:</div>
              <div className="text-right">
                <strong>{(storageInfo.storage/1024/1024).toFixed(2)}</strong> GB
              </div>
              <div>File Count:</div>
              <div className="text-right">
              <strong>{storageInfo.fileCount}</strong>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };