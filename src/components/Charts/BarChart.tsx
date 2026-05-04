import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

type BarChartProps = {
  labels: string[];
  data: ChartData<"bar">;
  options?: ChartOptions<"bar">;
};

const BarChart = ({ labels, data, options }: BarChartProps) => {
  return (
    <div style={{ padding: "20px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
