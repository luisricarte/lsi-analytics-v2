import React from 'react';

export type EKPIChartData = {
  xAxis: {
    data: (string | number)[];
  };

  formattedGoal: string;
  series: {
    data: (string | number)[];
    type: string;
    areaStyle: {
      color: string;
    };
    color: string;
  }[];
  lastResult: number;
};

type PanelNewViewStudioKPIChartContextType = {
  echartData: EKPIChartData;
  setEchartData: React.Dispatch<React.SetStateAction<EKPIChartData>>;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  formattedGoal: string;
  setFormattedGoal: React.Dispatch<React.SetStateAction<string>>;
  lastResult: number;
  setLastResult: React.Dispatch<React.SetStateAction<number>>;
};

export const PanelNewViewStudioKPIChartContext = React.createContext(
  {} as PanelNewViewStudioKPIChartContextType,
);

interface PanelNewViewStudioKPIChartProviderProps {
  children: React.ReactNode;
}

const ECHART_INITIAL_VALUE = {
  xAxis: { data: [] },
  series: [
    {
      areaStyle: {
        color: '#00ff00',
      },
      data: [],
      type: 'line',
      color: '#00ff00',
    },
  ],
  isMoney: false,
  color: '',
  lastResult: 0,
  formattedGoal: '',
};

export const PanelNewViewStudioKPIChartProvider: React.FC<
  PanelNewViewStudioKPIChartProviderProps
> = ({ children }) => {
  const [echartData, setEchartData] =
    React.useState<EKPIChartData>(ECHART_INITIAL_VALUE);
  const [color, setColor] = React.useState<string>('');
  const [formattedGoal, setFormattedGoal] = React.useState<string>('');
  const [isMoney, setIsMoney] = React.useState<boolean>(false);
  const [lastResult, setLastResult] = React.useState<number>(0);
  const value = React.useMemo(
    () => ({
      echartData,
      setEchartData,
      color,
      setColor,
      formattedGoal,
      setFormattedGoal,
      isMoney,
      setIsMoney,
      lastResult,
      setLastResult,
    }),
    [echartData, color, formattedGoal, isMoney, lastResult],
  );

  return (
    <PanelNewViewStudioKPIChartContext.Provider value={value}>
      {children}
    </PanelNewViewStudioKPIChartContext.Provider>
  );
};
