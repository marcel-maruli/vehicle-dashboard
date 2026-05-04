import BarChart from "@/components/Charts/BarChart";
import { useBrand } from "@/context/BrandProvider";
import { useQueriesModelsForMakeYear } from "@/lib/options/queries";
import { useEffect, useMemo, useState } from "react";

type VehicleType = "motorcycle" | "passenger_car" | "mpv" | "truck";

const ComparisonChartByModels = () => {
  const defaultYear = ["2023", "2024", "2025"];
  const types: VehicleType[] = ["passenger_car", "mpv", "motorcycle", "truck"];

  const { brand } = useBrand();

  const queryPayloads = useMemo(() => {
    if (!brand?.value) return [];

    return defaultYear.flatMap((year) =>
      types.map((type) => ({
        makeId: brand.value as number,
        year: parseInt(year),
        vehicletype: type,
      })),
    );
  }, [brand]);

  const results = useQueriesModelsForMakeYear(queryPayloads, {
    enabled: !!brand?.value,
    staleTime: Infinity,
  });

  const chartDataFormatted = useMemo(() => {
    const chartData: Record<VehicleType, number[]> = {
      motorcycle: [],
      passenger_car: [],
      mpv: [],
      truck: [],
    };

    if (results.length === 0 || results.some((r) => !r.isSuccess)) {
      return chartData;
    }

    let index = 0;
    defaultYear.forEach(() => {
      types.forEach((type) => {
        const count = results[index]?.data?.Count || 0;
        chartData[type].push(count);
        index++;
      });
    });

    return chartData;
  }, [results, queryPayloads]);

  // Data: Each Model is its own dataset
  const data = useMemo(
    () => ({
      labels: defaultYear,
      datasets: [
        {
          label: "Motorcycle",
          data: chartDataFormatted.motorcycle,
          backgroundColor: "rgba(54, 162, 235, 0.7)", // Blue
        },
        {
          label: "Passenger Car",
          data: chartDataFormatted.passenger_car,
          backgroundColor: "rgba(255, 99, 132, 0.7)", // Red
        },
        {
          label: "MPV",
          data: chartDataFormatted.mpv,
          backgroundColor: "rgba(153, 102, 255, 0.7)", // Purple
        },
      ],
    }),
    [chartDataFormatted],
  );

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: "Performance Comparison by Type and Model",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Value (Units)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Vehicle Type",
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-5 w-full">
      <BarChart data={data} options={options} labels={defaultYear} />
    </div>
  );
};

export default ComparisonChartByModels;
