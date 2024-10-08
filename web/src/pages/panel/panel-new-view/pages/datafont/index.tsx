import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbLink,
  BreadcrumbNeutral,
} from '@/components/breadcrumb';
import { FieldError } from '@/components/errors/field-error';
import { Layout } from '@/components/layout';
import { NoData } from '@/components/no-data';
import { NotFoundPage } from '@/components/not-found-page';
import { SimpleStepper } from '@/components/simple-stepper';
import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { APP_ROUTES } from '@/constants/app-routes';
import {
  PROVIDER_MAPPER_DB_IMAGEURL,
  PROVIDER_MAPPER_DB_LABEL,
  TYPE_STORAGE_MAPPER_DB_LABEL,
} from '@/constants/data-fonts';
import { reactQueryKeys } from '@/constants/react-query-keys';
import { dataFontsService } from '@/services/datafonts';
import { cn } from '@/utils';

import { usePanelNewViewContext } from '../../hooks/usePanelNewViewContext';
import { usePanelQuery } from '../../hooks/usePanelQuery';

export const PanelNewViewDataFont: React.FC = () => {
  const [checkedDataFont, setCheckedDataFont] = React.useState<string | null>(
    null,
  );
  const [checkError, setCheckError] = React.useState<string | null>(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const { setViewCreation, canAccessStep } = usePanelNewViewContext();

  const { data: dataFontsData } = useQuery({
    queryKey: [reactQueryKeys.queries.findAllDataFontsQuery],
    queryFn: () => dataFontsService.findAll(),
  });

  const { data, error } = usePanelQuery({ id });

  const handleNext = () => {
    if (data) {
      if (!checkedDataFont) {
        setCheckError('Selecione uma fonte de dados');
        return;
      }

      setViewCreation((prevState) => {
        const newState = { ...prevState };
        Object.assign(newState, { datafontId: checkedDataFont });
        return newState;
      });
      navigate(APP_ROUTES.panel.new.object.replace(':id', data.id));
    }
  };

  const renderBreadbrumb = () => {
    if (data && id) {
      return (
        <Breadcrumb>
          <BreadcrumbHome />
          <BreadcrumbLink to={APP_ROUTES.panels.index}>Paineis</BreadcrumbLink>
          <BreadcrumbLink to={APP_ROUTES.panel.index.replace(':id', id)}>
            {data.name}
          </BreadcrumbLink>
          <BreadcrumbLink to={APP_ROUTES.panel.edit.replace(':id', id)}>
            Editar
          </BreadcrumbLink>
          <BreadcrumbNeutral>Nova visualização</BreadcrumbNeutral>
          <BreadcrumbNeutral>Fonte de dados</BreadcrumbNeutral>
        </Breadcrumb>
      );
    }
    return null;
  };

  const render = () => {
    if (dataFontsData && data && canAccessStep(2, data.id)) {
      return (
        <div className="flex w-[768px] flex-col gap-6">
          <SimpleStepper numberOfSteps={4} active={2} />

          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold">
              Selecionar fonte de dados
            </h1>

            <Typography level="muted">
              Selecione uma fonte de dados para criar a visualização
            </Typography>
          </div>

          <div>
            <Label>Fonte de dados</Label>
            <div className="relative">
              <Input placeholder="Busque uma fonte" className="pr-8" />
              <Search
                className="absolute right-4 top-1/2 -translate-y-1/2 transform text-foreground"
                size={18}
              />
            </div>
          </div>

          {checkError && <FieldError message={checkError} />}

          {dataFontsData.length > 0 ? (
            <div
              className={cn(
                'flex flex-col gap-4 rounded-sm',
                checkError && 'border border-red-500 p-4',
              )}
            >
              {dataFontsData.map((d) => (
                <button
                  className="flex w-full items-center justify-between"
                  key={d.id}
                  onClick={() => setCheckedDataFont(d.id)}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={PROVIDER_MAPPER_DB_IMAGEURL[d.provider]}
                      className="h-10 w-10"
                    />
                    <div className="flex flex-col items-start">
                      <span className="font-semibold">{d.name}</span>
                      <Typography level="muted">
                        {TYPE_STORAGE_MAPPER_DB_LABEL[d.typeOfStorage]},{' '}
                        <span style={{ color: '#000000' }}>
                          {PROVIDER_MAPPER_DB_LABEL[d.provider]}
                        </span>
                      </Typography>
                    </div>
                  </div>

                  <Checkbox checked={checkedDataFont === d.id} />
                </button>
              ))}
            </div>
          ) : (
            <NoData message="Crie uma nova fonte" />
          )}

          <div className="flex justify-between">
            <Link
              to={APP_ROUTES.panel.new.index.replace(':id', data.id)}
              state={{ tab: 'views' }}
            >
              <Button variant="outline" type="button">
                <ChevronLeft size={18} />
                Voltar
              </Button>
            </Link>
            <Button onClick={handleNext}>
              Próximo
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>
      );
    }

    return null;
  };

  if (error || !id) {
    return <NotFoundPage />;
  }

  return (
    <Layout
      title="Selecionar fonte"
      breadcrumb={renderBreadbrumb()}
      className="layout-page"
    >
      {render()}
    </Layout>
  );
};
