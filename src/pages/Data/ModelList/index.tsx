import { useMemo, useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Table, type Column } from "@/components/Table";
import { Input } from "@/components/Input";
import Button from "@/components/Button";
import { useBrand } from "@/context/BrandProvider";
import { useDisclosure } from "@/utils/useDisclosure";
import { useQueriesModelsForMakeYear } from "@/lib/options/queries";
import type { ModelsType } from "@/lib/options/models";
import Dropdown, { type Option } from "@/components/Dropdown";

const YEARS = ["2023", "2024", "2025"];
const TYPES = ["passenger_car", "mpv", "motorcycle", "truck"] as const;
const Options = [
  { label: "All Types", value: "all" },
  { label: "Passenger Car", value: "Passenger Car" },
  { label: "MPV", value: "MPV" },
  { label: "Motorcycle", value: "Motorcycle" },
  { label: "Truck", value: "Truck" },
];

const ModelList = () => {
  const { brand } = useBrand();
  const { onToggle } = useDisclosure();

  const [filter, setFilter] = useState<{ search: string; type: Option }>({
    search: "",
    type: Options[0],
  });
  const [detail, setDetail] = useState<ModelsType>();

  const payloads = useMemo(() => {
    if (!brand?.value) return [];

    return YEARS.flatMap((year) =>
      TYPES.map((type) => ({
        makeId: brand.value as number,
        year: parseInt(year),
        vehicletype: type,
      })),
    );
  }, [brand]);

  const results = useQueriesModelsForMakeYear(payloads, {
    enabled: !!brand?.value,
    staleTime: Infinity,
  });

  // 2. Optimized Data Processing
  const displayData = useMemo(() => {
    if (results.length === 0 || results.some((r) => !r.isSuccess)) {
      return [];
    }

    const flatResults = results.flatMap((item) => item.data?.Results || []);

    const uniqueModelsMap = new Map();

    flatResults.forEach((model) => {
      const matchesSearch =
        !filter.search ||
        model.Model_Name?.toLowerCase().includes(filter.search.toLowerCase());

      const matchesType =
        filter.type.value == "all" ||
        model.VehicleTypeName?.toLowerCase() ===
          String(filter.type.value)?.toLowerCase();

      if (model && matchesSearch && matchesType) {
        if (!uniqueModelsMap.has(model.Model_ID)) {
          uniqueModelsMap.set(model.Model_ID, model);
        }
      }
    });

    return Array.from(uniqueModelsMap.values());
  }, [results, filter.search, filter.type]);

  const columns: Column<ModelsType>[] = [
    {
      header: "No.",
      render: (_, __, i) => <span className="text-blue-700">{i + 1}</span>,
      className: "w-16 text-center",
    },
    {
      header: "Model ID",
      accessor: "Model_ID",
      className: "w-32 text-blue-700",
    },
    {
      header: "Model Name",
      accessor: "Model_Name",
      className: "font-semibold",
    },
    { header: "Vehicle Type", accessor: "VehicleTypeName", className: "w-48" },
    { header: "Make", accessor: "Make_Name", className: "w-40" },
    {
      header: "Action",
      className: "w-24 text-center",
      render: (_, row) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setDetail(row);
            onToggle();
          }}
        >
          Detail
        </Button>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="flex flex-col gap-4 text-black">
        <p className="text-black font-bold text-xl">
          Model List in {brand.label}
        </p>

        <div className="flex gap-4 items-end bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm">
          <Input
            label="Search Model"
            placeholder="e.g. Accord"
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, search: e.target.value }))
            }
          />

          <Dropdown
            value={filter.type}
            options={Options}
            onChange={(val) =>
              val && setFilter((prev) => ({ ...prev, type: val }))
            }
          />
        </div>

        <div className="shadow-xl rounded-lg overflow-hidden bg-white">
          <Table
            columns={columns}
            data={displayData}
            isLoading={results.some((r) => r.isLoading)}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default ModelList;
