import { KyInstance } from "ky";
import { urlPath } from "./urlPath";
import { useKyInstance } from "./ky";
import { useCompany } from "./company";
import { useMemo } from "react";

export type Id = string;

export interface Company {
  id: Id;
  name: string;
}

export interface Location {
  id: Id;
  name: string;
  parentId: Id | null;
}

export interface Component {
  id: Id;
  name: string;
  sensorType: "energy" | "vibration";
  sensorId: string;
  status: "operating" | "alert";
  locationId: Id | null;
  parentId: Id | null;
}

export interface Asset {
  id: Id;
  name: string;
  sensorType?: null;
  parentId?: Id | null;
  locationId?: Id | null;
}

export const buildAssetsApi = (ky: KyInstance, defaultCompanyId: Id) => {
  const getCompanies = () => ky.get("companies").json<Company[]>();

  const getAssets = (companyId = defaultCompanyId) =>
    ky
      .get(urlPath`/companies/${companyId}/assets`)
      .json<(Asset | Component)[]>();

  const getLocations = (companyId = defaultCompanyId) =>
    ky.get(urlPath`/companies/${companyId}/locations`).json<Location[]>();

  return {
    getCompanies,
    getAssets,
    getLocations,
  };
};

export const useAssetsApi = () => {
  const ky = useKyInstance();
  const companyId = useCompany();

  if (companyId == null) {
    throw new Error("Company ID is not provided!");
  }

  const api = useMemo(() => buildAssetsApi(ky, companyId), [ky, companyId]);

  return api
}
