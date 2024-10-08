import {
  BarChart3,
  Binary,
  LineChart,
  List,
  PieChart,
  ChevronRight,
  LifeBuoy,
  BarChartHorizontal,
  Map,
  BarChart,
  AreaChart,
} from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from '@/components/ui/simple-tabs';
import { Textarea } from '@/components/ui/textarea';
import { APP_ROUTES } from '@/constants/app-routes';
import { PANEL } from '@/services/models/panel/constants';
import { PanelModel } from '@/services/models/panel/types';
import { cn } from '@/utils';

import { usePanelEditContext } from '../../hooks/usePanelEditContext';
import { ViewSelectButton } from './ViewSelectButton';

interface EditBarProps {
  data: PanelModel;
}

export const EditBar: React.FC<EditBarProps> = ({ data }) => {
  const location = useLocation();

  const { name, setName, description, setDescription, selectedView } =
    usePanelEditContext();

  return (
    <div className="flex h-full flex-col">
      <div className="flex justify-between p-4">
        <span className="text-lg font-semibold">Editar painel</span>
      </div>

      <SimpleTabs
        defaultValue={location.state?.tab ?? 'general'}
        className="flex h-full flex-col"
      >
        <SimpleTabsList>
          <SimpleTabsTrigger value="general">Geral</SimpleTabsTrigger>
          <SimpleTabsTrigger value="views">Visualizações</SimpleTabsTrigger>
        </SimpleTabsList>
        <SimpleTabsContent value="general">
          <div className="flex flex-col gap-4 p-4">
            <div>
              <Label>Nome</Label>
              <Input
                placeholder="Nome"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div>
              <Label>Descrição</Label>

              <Textarea
                className="h-36 resize-none"
                value={description ?? ''}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Descrição"
              />
            </div>
          </div>
        </SimpleTabsContent>
        <SimpleTabsContent
          value="views"
          className="flex h-full max-h-[740px] flex-col justify-between"
        >
          <div className="flex-1 overflow-y-auto p-2">
            <Accordion
              type="multiple"
              className="w-full px-2"
              defaultValue={['item-1', 'item-2', 'item-3']}
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>Visualizações</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 flex-wrap gap-4 px-4">
                    <ViewSelectButton value={PANEL.VIEW.PIECHART}>
                      <PieChart />
                    </ViewSelectButton>
                    <ViewSelectButton value={PANEL.VIEW.DONUTCHART}>
                      <LifeBuoy />
                    </ViewSelectButton>
                    <ViewSelectButton value={PANEL.VIEW.BARCHART}>
                      <BarChart3 />
                    </ViewSelectButton>

                    <ViewSelectButton value={PANEL.VIEW.HORIZONTALBARCHART}>
                      <BarChartHorizontal />
                    </ViewSelectButton>
                    <ViewSelectButton value={PANEL.VIEW.LINECHART}>
                      <LineChart />
                    </ViewSelectButton>
                    <ViewSelectButton value={PANEL.VIEW.AREACHART}>
                      <AreaChart />
                    </ViewSelectButton>
                    <ViewSelectButton value={PANEL.VIEW.KPICHART}>
                      <span>KPI</span>
                    </ViewSelectButton>

                    <ViewSelectButton value={PANEL.VIEW.WATERFALLCHART}>
                      <BarChart className="rotate-180" />
                    </ViewSelectButton>

                    <ViewSelectButton value={PANEL.VIEW.MAPCHART}>
                      <Map />
                    </ViewSelectButton>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Valores</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-4 flex-wrap gap-4 px-4">
                    <ViewSelectButton value={PANEL.VIEW.NUMBERVIEW}>
                      <Binary />
                    </ViewSelectButton>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Filtros</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-4 flex-wrap gap-4 px-4">
                    <ViewSelectButton value="SELECTFILTER">
                      <List />
                    </ViewSelectButton>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="border-t-2 p-4 ">
            <Link
              className={cn(
                'flex w-full items-center justify-center gap-2 rounded-sm bg-blue-500 py-3 text-base text-zinc-50',
                !selectedView && 'cursor-default opacity-50',
              )}
              to={
                selectedView
                  ? APP_ROUTES.panel.new.index.replace(':id', data.id)
                  : '#'
              }
              state={{ view: selectedView }}
            >
              Construir Visualização
              <ChevronRight size={24} />
            </Link>
          </div>
        </SimpleTabsContent>
      </SimpleTabs>
    </div>
  );
};
