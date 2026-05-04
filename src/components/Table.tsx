import { cn } from "@/utils/classnames";

export type Column<T> = {
  header: string;
  accessor?: keyof T | ((row: T) => any);
  className?: string;
  render?: (value: any, row: T, index: number) => React.ReactNode;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  containerHeight?: string;
};

export function Table<T extends Record<string, any>>({
  columns,
  data,
  isLoading = false,
  containerHeight,
}: TableProps<T>) {
  return (
    <div
      className={cn(
        "w-full border rounded-lg bg-white overflow-y-auto border-gray-300",
        containerHeight ? containerHeight : "max-h-100",
      )}
    >
      <table className="w-full text-sm text-left border-collapse ">
        <thead className="bg-gray-100 sticky top-0 z-3">
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                className={`px-4 py-3 font-semibold text-black ${col.className}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {isLoading && (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-gray-500"
              >
                Loading...
              </td>
            </tr>
          )}

          {!isLoading && data?.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}

          {!isLoading &&
            data?.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-t hover:bg-gray-50 border-t-gray-300"
              >
                {columns.map((col, colIndex) => {
                  const value =
                    typeof col.accessor === "function"
                      ? col.accessor(row)
                      : col.accessor
                        ? row[col.accessor]
                        : undefined;

                  return (
                    <td key={colIndex} className="px-4 py-3">
                      {col.render ? col.render(value, row, rowIndex) : value}
                    </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
