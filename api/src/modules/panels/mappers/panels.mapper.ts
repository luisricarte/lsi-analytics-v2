import {
  BarChart as PrismaBarChart,
  LineChart as PrismaLineChart,
  NumberView as PrismaNumberView,
  Panel as PrismaPanel,
  MapChart as PrismaMapChart,
  PieChart as PrismaPieChart,
  AreaChart as PrismaAreaChart,
  SelectFilter as PrismaSelectFilter,
  View as PrismaView,
  DonutChart as PrismaDonutChart,
  HorizontalBarChart as PrismaHorizontalBarChart,
  WaterfallChart as PrismaWaterfallChart,
  KPIChart as PrismaKPIChart,
} from '@prisma/client';
import { Panel } from '../entities/panel.entity';

import { CoreViewsMapper } from '../../views/mappers/core-views.mapper';

export class PanelsMapper {
  public static toDomain(
    panel: PrismaPanel & {
      views?: (PrismaView & {
        pieChart?: PrismaPieChart | null;
        barChart?: PrismaBarChart | null;
        areaChart?: PrismaAreaChart | null;
        lineChart?: PrismaLineChart | null;
        mapChart?: PrismaMapChart | null;
        numberView?: PrismaNumberView | null;
        selectFilter?: PrismaSelectFilter | null;
        donutChart?: PrismaDonutChart | null;
        horizontalBarChart?: PrismaHorizontalBarChart | null;
        waterfallChart?: PrismaWaterfallChart | null;
        kpiChart?: PrismaKPIChart | null;
      })[];
    },
  ) {
    const {
      id,
      name,
      description,
      imageURL,
      userId,
      layout,
      createdAt,
      updatedAt,
    } = panel;

    const panelViews = panel.views
      ? panel.views.map((v) => {
          const view = CoreViewsMapper.toDomain(v);
          return view;
        })
      : undefined;

    let _layout: object | undefined | null = undefined;

    if (layout) {
      _layout = layout as object;
    }

    return new Panel({
      id,
      name,
      description,
      imageURL,
      userId,
      layout: _layout,
      createdAt,
      updatedAt,
      views: panelViews,
    });
  }

  public static toHTTP(panel: Panel) {
    const {
      id,
      props: { name, description, imageURL, userId, layout },
      createdAt,
      updatedAt,
    } = panel;

    return {
      id,
      name,
      description,
      imageURL,
      userId,
      layout,
      createdAt,
      updatedAt,
    };
  }
}
