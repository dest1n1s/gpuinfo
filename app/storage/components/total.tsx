import { TotalStorage } from "@/types/storage";
import numeral from "numeral";

export type TotalStorageProps = {
  totalStorage: TotalStorage;
  selectedFile: string;
};

export default function TotalBar({ totalStorage, selectedFile }: TotalStorageProps) {
  const totalHistory = totalStorage.totalHistory[selectedFile] || null;
  const totalChange = totalHistory
    ? parseFloat(((totalHistory.restSize - totalStorage.restSize) / (1024 * 1024)).toFixed(2))
    : 0;
  const totalChangeFree = totalHistory
    ? parseFloat(((totalStorage.restSize - totalHistory.restSize) / (1024 * 1024)).toFixed(2))
    : 0;
  const totalChangePercentage = totalHistory
    ? totalHistory.restPercentage - totalStorage.restPercentage
    : 0;

  return (
    <div className="space-y-4 w-full">
      <div className="flex justify-between items-center">
        <div className="text-center flex-1">
          <p className="text-sm text-muted-foreground">Total Usage</p>
          <p className="text-2xl font-bold">
            {numeral((totalStorage.totalSize - totalStorage.restSize) / (1024 * 1024)).format(
              "0,0.00",
            )}{" "}
            GB
          </p>
          {selectedFile && totalHistory && totalChange !== 0 && (
            <div style={{ color: totalChange >= 0 ? "red" : "green" }}>
              {totalChange >= 0 ? "+" : "-"}
              {Math.abs(totalChange)} GB
            </div>
          )}
          {selectedFile && totalHistory && totalChange === 0 && (
            <div style={{ color: "black" }}>No change</div>
          )}
        </div>
        <div className="text-center flex-1">
          <p className="text-sm text-muted-foreground">Free Space</p>
          <p className="text-2xl font-bold">
            {numeral(totalStorage.restSize / (1024 * 1024)).format("0,0.00")} GB
          </p>
          {selectedFile && totalHistory && totalChangeFree !== 0 && (
            <div style={{ color: totalChangeFree >= 0 ? "red" : "green" }}>
              {totalChangeFree >= 0 ? "+" : "-"}
              {Math.abs(totalChangeFree)} GB
            </div>
          )}
          {selectedFile && totalHistory && totalChangeFree === 0 && (
            <div style={{ color: "black" }}>No change</div>
          )}
        </div>
        <div className="text-center flex-1">
          <p className="text-sm text-muted-foreground">Used</p>
          <p className="text-2xl font-bold">{100 - totalStorage.restPercentage}%</p>
          {selectedFile && totalChangePercentage !== 0 && (
            <div style={{ color: totalChangePercentage >= 0 ? "red" : "green" }}>
              {totalChangePercentage >= 0 ? "+" : "-"}
              {Math.abs(totalChangePercentage)}%
            </div>
          )}
          {selectedFile && totalHistory && totalChangePercentage === 0 && (
            <div style={{ color: "black" }}>No change</div>
          )}
        </div>
      </div>
    </div>
  );
}
