import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StorageInfo } from "@/types/storage";

export type UserCardProps = {
  storageInfo: StorageInfo;
  selectedFile: string;
};

export const UserCard = ({ storageInfo, selectedFile }: UserCardProps) => {
  const storageHistory = storageInfo.storageHistory[selectedFile];
  const storageChange =
    storageHistory !== undefined && storageHistory !== null
      ? parseFloat(((storageInfo.storage - storageHistory) / 1024 / 1024).toFixed(2))
      : 0;
  const fileChange = storageInfo.fileCountHistory[selectedFile]
    ? storageInfo.fileCount - storageInfo.fileCountHistory[selectedFile]
    : 0;

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
              <strong>{(storageInfo.storage / 1024 / 1024).toFixed(2)} GB</strong>
              {selectedFile && storageChange !== 0 && (
                <div className="text-right">
                  <div style={{ color: storageChange >= 0 ? "red" : "green" }}>
                    {storageChange >= 0 ? "+" : "-"}
                    {Math.abs(storageChange).toFixed(2)} GB
                  </div>
                </div>
              )}
              {selectedFile && storageChange === 0 && <div className="text-right">No change</div>}
            </div>
            <div>File Count:</div>
            <div className="text-right">
              <strong>{storageInfo.fileCount}</strong>
              {selectedFile && fileChange !== 0 && (
                <div className="text-right">
                  <div style={{ color: fileChange >= 0 ? "red" : "green" }}>
                    {fileChange >= 0 ? "+" : "-"}
                    {Math.abs(fileChange)}
                  </div>
                </div>
              )}
              {selectedFile && fileChange === 0 && <div className="text-right">No change</div>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
