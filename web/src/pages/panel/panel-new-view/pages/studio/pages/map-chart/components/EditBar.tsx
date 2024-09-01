import { Plus, Trash2 } from 'lucide-react';
import React, { useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { HexColorPicker } from 'react-colorful';
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
  const [color, setColor] = React.useState<string>();
  const [draggedItemIndex, setDraggedItemIndex] = React.useState<number | null>(
    null,
  );
  const navigate = useNavigate();

  const { id } = useParams();

  const { data } = usePanelQuery({ id });

  const { queryData, viewCreation } = usePanelNewViewContext();

  const { setNewViewsPreview, setLayouts } = usePanelEditContext();

  const {
    setEchartData,
    echartData,
    colors,
    setColors,
    maxValue,
    setMaxValue,
    hoverDescription,
    setHoverDescription,
    label,
    setLabel,
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

  const handleAddColor = (addColor: string) => {
    const newColor = [...colors, addColor];
    setColors(newColor);
  };

  const allowDrop = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
  };

  const drag = (ev: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedItemIndex(index);
  };

  const drop = (ev: React.DragEvent<HTMLDivElement>, index: number) => {
    ev.preventDefault();

    if (draggedItemIndex === null) return;

    const newColors = [...colors];
    const [draggedItem] = newColors.splice(draggedItemIndex, 1);
    newColors.splice(index, 0, draggedItem);

    setColors(newColors);
    setDraggedItemIndex(null);
  };

  const handleRefreshColors = () =>
    colors.map((elemento, i) => (
      <div
        style={{
          display: 'flex',
          border: '1px solid #bdbdbd',
          padding: '4px',
          borderRadius: '8px',
          justifyContent: 'space-between',
          cursor: 'pointer',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'box-shadow 0.3s ease',
        }}
        draggable
        key={i}
        onDragStart={(e) => drag(e, i)}
        onDrop={(e) => drop(e, i)}
        onDragOver={(e) => allowDrop(e)}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0px 4px 12px rgba(0, 0, 0, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
        }}
      >
        <div
          style={{
            width: '24px',
            height: '24px',
            backgroundColor: `${elemento}`,
            borderRadius: '4px',
          }}
        ></div>

        <span style={{ fontSize: '14px' }}>
          <span style={{ fontSize: '12px', color: '#bdbdbd' }}>hex </span>
          {elemento}
        </span>

        <button
          onClick={() => {
            if (colors.length > 1) {
              const newColors = [...colors];
              newColors.splice(i, 1);
              setColors(newColors);
            }
          }}
          disabled={colors.length <= 1}
        >
          <Trash2 size={18} color="#bdbdbd" />
        </button>
      </div>
    ));

  useEffect(() => {
    const values: number[] = [];
    if (echartData.length > 0) {
      echartData.map((valoresGravados) =>
        values.push(parseInt(valoresGravados.data.value, 10)),
      );
      const maxiValue = Math.max(...values);
      setMaxValue(maxiValue);
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
        colors,
        label,
        maxValue,
        hoverDescription,
      };

      Object.assign(createdView, { core });

      echartData.push({
        data: { name: '', value: '' },
        mapType: viewCreation.mapType,
        fileName: viewCreation.fileName,
        fileContent: viewCreation.fileContent,
        colors,
        label,
        maxValue,
        hoverDescription,
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
                <div
                  style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}
                >
                  <HexColorPicker
                    color={color}
                    onChange={setColor}
                    style={{
                      width: '100px',
                      height: '100px',
                    }}
                  ></HexColorPicker>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Label>Cores do Mapa</Label>
                      <span
                        style={{
                          color: colors?.length >= 4 ? '#ff0000' : '#bdbdbd',
                          fontSize: '12px',
                        }}
                      >
                        (max. 4)
                      </span>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <Input
                        value={color}
                        onChange={() => setColor(color)}
                        disabled
                      />
                      <button
                        style={{
                          backgroundColor: `${color}`,
                          padding: '4px',
                          borderRadius: '4px',
                        }}
                        disabled={colors.length === 4}
                        onClick={() => {
                          if (color) {
                            handleAddColor(color);
                          }
                        }}
                      >
                        <Plus size={26} color="#ffffff"></Plus>
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  {handleRefreshColors()}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  flexDirection: 'column',
                }}
              >
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Label>Título do tooltip</Label>
                  <ToolTipSymb message="Aparecerá ao colocar o mouse por cima"></ToolTipSymb>
                </div>
                <Input
                  placeholder="Digite o tooltip"
                  onChange={(e) => {
                    setHoverDescription(e.target.value);
                  }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  flexDirection: 'column',
                }}
              >
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Label>Rótulo superior da legenda</Label>
                  <ToolTipSymb message="Adicione a legenda superior do filtro" />
                </div>
                <Input
                  placeholder="Digite a legenda superior"
                  onChange={(e) => {
                    const valor = e.target.value;
                    setLabel([valor, label[1]]);
                  }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  flexDirection: 'column',
                }}
              >
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Label>Rótulo inferior da legenda</Label>
                  <ToolTipSymb message="Adicione a legenda inferior do filtro" />
                </div>
                <Input
                  placeholder="Digite a legenda inferior"
                  onChange={(e) => {
                    const valor = e.target.value;

                    setLabel([label[0], valor]);
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
