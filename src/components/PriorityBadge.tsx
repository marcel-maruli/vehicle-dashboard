export type Priority = "high" | "medium" | "low";

type BadgeProps = {
  variant: Priority;
  children?: React.ReactNode;
  className?: string;
};

export const PriorityBadge = ({ variant, children, className }: BadgeProps) => {
  const styles: Record<Priority, string> = {
    high: "bg-red-100 text-red-700 border-red-200",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    low: "bg-gray-100 text-gray-700 border-gray-200",
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded-md border ${styles[variant]} ${className}`}
    >
      {children ?? variant}
    </span>
  );
};
