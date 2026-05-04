import BarChart from "@/components/Charts/BarChart";
import Dropdown, { type Option } from "@/components/Dropdown";
import KpiCard from "@/components/KpiCard";
import MainLayout from "@/components/MainLayout";
import { useBrand } from "@/context/BrandProvider";
import type {
  Options as ModelOptions,
  VehicleTypes,
} from "@/lib/options/models";
import {
  useMutationBrandOptions,
  useMutationModel,
  useMutationVehicleTypes,
  useQueryManufactureDetails,
} from "@/lib/options/queries";
import { Truck, CarFrontIcon, Car, Factory } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ComparisonChartByModels from "./components/ComparisonChartByModels";
import DynamicCountryDoughnutChart from "./components/DynamicCountryDoughnutChart";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { brand, setBrand } = useBrand();
  const navigate = useNavigate();

  // States
  const [models, setModels] = useState<ModelOptions[]>([]);
  const [brandList, setBrandList] = useState<ModelOptions[]>([]);
  const [vehicleTypes, setVehicleTypes] = useState<VehicleTypes[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mutations
  const { mutate: mutateBrandOptions } = useMutationBrandOptions();
  const { mutate: mutateModelOptions } = useMutationModel();
  const { mutate: mutateVehicleTypes } = useMutationVehicleTypes();
  const { data: manufactureDetails } = useQueryManufactureDetails(
    { makeName: String(brand.label) },
    {
      enabled: !!brand.value,
    },
  );

  // Memoized brand options for dropdown
  const brandOptions = useMemo(() => {
    const currentVal = brandList?.find(
      (option) => Number(option.Make_ID) === brand.value,
    ) as ModelOptions;

    return {
      label: currentVal?.Make_Name ?? "",
      value: currentVal?.Make_ID ?? "",
    };
  }, [brand, brandList]);

  // Fetch brand options on component mount
  useEffect(() => {
    setIsLoading(true);
    mutateBrandOptions(1, {
      onSuccess: (res) => {
        setBrandList(res.Results);
      },
      onSettled: () => {
        setIsLoading(false);
      },
    });
  }, []);

  // Fetch manufactures, models, and vehicle types when brand changes
  useEffect(() => {
    if (brand.value) {
      mutateModelOptions(
        { makeId: Number(brand.value), page: 1 },
        {
          onSuccess: (res) => {
            setModels(res.Results);
          },
        },
      );

      mutateVehicleTypes(
        { makeId: Number(brand.value), page: 1 },
        {
          onSuccess: (res) => {
            setVehicleTypes(res.Results);
          },
        },
      );
    }
  }, [brand]);

  return (
    <MainLayout>
      <div className="flex gap-5 flex-col pb-8">
        <div className="flex gap-5 flex-col">
          <div className="w-full">
            <p className="   text-black font-medium">Search by Brand:</p>
            <Dropdown
              name="brand"
              classNameButton="text-black min-w-40"
              classNameOptions="text-gray-700"
              isLoading={isLoading}
              value={brandOptions}
              onChange={(e) => {
                setBrand(e as Option);
              }}
              options={
                brandList?.map(
                  (option) =>
                    ({
                      label: option.Make_Name,
                      value: option.Make_ID,
                    }) as Option,
                ) ?? []
              }
            />
          </div>
          <div className="flex w-full gap-5">
            <KpiCard
              icon={<Truck className="text-indigo-300" />}
              trend="↑ 12% from last month"
              title="Total Brand"
              onClick={() => {
                navigate("/brand-list");
              }}
              value={brandList.length}
            />
            <KpiCard
              icon={<Factory className="text-indigo-300" />}
              trend="↑ 12% from last month"
              title="Total Manufacture"
              onClick={() => {
                navigate("/manufacture-list");
              }}
              value={String(manufactureDetails?.Count || 0)}
            />
          </div>
        </div>
        <div className="flex w-full gap-5">
          <KpiCard
            icon={<Car className="text-indigo-300" />}
            trend="↑ 12% from last month"
            title="Total Vehicle Type"
            onClick={() => {
              navigate("/vehicle-type-list");
            }}
            value={vehicleTypes.length}
          />
          <KpiCard
            icon={<CarFrontIcon className="text-indigo-300" />}
            trend="↑ 12% from last month"
            title="Total Model"
            onClick={() => {
              navigate("/model-list");
            }}
            value={models.length}
          />
        </div>
        <ComparisonChartByModels />

        <DynamicCountryDoughnutChart results={manufactureDetails?.Results} />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
