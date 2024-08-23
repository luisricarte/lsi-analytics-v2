import React from 'react';

export type EMapChartData = {
  data: { name: string; value: string };
  mapType?: string;
  fileName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fileContent?: any;
  hoverDescription?: string;
  color?: string;
  maxValue?: number;
};

type PanelNewViewStudioMapChartContextType = {
  echartData: EMapChartData[];
  setEchartData: React.Dispatch<React.SetStateAction<EMapChartData[]>>;
  color: string[] | null;
  setColor: React.Dispatch<React.SetStateAction<string[] | null>>;
  maxValue: number | null;
  setMaxValue: React.Dispatch<React.SetStateAction<number | null>>;
  hoverDescription: string | null;
  setHoverDescription: React.Dispatch<React.SetStateAction<string | null>>;
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
  const [color, setColor] = React.useState<string[] | null>(null);
  const [maxValue, setMaxValue] = React.useState<number | null>(null);
  const [hoverDescription, setHoverDescription] = React.useState<string | null>(
    '',
  );

  const value = React.useMemo(
    () => ({
      echartData,
      setEchartData,
      color,
      setColor,
      maxValue,
      setMaxValue,
      hoverDescription,
      setHoverDescription,
    }),
    [echartData, color, maxValue, hoverDescription],
  );

  return (
    <PanelNewViewStudioMapChartContext.Provider value={value}>
      {children}
    </PanelNewViewStudioMapChartContext.Provider>
  );
};
