import React from 'react';
import { Link } from 'react-router-dom';

import { APP_ROUTES } from '@/constants/app-routes';
import { cn } from '@/utils';

interface ConfigBarProps {
  active?: 'account' | 'preferences';
}

export const ConfigBar: React.FC<ConfigBarProps> = ({ active }) => (
  <div className="flex flex-col gap-4 p-4">
    <h1 className="text-lg font-semibold">Configurações</h1>

    <div className="flex flex-col">
      <Link
        to={APP_ROUTES.config.index}
        className={cn(
          'w-full rounded-md px-4 py-4',
          active === 'account' && 'bg-zinc-100',
        )}
      >
        Conta
      </Link>

      <Link
        to={APP_ROUTES.config.preferences}
        className={cn(
          'w-full rounded-md px-4 py-4',
          active === 'preferences' && 'bg-zinc-100',
        )}
      >
        Preferências
      </Link>
    </div>
  </div>
);
