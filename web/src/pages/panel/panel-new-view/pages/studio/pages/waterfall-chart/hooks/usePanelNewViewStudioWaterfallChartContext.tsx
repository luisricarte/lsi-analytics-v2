import React from 'react';

import { PanelNewViewStudioWaterfallChartContext } from '../contexts/PanelNewViewStudioWaterfallChartProvider';

export const usePanelNewViewStudioWaterfallChartContext = () => {
  const value = React.useContext(PanelNewViewStudioWaterfallChartContext);

  if (!value) {
    throw new Error(
      'PanelNewViewStudioWaterfallChartContext só pode usado dentro do componente PanelNewViewProvider',
    );
  }

  return value;
};
