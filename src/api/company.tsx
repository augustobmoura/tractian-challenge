import { createContext, useContext } from "react";

type CompanyId = string;

interface CompanyContextValue {
  companyId?: CompanyId;
}

const CompanyContext = createContext<CompanyContextValue>({});

export interface CompanyProviderProps {
  children: React.ReactNode;
  companyId?: CompanyId;
}

export const CompanyProvider = (props: CompanyProviderProps) => {
  return (
    <CompanyContext.Provider value={{ companyId: props.companyId }}>
      {props.children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => {
  const { companyId } = useContext(CompanyContext);

  return companyId;
};
