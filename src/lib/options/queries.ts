import { useMutation, useQueries,  useQuery,  type UseQueryOptions } from "@tanstack/react-query";
import { getBrandOptions, getManufactureDetails, getManufacturesKPI, getModelOptions, getModelsForMakeYear, getVehicleTypes } from "./apis";
import {   type ManufactureDetailResponse, type ManufactureDetailResult, type ModelPayload, type OptionsResponse, type VehicleTypesResponse } from "./models";

export const useMutationBrandOptions = () =>
  useMutation<OptionsResponse, Error, number>({
    mutationKey: ["brand-option"],
    mutationFn: () => getBrandOptions(),
  });


export const useMutationManufacturesKPI = () =>
  useMutation<OptionsResponse, Error, string>({
    mutationKey: ["manufacture-kpi"],
    mutationFn: (brand) => getManufacturesKPI(brand),
  });

  export const useMutationModel = () =>
  useMutation<OptionsResponse, Error, { makeId: number; page?: number }>({
    mutationKey: ["models"],
    mutationFn: ({ makeId, page }) => getModelOptions(makeId, page),
  });

  export const useMutationVehicleTypes = () =>
  useMutation<VehicleTypesResponse, Error, { makeId: number; page?: number }>({
    mutationKey: ["vehicle-types"],
    mutationFn: ({ makeId, page }) => getVehicleTypes(makeId, page),
  });

export const useQueriesModelsForMakeYear = (
  payloads: ModelPayload[], 
  options?: Omit<UseQueryOptions, "queryKey" | "queryFn">
) => {
  return useQueries({
    queries: payloads.map((payload) => ({
      queryKey: ["models-for-make-year", payload],
      queryFn: () => getModelsForMakeYear(payload),
      ...options,
    })),
  });
};

export const useQueryManufactureDetails = (
  payload: { makeName: string },
  options?: Omit<
    UseQueryOptions<unknown, Error, ManufactureDetailResponse>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: ["manufacture-details", payload],
    queryFn: () => getManufactureDetails(payload),
    ...options,
  });
};