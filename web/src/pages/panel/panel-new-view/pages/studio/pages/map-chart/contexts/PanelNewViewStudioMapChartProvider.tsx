import React from 'react';

export type EMapChartData = {
  data: { name: string; value: string };
  mapType?: string;
  fileName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fileContent?: any;
};

type PanelNewViewStudioMapChartContextType = {
  echartData: EMapChartData[];
  setEchartData: React.Dispatch<React.SetStateAction<EMapChartData[]>>;
};

export const PanelNewViewStudioMapChartContext = React.createContext(
  {} as PanelNewViewStudioMapChartContextType,
);

interface PanelNewViewStudioMapChartProviderProps {
  children: React.ReactNode;
}

export const PanelNewViewStudioMapChartProvider: React.FC<
  PanelNewViewStudioMapChartProviderProps
> = ({ children }) => {
  const [echartData, setEchartData] = React.useState<EMapChartData[]>([]);

  const value = React.useMemo(
    () => ({
      echartData,
      setEchartData,
    }),
    [echartData],
  );

  return (
    <PanelNewViewStudioMapChartContext.Provider value={value}>
      {children}
    </PanelNewViewStudioMapChartContext.Provider>
  );
};
