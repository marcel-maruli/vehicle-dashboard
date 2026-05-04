import type { Option } from "@/components/Dropdown";
import React, {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

type BrandContextType = {
  brand: Option;
  setBrandValue: (value: Option) => void;
  setBrand: React.Dispatch<React.SetStateAction<Option>>;
};

const defaultBrand: Option = {
  label: "Honda",
  value: 474,
};

const defaultValue: BrandContextType = {
  brand: defaultBrand,
  setBrandValue: () => {},
  setBrand: () => {},
};

export const BrandContext = createContext<BrandContextType>(defaultValue);

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) throw new Error("useBrand must be used inside BrandProvider");
  return context;
};

const BrandProvider = ({ children }: PropsWithChildren) => {
  const [brand, setBrand] = useState<Option>(defaultBrand);

  const setBrandValue = (value: Option) => {
    setBrand(value);
  };

  return (
    <BrandContext.Provider value={{ brand, setBrandValue, setBrand }}>
      {children}
    </BrandContext.Provider>
  );
};

export default BrandProvider;
