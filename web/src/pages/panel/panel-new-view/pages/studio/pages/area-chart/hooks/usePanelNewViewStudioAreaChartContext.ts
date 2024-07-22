import React from 'react';

import { PanelNewViewStudioAreaChartContext } from '../contexts/PanelNewViewStudioAreaChartProvider';

export const usePanelNewViewStudioAreaChartContext = () => {
  const value = React.useContext(PanelNewViewStudioAreaChartContext);

  if (!value) {
    throw new Error(
      'PanelNewViewStudioAreaChartContext só pode usado dentro do componente PanelNewViewProvider',
    );
  }

  return value;
};
