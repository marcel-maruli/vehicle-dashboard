import MainLayout from "@/components/MainLayout";
import { Table, type Column } from "@/components/Table";

import { useEffect, useMemo, useState } from "react";
import type { ManufactureDetailResult } from "@/lib/options/models";
import { useQueryManufactureDetails } from "@/lib/options/queries";
import { Input } from "@/components/Input";
import { useBrand } from "@/context/BrandProvider";
import Button from "@/components/Button";
import { useDisclosure } from "@/utils/useDisclosure";
import ModalDetailForm from "./ModalDetailForm";

const ManufactureList = () => {
  const { brand, setBrand } = useBrand();

  const { onToggle, isOpen } = useDisclosure();
  const [filter, setFilter] = useState<string>("");
  const [originalData, setOriginalData] = useState<ManufactureDetailResult[]>(
    [],
  );
  const [detail, setDetail] = useState<ManufactureDetailResult>();

  const { data, refetch, isLoading } = useQueryManufactureDetails({
    makeName: brand.label.toLowerCase(),
  });

  const displayData = useMemo(() => {
    if (!filter) return originalData;

    return originalData.filter((item) =>
      item?.Mfr_Name?.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [filter, originalData]);

  useEffect(() => {
    refetch();
  }, [brand.label]);

  useEffect(() => {
    setOriginalData(data?.Results as ManufactureDetailResult[]);
  }, [data]);

  const handleDetail = (row: ManufactureDetailResult) => {
    setDetail(row);
    onToggle();
  };

  const columns: Column<ManufactureDetailResult>[] = [
    {
      header: "No.",
      render: (_, __, index) => (
        <p className="text-blue-700 font-medium">{index + 1}</p>
      ),
      className: "w-16 text-center",
    },
    {
      header: "Manufacture ID",
      accessor: "Mfr_ID",
      render: (value) => <p className="text-blue-700 font-medium">{value}</p>,
      className: "min-w-50",
    },
    {
      header: "Manufacture Name",
      accessor: "Mfr_Name",
      className: "w-full",
    },
    {
      header: "Action",
      className: "w-full",
      render(value, row, index) {
        return (
          <Button
            variant="ghost"
            size="sm"
            className="h-6"
            onClick={() => handleDetail(row)}
          >
            Detail
          </Button>
        );
      },
    },
  ];

  return (
    <MainLayout>
      <div className="flex flex-col gap-2">
        <p className="text-black font-bold">{brand.label} Manufacture List</p>
        <div className="flex flex-col">
          <div className="w-150">
            <Input
              onChange={({ currentTarget }) => setFilter(currentTarget.value)}
              placeholder="Searching Manufacture by Name..."
            />
          </div>
        </div>
        <div className="flex flex-col items-center min-h-full min-w-full text-black gap-10 shadow-xl">
          <Table columns={columns} data={displayData} isLoading={isLoading} />
        </div>
      </div>
      <ModalDetailForm onClose={onToggle} isOpen={isOpen} data={detail} />
    </MainLayout>
  );
};

export default ManufactureList;
