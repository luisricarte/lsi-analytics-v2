import { PieChart, Plus } from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { APP_ROUTES } from '@/constants/app-routes';
import { PanelModel, ViewsType } from '@/services/models/panel';
import { cn } from '@/utils';

type MenuOption = 'general' | 'views';

interface EditBarProps {
  data: PanelModel;
}

export const EditBar: React.FC<EditBarProps> = ({ data }) => {
  const location = useLocation();

  const [activeMenuOption, setActiveMenuOption] = React.useState<MenuOption>(
    location.state?.tab ?? 'general',
  );
  const [selectedView, setSelectedView] = React.useState<ViewsType | null>(
    null,
  );

  const activeClassName =
    'bottomBar relative rounded-full font-semibold text-blue-500';

  const handleRenderEditContent = (option: MenuOption) => {
    switch (option) {
      case 'general':
        return (
          <div className="flex flex-col gap-4 p-4">
            <div>
              <Label>Nome</Label>
              <Input defaultValue={data.name} placeholder="Nome" />
            </div>

            <div>
              <Label>Descrição</Label>

              <Textarea
                className="h-36 resize-none"
                defaultValue={data.description ?? ''}
                placeholder="Descrição"
              />
            </div>
          </div>
        );

      case 'views':
        return (
          <div className="flex h-full flex-col justify-between">
            <div className="p-4">
              <button
                className={cn(
                  selectedView === 'PIE_CHART' && 'rounded-sm border',
                )}
                onClick={() =>
                  setSelectedView((prevState) => {
                    if (prevState === 'PIE_CHART') {
                      return null;
                    }

                    return 'PIE_CHART';
                  })
                }
              >
                <PieChart />
              </button>
            </div>

            <div className="border-t bg-white p-4">
              <Link
                className={cn(
                  'flex w-full items-center justify-center gap-1 rounded-sm bg-blue-500 py-2 text-sm text-zinc-50',
                  !selectedView && 'cursor-default opacity-50',
                )}
                to={
                  selectedView
                    ? APP_ROUTES.panel.new.index.replace(':id', data.id)
                    : '#'
                }
                state={{ view: 'PIE_CHART' }}
              >
                <Plus size={18} />
                Visualização
              </Link>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-full flex-col">
      <span className="p-4 text-lg font-semibold">Editar painel</span>

      <div className="mt-4 flex w-full gap-6 border-b px-4 py-2">
        <button
          onClick={() => setActiveMenuOption('general')}
          className={cn(activeMenuOption === 'general' && activeClassName)}
        >
          Geral
        </button>
        <button
          onClick={() => setActiveMenuOption('views')}
          className={cn(activeMenuOption === 'views' && activeClassName)}
        >
          Visualizações
        </button>
      </div>

      <div className="h-full">{handleRenderEditContent(activeMenuOption)}</div>
    </div>
  );
};
