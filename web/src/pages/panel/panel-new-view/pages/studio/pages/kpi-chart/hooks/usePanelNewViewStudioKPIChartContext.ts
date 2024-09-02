import React from 'react';

import { PanelNewViewStudioKPIChartContext } from '../contexts/PanelNewViewStudioKPIChartProvider';

export const usePanelNewViewStudioKPIChartContext = () => {
  const value = React.useContext(PanelNewViewStudioKPIChartContext);

  if (!value) {
    throw new Error(
      'PanelNewViewStudioKPIChartContext só pode usado dentro do componente PanelNewViewProvider',
    );
  }

  return value;
};
