import { NodeInfo, PartitionInfo } from "@/types/gpu";
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
    <MultiSelector values={selectedPartitions} onValuesChange={setSelectedPartitions} loop={false}>
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
  );
};
