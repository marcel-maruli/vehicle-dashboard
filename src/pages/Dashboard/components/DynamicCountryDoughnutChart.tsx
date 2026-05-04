import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import type { ManufactureDetailResult } from "@/lib/options/models";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface DynamicDougnutChartProps {
  results?: ManufactureDetailResult[];
}

const DynamicCountryDougnutChart = ({ results }: DynamicDougnutChartProps) => {
  const { chartData, totalCount } = useMemo(() => {
    const counts =
      results?.reduce((acc: Record<string, number>, curr) => {
        const country = curr.Country || "Unknown";
        acc[country] = (acc[country] || 0) + 1;
        return acc;
      }, {}) || {};

    const sortedLabels = Object.keys(counts).sort(
      (a, b) => counts[b] - counts[a],
    );
    const sortedValues = sortedLabels.map((label) => counts[label]);
    const total = sortedValues.reduce((a, b) => a + b, 0);

    return {
      totalCount: total,
      chartData: {
        labels: sortedLabels,
        datasets: [
          {
            data: sortedValues,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
              "#C9CBCF",
              "#74D12C",
              "#2CB6D1",
              "#D12C2C",
            ],
            borderWidth: 2,
            hoverOffset: 15,
          },
        ],
      },
    };
  }, [results]);

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: { display: false },
      datalabels: {
        color: "#fff",
        formatter: (value: number) => {
          const percentage = ((value / totalCount) * 100).toFixed(0) + "%";
          return value > 0 ? percentage : "";
        },
        font: { weight: "bold", size: 11 },
      },
      tooltip: {
        enabled: true,
        position: "nearest", // Mencari titik terdekat dari kursor, bukan di tengah lubang
        yAlign: "top",
        xAlign: "right",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 10,
        bodySpacing: 4,
        callbacks: {
          label: (context) => ` ${context.label}: ${context.raw} Manufacturers`,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="relative w-72 h-74">
          <Doughnut data={chartData} options={options} />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold text-gray-800">
              {totalCount}
            </span>
            <span className="text-xs text-gray-500 uppercase tracking-wider pointer-events-none">
              Total Mfrs
            </span>
          </div>
        </div>

        <div className="flex-1 w-full">
          <h3 className="text-sm font-semibold text-gray-400 uppercase mb-4 tracking-widest">
            Distribution by Country
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {chartData.labels.map((label, i) => {
              const val = chartData.datasets[0].data[i];
              const pct = ((val / totalCount) * 100).toFixed(1);
              return (
                <div
                  key={label}
                  className="flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          chartData.datasets[0].backgroundColor[i],
                      }}
                    />
                    <span className="text-sm text-gray-600 font-medium truncate max-w-[120px]">
                      {label}
                    </span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span className="text-sm font-bold text-gray-700">
                      {val}
                    </span>
                    <span className="text-xs text-gray-400 w-12 text-right">
                      {pct}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicCountryDougnutChart;
