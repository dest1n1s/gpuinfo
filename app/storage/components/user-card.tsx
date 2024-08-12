import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StorageInfo } from "@/types/storage";

export type UserCardProps = {
  storageInfo: StorageInfo;
  selectedFile: string;
};

export const UserCard = ({ storageInfo, selectedFile }: UserCardProps) => {
  const storageHistory = storageInfo.storageHistory[selectedFile];
  console.log(storageInfo.storageHistory);
  const storageChange = storageHistory ? storageInfo.storage - storageHistory : 0;

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
              <strong>
                {(storageInfo.storage / 1024 / 1024).toFixed(2)} GB
                {selectedFile && storageChange !== 0 && (
                  <div className="text-right">
                    <strong style={{ color: storageChange >= 0 ? "red" : "green" }}>
                      {storageChange >= 0 ? "+" : "-"}
                      {(Math.abs(storageChange) / 1024 / 1024).toFixed(2)} GB
                    </strong>
                  </div>
                )}
                {selectedFile && storageChange === 0 && (
                  <div className="text-right">
                    <strong style={{ color: "black" }}>No change</strong>
                  </div>
                )}
              </strong>
            </div>
            <div>File Count:</div>
            <div className="text-right">
              <strong>
                {storageInfo.fileCount}
                {selectedFile && storageInfo.fileCountHistory[selectedFile] && (
                  <div className="text-right">
                    <strong
                      style={{
                        color:
                          storageInfo.fileCount - storageInfo.fileCountHistory[selectedFile] >= 0
                            ? "red"
                            : "green",
                      }}
                    >
                      {storageInfo.fileCount - storageInfo.fileCountHistory[selectedFile] >= 0
                        ? "+"
                        : "-"}
                      {Math.abs(storageInfo.fileCount - storageInfo.fileCountHistory[selectedFile])}
                    </strong>
                  </div>
                )}
              </strong>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
