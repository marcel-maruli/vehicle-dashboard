export type Status = "new" | "attending" | "completed";

type StatusProps = {
  variant: Status;
  children?: React.ReactNode;
};

export const StatusBadge = ({ variant, children }: StatusProps) => {
  const styles: Record<Status, string> = {
    new: "text-blue-600",
    attending: "text-yellow-600",
    completed: "text-green-600",
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded-md justify-center flex ${styles[variant]}`}
    >
      {children ?? variant}
    </span>
  );
};
