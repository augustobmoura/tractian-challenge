import ky, { KyInstance } from "ky";
import { createContext, useContext, useMemo } from "react";

interface KyContextValue {
  ky: KyInstance;
}

const defaultInstance = ky.create({
  prefixUrl: "http://fake-api.tractian.com/",
});

const KyContext = createContext<KyContextValue>({ ky: defaultInstance });

export const KyInstanceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const value = useMemo(() => ({ ky: defaultInstance }), []);

  return <KyContext.Provider value={value}>{children}</KyContext.Provider>;
};

export const useKyInstance = () => {
  const { ky } = useContext(KyContext)

  return ky;
};
