import type { ApiResponse } from "../apiResponse";

export type OptionsResponse = ApiResponse<Options[]>;
export type ManufacturesKPIResponse = ApiResponse<ManufacturesKPI[]>;
export type VehicleTypesResponse = ApiResponse<VehicleTypes[]>;
export type ModelsTypeResponse = ApiResponse<ModelsType[]>;
export type ManufactureDetailResponse = ApiResponse<ManufactureDetailResult[]>;

export interface ManufacturesKPI {
  Make_ID: number;
  Make_Name: string;
  Mfr_Name: string;
}

export interface Options {
  Make_ID?: number;
  Make_Name?: string;
  Model_ID?: number;
  Model_Name?: string;
  Mfr_Name?: string;
}

export type VehicleTypes = {
  VehicleTypeId: number;
  VehicleTypeName: string;
};

export type ModelsType = {
  Make_ID?: number;
  Make_Name?: string;
  Model_ID?: number;
  Model_Name?: string;
  VehicleTypeId?: number;
  VehicleTypeName?: string;
};

export type ModelPayload = {
  makeId: number;
  year: number;
  vehicletype: string;
};

export type ManufactureDetailPayload = {
  makeName: string;
};

export interface ManufactureDetailResult {
  Address: string;
  Address2?: string;
  City: string;
  ContactEmail?: string;
  ContactFax?: string;
  ContactPhone?: string;
  Country: string;
  DBAs?: string;
  EquipmentItems: any[];
  LastUpdated: string;
  ManufacturerTypes: ManufacturerType[];
  Mfr_CommonName?: string;
  Mfr_ID: number;
  Mfr_Name: string;
  OtherManufacturerDetails?: string;
  PostalCode: string;
  PrimaryProduct: any;
  PrincipalFirstName?: string;
  PrincipalLastName: any;
  PrincipalPosition?: string;
  StateProvince?: string;
  SubmittedName?: string;
  SubmittedOn?: string;
  SubmittedPosition?: string;
  VehicleTypes: VehicleType[];
}

export interface ManufacturerType {
  Name: string;
}

export interface VehicleType {
  GVWRFrom: string;
  GVWRTo: string;
  IsPrimary: boolean;
  Name: string;
}
