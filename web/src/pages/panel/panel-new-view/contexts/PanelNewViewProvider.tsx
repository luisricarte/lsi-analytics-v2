import React from 'react';
import { useNavigate } from 'react-router-dom';

import { APP_ROUTES } from '@/constants/app-routes';
import { SQLResult } from '@/services/models/datafont/types';
import { ViewProps } from '@/services/models/panel/types';

type PanelNewViewContextType = {
  viewCreation: ViewProps;
  setViewCreation: React.Dispatch<React.SetStateAction<ViewProps>>;
  canAccessStep: (step: number, datafontId: string) => boolean;
  queryData: SQLResult | null;
  setQueryData: React.Dispatch<React.SetStateAction<SQLResult | null>>;
  csvContent: object | null;
  setCsvContent: React.Dispatch<React.SetStateAction<object | null>>;
};

export const PanelNewViewContext = React.createContext(
  {} as PanelNewViewContextType,
);

interface PanelNewViewContextProps {
  children?: React.ReactNode;
}
export const PanelNewViewProvider: React.FC<PanelNewViewContextProps> = ({
  children,
}) => {
  const [viewCreation, setViewCreation] = React.useState<ViewProps>(
    {} as ViewProps,
  );
  const [queryData, setQueryData] = React.useState<SQLResult | null>(null);
  const [csvContent, setCsvContent] = React.useState<object | null>(null);

  console.log('viewCreation: ', viewCreation);

  const navigate = useNavigate();

  const canAccessStep = React.useCallback(
    (step: number, datafontId: string) => {
      switch (step) {
        case 1:
          return true;
        case 2:
          if (
            viewCreation.name &&
            viewCreation.contentUpdate &&
            viewCreation.type
          ) {
            return true;
          }
          navigate(APP_ROUTES.panel.new.index.replace(':id', datafontId));
          return false;
        case 3:
          if (viewCreation.datafontId) {
            return true;
          }
          navigate(APP_ROUTES.panel.new.index.replace(':id', datafontId));
          return false;
        case 4:
          if ((viewCreation.sql && queryData) || viewCreation.csvContent) {
            return true;
          }
          navigate(APP_ROUTES.panel.new.index.replace(':id', datafontId));
          return false;
        default:
          navigate(APP_ROUTES.panel.new.index.replace(':id', datafontId));
          return false;
      }
    },
    [
      navigate,
      queryData,
      viewCreation.contentUpdate,
      viewCreation.datafontId,
      viewCreation.name,
      viewCreation.sql,
      viewCreation.type,
      viewCreation.csvContent,
    ],
  );

  const value = React.useMemo(
    () => ({
      viewCreation,
      queryData,
      csvContent,
      setViewCreation,
      canAccessStep,
      setQueryData,
      setCsvContent,
    }),
    [viewCreation, canAccessStep, queryData, csvContent],
  );
  return (
    <PanelNewViewContext.Provider value={value}>
      {children}
    </PanelNewViewContext.Provider>
  );
};
