import React from 'react';

export type EAreaChartData = {
  xAxis: {
    data: (string | number)[];
  };
  series: { data: (string | number)[]; type: 'line' }[];
};

type PanelNewViewStudioAreaChartContextType = {
  echartData: EAreaChartData;
  setEchartData: React.Dispatch<React.SetStateAction<EAreaChartData>>;
};

export const PanelNewViewStudioAreaChartContext = React.createContext(
  {} as PanelNewViewStudioAreaChartContextType,
);

interface PanelNewViewStudioAreaChartProviderProps {
  children: React.ReactNode;
}

const ECHART_INITIAL_VALUE = { xAxis: { data: [] }, series: [] };

export const PanelNewViewStudioAreaChartProvider: React.FC<
  PanelNewViewStudioAreaChartProviderProps
> = ({ children }) => {
  const [echartData, setEchartData] =
    React.useState<EAreaChartData>(ECHART_INITIAL_VALUE);

  const value = React.useMemo(
    () => ({
      echartData,
      setEchartData,
    }),
    [echartData],
  );

  return (
    <PanelNewViewStudioAreaChartContext.Provider value={value}>
      {children}
    </PanelNewViewStudioAreaChartContext.Provider>
  );
};
