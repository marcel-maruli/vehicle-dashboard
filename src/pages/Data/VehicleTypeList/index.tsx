import MainLayout from "@/components/MainLayout";
import { Table, type Column } from "@/components/Table";

import { useEffect, useMemo, useState } from "react";
import type { VehicleTypes, VehicleTypesResponse } from "@/lib/options/models";
import { useMutationVehicleTypes } from "@/lib/options/queries";
import { Input } from "@/components/Input";
import { useBrand } from "@/context/BrandProvider";

const BrandList = () => {
  const { brand, setBrand } = useBrand();

  const [filter, setFilter] = useState<string>("");
  const [originalData, setOriginalData] = useState<VehicleTypes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { mutate } = useMutationVehicleTypes();

  const displayData = useMemo(() => {
    if (!filter) return originalData;

    return originalData.filter((item) =>
      item?.VehicleTypeName?.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [filter, originalData]);

  useEffect(() => {
    setIsLoading(true);
    mutate(
      { makeId: Number(brand.value), page: 1 },
      {
        onSuccess: (res: VehicleTypesResponse) => {
          setIsLoading(false);
          setOriginalData(res.Results || []);
        },
      },
    );
  }, []);

  const columns: Column<VehicleTypes>[] = [
    {
      header: "No.",
      render: (_, __, index) => (
        <p className="text-blue-700 font-medium">{index + 1}</p>
      ),
      className: "w-16 text-center",
    },
    {
      header: "Type ID",
      accessor: "VehicleTypeId",
      render: (value) => <p className="text-blue-700 font-medium">{value}</p>,
      className: "w-24",
    },
    {
      header: "Type Name",
      accessor: "VehicleTypeName",
      className: "w-full",
    },
  ];

  return (
    <MainLayout>
      <div className="flex flex-col gap-2">
        <p className="text-black font-bold">Produced Type by {brand.label}</p>
        <div className="flex flex-col">
          <div className="w-150">
            <Input
              onChange={({ currentTarget }) => setFilter(currentTarget.value)}
              placeholder="Searching Make by Name..."
            />
          </div>
        </div>
        <div className="flex flex-col items-center min-h-full min-w-full text-black gap-10 shadow-xl">
          <Table columns={columns} data={displayData} isLoading={isLoading} />
        </div>
      </div>
    </MainLayout>
  );
};

export default BrandList;
