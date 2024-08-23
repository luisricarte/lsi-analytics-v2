import * as Tooltip from '@radix-ui/react-tooltip';
import { HelpCircle } from 'lucide-react';
import React from 'react';

interface ToolTypeInterface {
  message: string;
}

export const ToolTipSymb: React.FC<ToolTypeInterface> = ({ message }) => (
  <Tooltip.Provider>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <div className="inline-flex cursor-pointer items-center justify-center">
          <HelpCircle size={15} />
        </div>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          className="rounded-md bg-gray-800 px-3 py-2 text-sm text-white shadow-lg"
          sideOffset={5}
        >
          {message}
          <Tooltip.Arrow className="fill-gray-800" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  </Tooltip.Provider>
);
