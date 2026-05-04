import MainLayout from "@/components/MainLayout";
import { Table, type Column } from "@/components/Table";

import { useEffect, useMemo, useState } from "react";
import type { Options, OptionsResponse } from "@/lib/options/models";
import { useMutationBrandOptions } from "@/lib/options/queries";
import { Input } from "@/components/Input";

const BrandList = () => {
  const [filter, setFilter] = useState<string>("");
  const [originalData, setOriginalData] = useState<Options[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { mutate } = useMutationBrandOptions();

  const displayData = useMemo(() => {
    if (!filter) return originalData;

    return originalData.filter((item) =>
      item?.Make_Name?.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [filter, originalData]);

  useEffect(() => {
    setIsLoading(true);
    mutate(1, {
      onSuccess: (res: OptionsResponse) => {
        setIsLoading(false);
        setOriginalData(res.Results || []);
      },
    });
  }, []);

  const columns: Column<Options>[] = [
    {
      header: "No.",
      render: (_, __, index) => (
        <p className="text-blue-700 font-medium">{index + 1}</p>
      ),
      className: "w-16 text-center",
    },
    {
      header: "ID",
      accessor: "Make_ID",
      render: (value) => <p className="text-blue-700 font-medium">{value}</p>,
      className: "w-24",
    },
    {
      header: "Brand Name",
      accessor: "Make_Name",
      className: "w-full",
    },
  ];

  return (
    <MainLayout>
      <div className="flex flex-col gap-2">
        <p className="text-black font-bold">Brand List</p>
        <div className="flex flex-col">
          <div className="w-150">
            <Input
              onChange={({ currentTarget }) => setFilter(currentTarget.value)}
              placeholder="Searching Make by Name..."
            />
          </div>
        </div>
        <div className="flex flex-col items-center min-h-full min-w-full text-black gap-10 shadow-xl">
          <Table
            columns={columns}
            data={displayData as Options[]}
            isLoading={isLoading}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default BrandList;
