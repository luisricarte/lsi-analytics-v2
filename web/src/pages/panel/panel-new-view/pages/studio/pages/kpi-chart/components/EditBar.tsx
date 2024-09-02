import { CheckIcon } from 'lucide-react';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { EchartAdapter } from '@/adapters/echart';
import {
  ListBox,
  ListBoxOption,
  ListBoxOptions,
  ListBoxTrigger,
} from '@/components/list-box';
import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from '@/components/ui/simple-tabs';
import { APP_ROUTES } from '@/constants/app-routes';
import { usePanelEditContext } from '@/pages/panel/hooks/usePanelEditContext';
import { usePanelNewViewContext } from '@/pages/panel/panel-new-view/hooks/usePanelNewViewContext';
import { usePanelQuery } from '@/pages/panel/panel-new-view/hooks/usePanelQuery';
import { KPIChartProps, GraphTypeCore } from '@/services/models/panel/types';
import { addViewIdToLayout } from '@/utils';

import { EKPIChartData } from '../contexts/PanelNewViewStudioKPIChartProvider';
import { usePanelNewViewStudioKPIChartContext } from '../hooks/usePanelNewViewStudioKPIChartContext';

export const EditBar: React.FC = () => {
  const [category, setCategory] = React.useState<string | null>(null);
  const [value, setValue] = React.useState<string[]>([]);

  const [goal, setGoal] = React.useState<number>(0);
  const [lastRegister, setLastRegister] = React.useState<number | null>();
  // const [isMoney, setIsMoney] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const { id } = useParams();

  const { data } = usePanelQuery({ id });

  const { queryData, viewCreation } = usePanelNewViewContext();

  const { setNewViewsPreview, setLayouts } = usePanelEditContext();

  const {
    setEchartData,
    echartData,
    setColor,
    setFormattedGoal,
    color,
    formattedGoal,
    lastResult,
    setLastResult,
  } = usePanelNewViewStudioKPIChartContext();

  const getPercentual = (value1: number, value2: number): string => {
    if (value1 === 0) {
      return value2 === 0 ? '0%' : 'Infinity%';
    }

    const difference = ((value2 - value1) / value1) * 100;
    const formattedDifference = difference.toFixed(2);

    return `${formattedDifference}%`;
  };

  useEffect(() => {
    if (value) {
      const valorQueryData = queryData?.rows[queryData.rows.length - 1];
      const valordachave = valorQueryData?.[value[0]];
      setLastRegister(valordachave);
      setLastResult(parseFloat(valordachave));
    }
  }, [value, lastRegister, lastResult]);

  const handleFormatGoal = (meta: number) => {
    setGoal(meta);

    if (lastRegister) {
      setFormattedGoal(`Meta: ${meta} (${getPercentual(meta, lastResult)})`);
      if (lastRegister >= meta) {
        setColor('#00ff00');
      } else {
        setColor('#ff0000');
      }
    }
  };

  const getEChartsData = React.useCallback(() => {
    if (category && value && queryData) {
      const graphData = EchartAdapter.queryToData({
        queryResult: queryData,
        core: {
          labelColumn: category,
          valueColumns: value,
          color,
          lastResult,
          formattedGoal,
        } as GraphTypeCore,
        type: viewCreation.type,
      }) as EKPIChartData;

      if (graphData) {
        setEchartData(graphData);
      }
    }
  }, [
    category,
    queryData,
    setEchartData,
    value,
    viewCreation,
    color,
    lastResult,
    formattedGoal,
  ]);

  React.useEffect(() => {
    getEChartsData();
  }, [category, value, getEChartsData]);

  const handleCreate = () => {
    if (category && value && queryData && data && formattedGoal) {
      const createdView = { ...viewCreation };

      const core: KPIChartProps = {
        labelColumn: category,
        valueColumns: value,
        color,
        formattedGoal,
        lastResult,
      };

      Object.assign(createdView, { core });

      setNewViewsPreview((prevState) => {
        const newState = [...prevState];
        newState.push({ toViewData: echartData, view: createdView });
        return newState;
      });

      setLayouts((prevState) => addViewIdToLayout(prevState, createdView.id));

      navigate(APP_ROUTES.panel.edit.replace(':id', data.id));
    }
  };

  if (queryData) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-center">
          <span className="p-4 text-lg font-semibold ">
            Estúdio da visualização
          </span>
        </div>

        <SimpleTabs defaultValue="config" className="flex h-full flex-col">
          <SimpleTabsList>
            <SimpleTabsTrigger value="config">Configurações</SimpleTabsTrigger>
          </SimpleTabsList>
          <SimpleTabsContent value="config" asChild>
            <div className="flex flex-col gap-4 p-4">
              <div>
                <Label>Selecione a categoria</Label>
                <Select onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {queryData?.metadata.columns.map((c) => (
                      <SelectItem
                        key={`${c.name}-${c.dataType}`}
                        value={c.name}
                      >
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Selecione o valor</Label>
                <ListBox value={value} onChange={setValue} multiple>
                  <ListBoxTrigger>
                    {value.length > 0
                      ? value.map((v) => v).join(', ')
                      : 'Valor'}
                  </ListBoxTrigger>
                  <ListBoxOptions>
                    {queryData?.metadata.columns.map((c, index) => (
                      <ListBoxOption
                        key={`${c.name}-${c.dataType}-${index}`}
                        value={c.name}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {c.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </ListBoxOption>
                    ))}
                  </ListBoxOptions>
                </ListBox>
              </div>
              <div>
                <Label>Digite a meta</Label>
                <Input
                  type="number"
                  value={goal}
                  onChange={(e) => handleFormatGoal(parseFloat(e.target.value))}
                />
              </div>
              {/* <div style={{ display: 'flex', gap: '16px' }}>
                <Checkbox
                  checked={isMoney}
                  onCheckedChange={(e) => {
                    if (typeof e === 'boolean') setIsMoney(e);
                  }}
                />
                <Label>Formato monetário</Label>
              </div> */}
            </div>
          </SimpleTabsContent>
          <SimpleTabsContent value="customize" asChild></SimpleTabsContent>
        </SimpleTabs>
        <div className="flex items-center justify-center border-t p-4">
          <Button className="w-full" onClick={handleCreate}>
            Criar
          </Button>
        </div>
      </div>
    );
  }

  return null;
};
