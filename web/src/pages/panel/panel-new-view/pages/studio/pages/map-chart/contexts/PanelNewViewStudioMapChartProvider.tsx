import React from 'react';

export type EMapChartData = {
  data: { name: string; value: string };
  mapType?: string;
  fileName?: string;
  hoverDescription?: string;
  colors?: string[];
  maxValue?: number;
  label?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fileContent?: any;
};

type PanelNewViewStudioMapChartContextType = {
  echartData: EMapChartData[];
  setEchartData: React.Dispatch<React.SetStateAction<EMapChartData[]>>;
  colors: string[];
  setColors: React.Dispatch<React.SetStateAction<string[]>>;
  maxValue: number;
  setMaxValue: React.Dispatch<React.SetStateAction<number>>;
  hoverDescription: string;
  setHoverDescription: React.Dispatch<React.SetStateAction<string>>;
  label: string[];
  setLabel: React.Dispatch<React.SetStateAction<string[]>>;
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
  const [colors, setColors] = React.useState<string[]>([
    '#e0f3f8',
    '#abd9e9',
    '#4575b4',
    '#313695',
  ]);
  const [maxValue, setMaxValue] = React.useState<number>(1);
  const [hoverDescription, setHoverDescription] =
    React.useState<string>('Campo');
  const [label, setLabel] = React.useState<string[]>(['Alto', 'Baixo']);

  const value = React.useMemo(
    () => ({
      echartData,
      setEchartData,
      colors,
      setColors,
      maxValue,
      setMaxValue,
      hoverDescription,
      setHoverDescription,
      label,
      setLabel,
    }),
    [echartData, colors, maxValue, hoverDescription, label],
  );

  return (
    <PanelNewViewStudioMapChartContext.Provider value={value}>
      {children}
    </PanelNewViewStudioMapChartContext.Provider>
  );
};
