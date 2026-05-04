import { cn } from "@/utils/classnames";
import { useDebounce } from "@/utils/useDebounced";
import { useState, useRef, useEffect, useMemo } from "react";

export type Option = {
  label: string;
  value: string | number;
};

type DropdownProps = {
  options: Option[];
  placeholder?: string;
  value?: Option | null;
  defaultValue?: Option | null;
  onChange?: (option: Option | null) => void;
  prefix?: React.ReactNode;
  isLoading?: boolean;
  renderButton?: React.ReactNode;
  name?: string;
  classNameButton?: string;
  classNameOptions?: string;
  searchable?: boolean; // Tambahkan prop baru
};

export default function Dropdown({
  options,
  placeholder = "Select option",
  value,
  defaultValue = null,
  onChange,
  prefix,
  isLoading = false,
  renderButton,
  classNameButton,
  classNameOptions,
  searchable = true,
  ...props
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State untuk teks pencarian
  const [selected, setSelected] = useState<Option | null>(
    value ?? defaultValue,
  );

  const ref = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && searchable) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchTerm("");
    }
  }, [open, searchable]);

  useEffect(() => {
    if (value !== undefined) {
      setSelected(value);
    }
  }, [value]);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredOptions = useMemo(() => {
    if (!debouncedSearchTerm) return options;
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
    );
  }, [options, debouncedSearchTerm]);

  const handleSelect = (option: Option) => {
    setSelected(option);
    setOpen(false);
    onChange?.(option);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block w-full">
      {renderButton ? (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setOpen((prev) => !prev);
          }}
        >
          {renderButton}
        </button>
      ) : (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setOpen((prev) => !prev);
          }}
          className={cn(
            "px-3 py-2 border rounded-lg bg-white flex justify-between items-center w-full",
            classNameButton ? classNameButton : "min-w-40",
          )}
        >
          <div className="flex items-center gap-2">
            {prefix && <span className="text-gray-500">{prefix}</span>}
            <span className="text-sm">
              {isLoading ? "Loading..." : selected?.label || placeholder}
            </span>
          </div>
          <span className="text-sm">▾</span>
        </button>
      )}

      {open && (
        <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-md z-50 overflow-hidden">
          {searchable && (
            <div className="p-2 border-b sticky top-0 bg-white">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                className="w-full px-2 py-1.5 text-sm border rounded outline-none focus:ring-1 focus:ring-blue-500 text-black"
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          <div className="max-h-60 overflow-auto">
            {isLoading && (
              <div className="px-4 py-3 text-sm text-gray-500">
                Loading options...
              </div>
            )}

            {!isLoading && filteredOptions.length === 0 && (
              <div className="px-4 py-3 text-sm text-gray-500">
                No data matched "{searchTerm}"
              </div>
            )}

            {!isLoading &&
              filteredOptions.map((option, index) => {
                const isSelected = selected?.value === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSelect(option);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors",
                      classNameOptions ? classNameOptions : "text-gray-700",
                      isSelected ? "bg-blue-50 text-blue-600 font-medium" : "",
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
