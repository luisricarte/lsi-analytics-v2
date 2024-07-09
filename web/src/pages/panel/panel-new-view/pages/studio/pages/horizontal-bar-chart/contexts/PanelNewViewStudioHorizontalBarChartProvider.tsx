import React from 'react';

export type EHorizontalBarChartData = {
    xAxis: {
      data: (string | number)[];
    };
    series: { data: (string | number)[]; type: 'bar' }[];
  };

type PanelNewViewStudioHorizontalBarChartContextType = {
  echartData: EHorizontalBarChartData[];
  setEchartData: React.Dispatch<React.SetStateAction<EHorizontalBarChartData[]>>;
};

export const PanelNewViewStudioHorizontalBarChartContext = React.createContext(
  {} as PanelNewViewStudioHorizontalBarChartContextType,
);

interface PanelNewViewStudioHorizontalBarChartProviderProps {
  children: React.ReactNode;
}

export const PanelNewViewStudioHorizontalBarChartProvider: React.FC<
  PanelNewViewStudioHorizontalBarChartProviderProps
> = ({ children }) => {
  const [echartData, setEchartData] = React.useState<EHorizontalBarChartData[]>([]);

  const value = React.useMemo(
    () => ({
      echartData,
      setEchartData,
    }),
    [echartData],
  );

  return (
    <PanelNewViewStudioHorizontalBarChartContext.Provider value={value}>
      {children}
    </PanelNewViewStudioHorizontalBarChartContext.Provider>
  );
};
