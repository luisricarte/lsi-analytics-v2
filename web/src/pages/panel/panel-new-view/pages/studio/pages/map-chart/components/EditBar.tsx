import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { EchartAdapter } from '@/adapters/echart';
import { Button } from '@/components/ui/button';
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
import { ToolTipSymb } from '@/components/ui/tooltip-symb';
import { APP_ROUTES } from '@/constants/app-routes';
import { usePanelEditContext } from '@/pages/panel/hooks/usePanelEditContext';
import { usePanelNewViewContext } from '@/pages/panel/panel-new-view/hooks/usePanelNewViewContext';
import { usePanelQuery } from '@/pages/panel/panel-new-view/hooks/usePanelQuery';
import { GraphTypeCore, MapChartProps } from '@/services/models/panel/types';
import { addViewIdToLayout } from '@/utils';

import { EMapChartData } from '../contexts/PanelNewViewStudioMapChartProvider';
import { usePanelNewViewStudioMapChartContext } from '../hooks/usePanelNewViewStudioMapChartContext';

export const EditBar: React.FC = () => {
  const [category, setCategory] = React.useState<string | null>(null);
  const [value, setValue] = React.useState<string | null>(null);
  // const [symbolize, setSymbolize] = React.useState<string | null>('');

  const navigate = useNavigate();

  const { id } = useParams();

  const { data } = usePanelQuery({ id });

  const { queryData, viewCreation } = usePanelNewViewContext();

  const { setNewViewsPreview, setLayouts } = usePanelEditContext();

  const {
    setEchartData,
    echartData,
    setColor,
    setMaxValue,
    setHoverDescription,
  } = usePanelNewViewStudioMapChartContext();

  const getEChartsData = React.useCallback(() => {
    if (category && value && queryData) {
      const graphData = EchartAdapter.queryToData({
        queryResult: queryData,
        core: { labelColumn: category, valueColumn: value } as GraphTypeCore,
        type: viewCreation.type,
      }) as EMapChartData[];

      if (graphData) {
        setEchartData(graphData);
      }
    }
  }, [category, queryData, setEchartData, value, viewCreation]);

  React.useEffect(() => {
    getEChartsData();
  }, [category, value, getEChartsData]);

  useEffect(() => {
    const values: number[] = [];
    if (echartData.length > 0) {
      echartData.map((valoresGravados) =>
        values.push(parseInt(valoresGravados.data.value, 10)),
      );
      const maxValue = Math.max(...values);
      setMaxValue(maxValue);
    }
  }, [value, echartData]);

  const handleCreate = () => {
    if (category && value && queryData && data) {
      const createdView = { ...viewCreation };

      const core: MapChartProps = {
        labelColumn: category,
        valueColumn: value,
        associatedMap: viewCreation.mapType,
        fileName: viewCreation.fileName,
        fileContent: viewCreation.fileContent,
      };

      Object.assign(createdView, { core });

      echartData.push({
        data: { name: '', value: '' },
        mapType: viewCreation.mapType,
        fileName: viewCreation.fileName,
        fileContent: viewCreation.fileContent,
      });

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
                <Label>Selecione o campo dos estados</Label>
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
                <Select onValueChange={setValue}>
                  <SelectTrigger>
                    <SelectValue placeholder="Valor" />
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
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  flexDirection: 'column',
                }}
              >
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Label>Cores do Mapa</Label>
                  <ToolTipSymb message="Digite as cores em hexdecimal separado por vírgula e com #"></ToolTipSymb>
                </div>
                <Input
                  placeholder="Digite as cores do seu gráfico"
                  onChange={(e) => {
                    const valor = e.target.value;
                    const splitted = valor.split(',');
                    console.log(splitted);
                    setColor(splitted);
                    // TODO: MELHORAR LÓGICA PARA EVITAR QUEBRAR com caractéres especiais
                  }}
                />

                <span
                  style={{
                    fontWeight: '400',
                    fontSize: '12px',
                    color: '#bdbdbd',
                  }}
                >
                  Exemplo: #e0f3f8, #abd9e9, #74add1, #4575b4, #313695
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  flexDirection: 'column',
                }}
              >
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Label>Do que se trata o mapa?</Label>
                  <ToolTipSymb message="Aparecerá ao colocar o mouse por cima"></ToolTipSymb>
                </div>
                <Input
                  placeholder="Digite o texto"
                  onChange={(e) => {
                    setHoverDescription(e.target.value);
                  }}
                />
              </div>
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
