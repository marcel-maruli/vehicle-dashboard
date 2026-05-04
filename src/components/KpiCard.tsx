import React from "react";
import { useNavigate } from "react-router-dom";

type KpiCardProps = {
  title: TitleVariant;
  value: number | string;
  icon: React.ReactNode;
  trend?: string;
  onClick?: () => void;
};

type TitleVariant =
  | "Total Brand"
  | "Total Vehicle Type"
  | "Total Model"
  | "Total Manufacture";

const KpiCard = ({ title, value, icon, trend, onClick }: KpiCardProps) => {
  const variantColors: Record<string, string> = {
    "Total Brand": "from-indigo-600 to-indigo-800",
    "Total Manufacture": "from-green-600 to-green-800",
    "Total Model": "from-purple-600 to-purple-800",
    "Total Vehicle Type": "from-blue-600 to-blue-800",
  };

  return (
    <div className="gap-5 w-full">
      <div
        className={`kpi-card bg-linear-to-br ${variantColors[title] || "from-gray-600 to-gray-800"} rounded-2xl p-6 cursor-pointer fade-in`}
        onClick={onClick}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-indigo-200 text-sm font-medium">{title}</span>
          {icon}
        </div>
        <p className="text-3xl font-bold">{value || 0}</p>
        <p className="text-indigo-300 text-xs mt-1">{trend}</p>
      </div>
    </div>
  );
};

export default KpiCard;
