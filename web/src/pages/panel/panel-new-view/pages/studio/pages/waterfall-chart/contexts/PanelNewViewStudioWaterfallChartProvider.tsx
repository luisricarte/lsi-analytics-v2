import React from 'react';

export type EWaterfallChartData = {
  xAxis: {
    data: (string | number)[];
  };
  yAxis: {
    type: (string | null);
  }
  series: { data: (string | number)[]; type: 'bar' ; stack: 'all'; }[];
};

type PanelNewViewStudioWaterfallChartContextType = {
  echartData: EWaterfallChartData;
  setEchartData: React.Dispatch<React.SetStateAction<EWaterfallChartData>>;
};

export const PanelNewViewStudioWaterfallChartContext = React.createContext(
  {} as PanelNewViewStudioWaterfallChartContextType,
);

interface PanelNewViewStudioWaterfallChartProviderProps {
  children: React.ReactNode;
}

const ECHART_INITIAL_VALUE = { xAxis: { data: [] }, yAxis: { type: 'value'}, series: [] };

export const PanelNewViewStudioWaterfallChartProvider: React.FC<
  PanelNewViewStudioWaterfallChartProviderProps
> = ({ children }) => {
  const [echartData, setEchartData] =
    React.useState<EWaterfallChartData>(ECHART_INITIAL_VALUE);

  const value = React.useMemo(
    () => ({
      echartData,
      setEchartData,
    }),
    [echartData],
  );

  return (
    <PanelNewViewStudioWaterfallChartContext.Provider value={value}>
      {children}
    </PanelNewViewStudioWaterfallChartContext.Provider>
  );
};
