/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListFilter } from 'lucide-react';
import React from 'react';

import { useDeleteViewMutation } from '@/pages/panel/hooks/mutations/useDeleteViewMutation';
import { EAreaChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/area-chart/contexts/PanelNewViewStudioAreaChartProvider';
import { EBarChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/bar-chart/contexts/PanelNewViewStudioBarChartProvider';
import { EDonutChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/donut-chart/contexts/PanelNewViewStudioDonutChartProvider';
import { EHorizontalBarChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/horizontal-bar-chart/contexts/PanelNewViewStudioHorizontalBarChartProvider';
import { EKPIChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/kpi-chart/contexts/PanelNewViewStudioKPIChartProvider';
import { ELineChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/line-chart/contexts/PanelNewViewStudioLineChartProvider';
import { EMapChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/map-chart/contexts/PanelNewViewStudioMapChartProvider';
import { NumberViewPresentation } from '@/pages/panel/panel-new-view/pages/studio/pages/number-view/contexts/PanelNewViewStudioNumberViewProvider';
import { EPieChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/pie-chart/contexts/PanelNewViewStudioPieChartProvider';
import { SelectFilterPresentation } from '@/pages/panel/panel-new-view/pages/studio/pages/select-filter/hooks/useSelectFilterStore';
import { EWaterfallChartData } from '@/pages/panel/panel-new-view/pages/studio/pages/waterfall-chart/contexts/PanelNewViewStudioWaterfallChartProvider';
import { PANEL } from '@/services/models/panel/constants';
import { ViewType } from '@/services/models/panel/types';

import { DeleteModal } from '../delete-modal';
import { AreaChartView } from './AreaChartView';
import { BarChartView } from './BarChartView';
import { DonutChartView } from './DonutChartView';
import { HorizontalBarChartView } from './HorizontalBarChartView';
import { KPIChartView } from './KPIChartView';
import { LineChartView } from './LineChartView';
import { MapChartView } from './MapChartView';
import { NumberView } from './NumberView';
import { PieChartView } from './PieChartView';
import { SelectFilterView } from './SelectFilterView';
import { WaterfallChartView } from './WaterfallChartView';

interface ViewProps {
  id: string;
  data:
    | EAreaChartData
    | EPieChartData[]
    | EBarChartData
    | EHorizontalBarChartData
    | ELineChartData
    | EKPIChartData
    | EMapChartData[]
    | EDonutChartData[]
    | EWaterfallChartData
    | NumberViewPresentation
    | SelectFilterPresentation;
  type: ViewType;
  name: string;
  onChange?: (value: any) => void;
  onDelete?: (id: string) => void;
  filters?: { labelColumn: string; value: string | number }[];
}

export const View: React.FC<ViewProps> = ({
  id,
  data,
  type,
  name,
  onChange,
  onDelete = () => {},
  filters = [],
}) => {
  const reloadInterface = () => {
    window.location.reload();
  };

  const { mutate } = useDeleteViewMutation({
    onSuccess: () => {
      onDelete(id);
      reloadInterface();
    },
  });
  let ViewComponent = null;

  switch (type) {
    case PANEL.VIEW.PIECHART: {
      const _data = data as EPieChartData[];
      ViewComponent = <PieChartView data={_data} />;
      break;
    }

    case PANEL.VIEW.BARCHART: {
      const _data = data as EBarChartData;
      ViewComponent = <BarChartView data={_data} />;
      break;
    }

    case PANEL.VIEW.LINECHART: {
      const _data = data as ELineChartData;
      ViewComponent = <LineChartView data={_data} />;
      break;
    }
    case PANEL.VIEW.AREACHART: {
      const _data = data as EAreaChartData;
      ViewComponent = <AreaChartView data={_data} />;
      break;
    }
    case PANEL.VIEW.DONUTCHART: {
      const _data = data as EDonutChartData[];
      ViewComponent = <DonutChartView data={_data} />;
      break;
    }
    case PANEL.VIEW.KPICHART: {
      const _data = data as EKPIChartData;
      ViewComponent = <KPIChartView data={_data} />;
      break;
    }
    case PANEL.VIEW.HORIZONTALBARCHART: {
      const _data = data as EHorizontalBarChartData;
      ViewComponent = <HorizontalBarChartView data={_data} />;
      break;
    }
    case PANEL.VIEW.WATERFALLCHART: {
      const _data = data as EWaterfallChartData;
      ViewComponent = <WaterfallChartView data={_data} />;
      break;
    }
    case PANEL.VIEW.MAPCHART: {
      const _data = data as EMapChartData[];
      ViewComponent = <MapChartView data={_data} id={name} />;
      break;
    }
    case PANEL.VIEW.NUMBERVIEW: {
      const _data = data as NumberViewPresentation;
      ViewComponent = <NumberView data={_data} />;
      break;
    }

    case PANEL.VIEW.SELECTFILTER: {
      const _data = data as SelectFilterPresentation;
      ViewComponent = <SelectFilterView data={_data} onChange={onChange} />;
      break;
    }

    default:
      return null;
  }

  return (
    <div className="flex h-full w-full flex-col rounded-md border shadow-sm">
      <div className="flex w-full justify-between border-b p-2">
        <strong className="ml-4 font-semibold">{name}</strong>
        <DeleteModal onDelete={() => mutate({ path: { id } })} />
        {filters.length > 0 && (
          <div className="flex items-center justify-center rounded-full bg-zinc-600 px-2 dark:bg-zinc-950">
            <ListFilter className="text-purple-100" size={12} />
            <span className="text-zinc-50">{filters.length}</span>
          </div>
        )}
      </div>
      {ViewComponent}
    </div>
  );
};
