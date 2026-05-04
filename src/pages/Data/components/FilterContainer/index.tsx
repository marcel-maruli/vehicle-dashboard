import Dropdown, { type Option } from "@/components/Dropdown";
import { Filter } from "lucide-react";

import type { FilterTicketPayload } from "@/lib/tickets/models";
import { useMemo, type Dispatch, type SetStateAction } from "react";
import { getUserInfo } from "@/utils/getUserInfo";

type FilterContainerProps = {
  setFilter: Dispatch<SetStateAction<FilterTicketPayload>>;
  filter: FilterTicketPayload;
  handleTicketCreate: () => void;
};

const escalations = [
  {
    label: "Escalated to L2",
    value: 1,
  },
  {
    label: "Escalated to L3",
    value: 2,
  },
];

const FilterContainer = ({
  setFilter,
  filter,
  handleTicketCreate,
}: FilterContainerProps) => {
  const user = getUserInfo();

  return (
    <div className="min-h-full min-w-full text-black shadow-sm bg-white rounded-lg p-4 mb-6 flex items-center justify-between">
      <div className="flex items-center gap-2 font-medium text-sm">
        <Filter width={16} height={16} className="text-gray-500" />
        <div className="flex gap-5">
          <div className="flex items-center gap-1">
            <p className="w-full">Filter by Status:</p>
            <Dropdown
              name="status"
              value={statusOption}
              onChange={(e) => {
                setFilter((prev) => ({ ...prev, status: Number(e?.value) }));
              }}
              options={
                statusOptions?.map(
                  (option) =>
                    ({
                      label: option.name,
                      value: option.id,
                    }) as Option,
                ) ?? []
              }
            />
          </div>
          <div className="flex items-center gap-1">
            <p className="w-full">Filter by Priority:</p>
            <Dropdown
              name="priority"
              value={priorityOption}
              onChange={(e) => {
                setFilter((prev) => ({ ...prev, priority: Number(e?.value) }));
              }}
              options={(filteredPriorityOptions as Option[]) ?? []}
            />
          </div>
          {user.role.id !== 3 && (
            <div className="flex items-center gap-1">
              <p className="w-full">Filter by Escalation:</p>
              <Dropdown
                name="escalation"
                value={{
                  label: filter.escalation_L1
                    ? escalations[0].label
                    : filter.escalation_L2
                      ? escalations[1].label
                      : "",
                  value: filter.escalation_L1
                    ? 1
                    : filter.escalation_L2
                      ? 2
                      : "  ",
                }}
                onChange={(e) => {
                  if (e?.value === 1) {
                    setFilter((prev) => ({ ...prev, escalation_L1: true }));
                  } else if (e?.value === 2) {
                    setFilter((prev) => ({ ...prev, escalation_L2: true }));
                  }
                }}
                options={
                  escalations?.map(
                    (option) =>
                      ({
                        label: option.label,
                        value: option.value,
                      }) as Option,
                  ) ?? []
                }
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        {Object.values(filter || {}).length > 0 && (
          <button
            className="text-blue-600 text-xs font-bold cursor-pointer"
            onClick={() => setFilter({})}
          >
            Clear Filter
          </button>
        )}

        {user.role?.id === 1 && (
          <button
            className="text-xs font-bold border rounded-xl px-2 py-2 bg-gray-700 text-white hover:border-gray-300 hover:bg-gray-300 hover:text-gray-900"
            onClick={handleTicketCreate}
          >
            Add Ticket +
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterContainer;
