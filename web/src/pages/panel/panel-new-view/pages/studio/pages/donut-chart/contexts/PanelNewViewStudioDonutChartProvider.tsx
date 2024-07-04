import React from 'react';

export type EDonutChartData = { name: unknown; value: unknown };

type PanelNewViewStudioDonutChartContextType = {
  echartData: EDonutChartData[];
  setEchartData: React.Dispatch<React.SetStateAction<EDonutChartData[]>>;
};

export const PanelNewViewStudioDonutChartContext = React.createContext(
  {} as PanelNewViewStudioDonutChartContextType,
);

interface PanelNewViewStudioDonutChartProviderProps {
  children: React.ReactNode;
}

export const PanelNewViewStudioDonutChartProvider: React.FC<
  PanelNewViewStudioDonutChartProviderProps
> = ({ children }) => {
  const [echartData, setEchartData] = React.useState<EDonutChartData[]>([]);

  const value = React.useMemo(
    () => ({
      echartData,
      setEchartData,
    }),
    [echartData],
  );

  return (
    <PanelNewViewStudioDonutChartContext.Provider value={value}>
      {children}
    </PanelNewViewStudioDonutChartContext.Provider>
  );
};
