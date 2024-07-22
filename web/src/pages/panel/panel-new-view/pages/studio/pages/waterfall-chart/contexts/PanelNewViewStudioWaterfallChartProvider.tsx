import React from 'react';

type SeriesItems = {
  data: (string | number)[];
  type: string;
  stack: string;
};

export type EWaterfallChartData = {
  xAxis: {
    data: (string | number)[];
  };
  yAxis: {
    type: string | null;
  };
  series: SeriesItems[];
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

const ECHART_INITIAL_VALUE = {
  yAxis: { type: 'value' },
  xAxis: { type: 'category', data: [] },
  series: [{ data: [], stack: 'Total', type: 'bars' }],
};

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
