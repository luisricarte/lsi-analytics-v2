import { ErrorMessage } from '@hookform/error-message';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronLeft, ChevronRight, Upload } from 'lucide-react';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbLink,
  BreadcrumbNeutral,
} from '@/components/breadcrumb';
import { FieldError } from '@/components/errors/field-error';
import { Layout } from '@/components/layout';
import { NotFoundPage } from '@/components/not-found-page';
import { SimpleStepper } from '@/components/simple-stepper';
import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { APP_ROUTES } from '@/constants/app-routes';
import { REQUIRED_FIELD } from '@/constants/messages';
import { PANEL } from '@/services/models/panel/constants';
import { ViewProps } from '@/services/models/panel/types';

import { usePanelNewViewContext } from '../../hooks/usePanelNewViewContext';
import { usePanelQuery } from '../../hooks/usePanelQuery';

type FormData = {
  name: ViewProps['name'];
  type: ViewProps['type'];
  contentUpdate: ViewProps['contentUpdate'];
  mapType: ViewProps['mapType'];
};

export const PanelNewViewConfig: React.FC = () => {
  const { id } = useParams();

  const { setViewCreation, viewCreation } = usePanelNewViewContext();
  const location = useLocation();

  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<ViewProps['type'] | null>(
    location.state?.view ?? viewCreation.type ?? '',
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<FormData>({
    defaultValues: {
      name: viewCreation.name ?? '',
      type: location.state?.view ?? viewCreation.type ?? '',
      contentUpdate: PANEL.CONTENT_UPDATE.STATIC,
    },
  });

  const navigate = useNavigate();

  const { data, error } = usePanelQuery({ id });

  const handleNext = async (formData: FormData) => {
    if (data) {
      setViewCreation((prevState) => {
        console.log('prevState', prevState);

        const newState = { ...prevState };
        if (formData.type === 'MAPCHART') {
          Object.assign(newState, { ...formData, panelId: id, id: nanoid() });
        }

        return newState;
      });
      navigate(APP_ROUTES.panel.new.font.replace(':id', data.id));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0]);
      setFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
    }
  };

  const render = () => {
    if (data) {
      return (
        <form
          onSubmit={handleSubmit(handleNext)}
          className="flex w-[768px] flex-col gap-6"
        >
          <SimpleStepper active={1} numberOfSteps={4} />
          <div className="flex flex-col gap-2">
            <Typography level="h3">Nova visualização</Typography>
            <Typography level="muted">Configuração geral</Typography>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <Label>Nome da visualização</Label>
              <Input
                placeholder="Nome"
                {...register('name', { required: REQUIRED_FIELD })}
              />
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => <FieldError message={message} />}
              />
            </div>

            <div>
              <Label>Tipo de visualização</Label>
              <Controller
                name="type"
                rules={{ required: REQUIRED_FIELD }}
                control={control}
                render={({ field: { onChange } }) => (
                  <Select
                    onValueChange={(value) => {
                      onChange(value);
                      setSelectedType(value as ViewProps['type']);
                    }}
                    defaultValue={
                      location.state?.view ?? viewCreation.type ?? null
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Visualização" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={PANEL.VIEW.PIECHART}>
                        Gráfico de pizza
                      </SelectItem>
                      <SelectItem value={PANEL.VIEW.DONUTCHART}>
                        Gráfico de rosca
                      </SelectItem>
                      <SelectItem value={PANEL.VIEW.BARCHART}>
                        Gráfico de barra
                      </SelectItem>
                      <SelectItem value={PANEL.VIEW.HORIZONTALBARCHART}>
                        Gráfico de barra horizontal
                      </SelectItem>
                      <SelectItem value={PANEL.VIEW.LINECHART}>
                        Gráfico de linha
                      </SelectItem>
                      <SelectItem value={PANEL.VIEW.AREACHART}>
                        Gráfico de área
                      </SelectItem>
                      <SelectItem value={PANEL.VIEW.WATERFALLCHART}>
                        Gráfico de cascata
                      </SelectItem>
                      <SelectItem value={PANEL.VIEW.MAPCHART}>
                        Gráfico de mapa
                      </SelectItem>
                      <SelectItem value={PANEL.VIEW.NUMBERVIEW}>
                        Visualização de número
                      </SelectItem>
                      <SelectItem value={PANEL.VIEW.SELECTFILTER}>
                        Filtro de seleção
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <ErrorMessage
                errors={errors}
                name="type"
                render={({ message }) => <FieldError message={message} />}
              />
            </div>
          </div>
          {selectedType === 'MAPCHART' && (
            <>
              <div
                style={{
                  gap: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Label> Selecione o Mapa </Label>
                <Controller
                  name="mapType"
                  rules={
                    file ? { required: false } : { required: REQUIRED_FIELD }
                  }
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Select onValueChange={onChange} disabled={file !== null}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um mapa" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={'100'}>Brasil</SelectItem>
                        <SelectItem value={'12'}>Acre</SelectItem>
                        <SelectItem value={'27'}>Alagoas</SelectItem>
                        <SelectItem value={'13'}>Amazonas</SelectItem>
                        <SelectItem value={'16'}>Amapá</SelectItem>
                        <SelectItem value={'29'}>Bahia</SelectItem>
                        <SelectItem value={'23'}>Ceará</SelectItem>
                        <SelectItem value={'53'}>Distrito Federal</SelectItem>
                        <SelectItem value={'32'}>Espírito Santo</SelectItem>
                        <SelectItem value={'52'}>Goiás</SelectItem>
                        <SelectItem value={'21'}>Maranhão</SelectItem>
                        <SelectItem value={'51'}>Mato Grosso</SelectItem>
                        <SelectItem value={'50'}>Mato Grosso do Sul</SelectItem>
                        <SelectItem value={'15'}>Pará</SelectItem>
                        <SelectItem value={'25'}>Paraíba</SelectItem>
                        <SelectItem value={'41'}>Paraná</SelectItem>
                        <SelectItem value={'26'}>Pernambuco</SelectItem>
                        <SelectItem value={'22'}>Piauí</SelectItem>
                        <SelectItem value={'33'}>Rio de Janeiro</SelectItem>
                        <SelectItem value={'24'}>
                          Rio Grande do Norte
                        </SelectItem>
                        <SelectItem value={'43'}>Rio Grande do Sul</SelectItem>
                        <SelectItem value={'11'}>Rondônia</SelectItem>
                        <SelectItem value={'14'}>Roraima</SelectItem>
                        <SelectItem value={'42'}>Santa Catarina</SelectItem>
                        <SelectItem value={'35'}>São Paulo</SelectItem>
                        <SelectItem value={'28'}>Sergipe</SelectItem>
                        <SelectItem value={'17'}>Tocantins</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="mapType"
                  render={({ message }) => <FieldError message={message} />}
                />
                <Controller
                  name="mapType"
                  rules={
                    file ? { required: false } : { required: REQUIRED_FIELD }
                  }
                  control={control}
                  render={() => (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                      }}
                    >
                      <Dialog.Root>
                        <Dialog.Trigger asChild>
                          <div>
                            <button className="w-auto rounded-md bg-blue-500 px-4 py-2 text-white">
                              <div style={{ display: 'flex', gap: '12px' }}>
                                <span className="text-xs">
                                  Carregue um Arquivo
                                </span>
                                <Upload size={15} />
                              </div>
                            </button>
                            <span
                              style={{ marginLeft: '12px', color: '#00A300' }}
                            >
                              {file?.name}
                            </span>
                          </div>
                        </Dialog.Trigger>
                        <div
                          style={{ display: 'flex', flexDirection: 'column' }}
                        >
                          <span style={{ color: '#BDBDBD', fontSize: '15px' }}>
                            .json
                          </span>
                          <span style={{ color: '#BDBDBD', fontSize: '15px' }}>
                            .geojson
                          </span>
                          <span style={{ color: '#BDBDBD', fontSize: '15px' }}>
                            .kml
                          </span>
                          <span style={{ color: '#BDBDBD', fontSize: '15px' }}>
                            .shp
                          </span>
                        </div>
                        <Dialog.Portal>
                          <Dialog.Overlay className="bg-blackA9 fixed inset-0" />
                          <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[400px] -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-white p-4 shadow-lg">
                            <Dialog.Title className="text-lg font-medium text-gray-900">
                              Carregue um arquivo
                            </Dialog.Title>

                            <Dialog.Description className="mt-2 text-sm text-gray-500">
                              Selecione um arquivo para carregar.
                            </Dialog.Description>
                            <div className="mt-4">
                              <input
                                name={file?.name}
                                id={file?.name}
                                type="file"
                                onChange={handleFileChange}
                                accept=".json, .geojson, .kml, .shp"
                                className=" text-sm text-gray-500
                                      file:mr-4 file:rounded-md file:border-0
                                      file:bg-blue-500 file:px-4
                                      file:py-2 file:text-sm
                                      file:font-semibold file:text-white
                                      hover:file:bg-blue-600"
                              />

                              {file && (
                                <p className="mt-2 text-sm text-green-600">
                                  Arquivo selecionado: {fileName}
                                </p>
                              )}
                            </div>
                            <div className="mt-4 flex justify-end">
                              <Dialog.Close asChild>
                                <button className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400">
                                  Cancelar
                                </button>
                              </Dialog.Close>
                            </div>
                          </Dialog.Content>
                        </Dialog.Portal>
                      </Dialog.Root>
                    </div>
                  )}
                />
              </div>
            </>
          )}
          <div className="flex flex-col gap-2">
            <Label>Atualização do conteúdo</Label>
            <Controller
              name="contentUpdate"
              control={control}
              rules={{ required: REQUIRED_FIELD }}
              render={({ field: { onChange } }) => (
                <RadioGroup defaultValue="STATIC" onValueChange={onChange}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="STATIC" id="STATIC" />
                    <Label htmlFor="STATIC">Estático</Label>
                  </div>
                  <Typography level="muted">
                    A plataforma guarda os dados da primeira requisição e faz
                    uma nova requisição para atualizar é arbitrária
                  </Typography>
                </RadioGroup>
              )}
            />
          </div>

          <div className="flex justify-between">
            <Link
              to={APP_ROUTES.panel.edit.replace(':id', data.id)}
              state={{ tab: 'views' }}
            >
              <Button variant="outline" type="button">
                <ChevronLeft size={18} />
                Voltar
              </Button>
            </Link>
            <Button type="submit">
              Próximo
              <ChevronRight size={18} />
            </Button>
          </div>
        </form>
      );
    }

    return null;
  };

  if (error || !id) {
    return <NotFoundPage />;
  }

  if (data) {
    return (
      <Layout
        title="Novo"
        breadcrumb={
          <Breadcrumb>
            <BreadcrumbHome />
            <BreadcrumbLink to={APP_ROUTES.panels.index}>
              Paineis
            </BreadcrumbLink>
            <BreadcrumbLink to={APP_ROUTES.panel.index.replace(':id', id)}>
              {data.name}
            </BreadcrumbLink>
            <BreadcrumbLink to={APP_ROUTES.panel.edit.replace(':id', id)}>
              Editar
            </BreadcrumbLink>
            <BreadcrumbNeutral>Nova visualização</BreadcrumbNeutral>
          </Breadcrumb>
        }
        className="layout-page"
      >
        {render()}
      </Layout>
    );
  }

  return null;
};
