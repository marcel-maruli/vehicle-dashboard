import api from "../axios";
import type { ManufactureDetailPayload, ManufactureDetailResponse, ManufactureDetailResult, ModelPayload, ModelsTypeResponse, OptionsResponse, VehicleTypesResponse } from "./models";

export const getBrandOptions = async (): Promise<OptionsResponse> => {
  const res = await api.get<OptionsResponse>(
    `/vehicles/GetAllMakes?format=json`,
  );

  return res?.data;
};

export const getModelOptions = async (
  makeId: number,
  page?: number,
): Promise<OptionsResponse> => {
  const res = await api.get<OptionsResponse>(
    `/vehicles/GetModelsForMakeId/${makeId}?format=json&page=${page}`,
  );

  return res?.data;
};

export const getManufacturesKPI = async (
  brand: string,
): Promise<OptionsResponse> => {
  const makeName = brand.toLowerCase();
  const res = await api.get<OptionsResponse>(
    `/vehicles/GetMakeForManufacturer/${makeName}?format=json`,
  );

  return res?.data;
};

export const getVehicleTypes = async (
  makeId: number,
  page?: number,
): Promise<VehicleTypesResponse> => {
  const res = await api.get<VehicleTypesResponse>(
    `/vehicles/GetVehicleTypesForMakeId/${makeId}?format=json&page=${page}`,
  );

  return res?.data;
};

export const getModelsForMakeYear = async (
  {makeId, year, vehicletype}: ModelPayload
): Promise<ModelsTypeResponse> => {
  const res = await api.get<ModelsTypeResponse>(
    `/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}/vehicletype/${vehicletype}?format=json`,
  );
  return res?.data;
}

export const getManufactureDetails = async (
  { makeName }: ManufactureDetailPayload
): Promise<ManufactureDetailResponse> => {
  const res = await api.get<ManufactureDetailResponse>(
    `/vehicles/GetManufacturerDetails/${makeName}?format=json`,
  );
  return res?.data;
}