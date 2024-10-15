import ky, { KyInstance } from "ky";
import { createContext, useContext } from "react";

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
  return (
    <KyContext.Provider value={{ ky: defaultInstance }}>
      {children}
    </KyContext.Provider>
  );
};

export const useKyInstance = () => {
  const { ky } = useContext(KyContext);

  return ky;
};
