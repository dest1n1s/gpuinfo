import { NodeInfo, PartitionInfo } from "@/types/gpu";
import { Button } from "../ui/button";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "../ui/multiselect";

export type PartitionsSelectorProps = {
  partitions: PartitionInfo<NodeInfo>[];
  selectedPartitions: string[];
  setSelectedPartitions: (partitions: string[]) => void;
};

export const MultiPartitionsSelector = ({
  partitions,
  selectedPartitions,
  setSelectedPartitions,
}: PartitionsSelectorProps) => {
  return (
    <div className="flex flex-row gap-3">
      <MultiSelector
        values={selectedPartitions}
        onValuesChange={setSelectedPartitions}
        loop={false}
      >
        <MultiSelectorTrigger className="border-2">
          <MultiSelectorInput
            placeholder={selectedPartitions.length > 0 ? "" : "Select partitions"}
          />
        </MultiSelectorTrigger>
        <MultiSelectorContent>
          <MultiSelectorList>
            {partitions.map(partitionInfo => (
              <MultiSelectorItem key={partitionInfo.partition} value={partitionInfo.partition}>
                {partitionInfo.partition}
              </MultiSelectorItem>
            ))}
          </MultiSelectorList>
        </MultiSelectorContent>
      </MultiSelector>
      <Button
        className="mt-2 mr-3"
        onClick={() => {
          setSelectedPartitions([]);
        }}
      >
        Reset
      </Button>
    </div>
  );
};
