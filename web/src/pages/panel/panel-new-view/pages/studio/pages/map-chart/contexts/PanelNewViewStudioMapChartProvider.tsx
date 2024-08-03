import React from 'react';

export type EMapChartData = { name: unknown; value: unknown };

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
