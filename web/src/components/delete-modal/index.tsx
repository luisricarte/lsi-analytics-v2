import * as Dialog from '@radix-ui/react-dialog';
import { Trash, Trash2 } from 'lucide-react';
import React from 'react';

type DeleteModal = {
  onDelete?: () => void;
};

export const DeleteModal: React.FC<DeleteModal> = ({ onDelete }) => (
  <>
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button>
          <Trash2 color="red" size={18} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md border border-gray-300 bg-white p-4 shadow-lg">
          <div className="flex items-center space-x-2">
            <Trash className="text-red-500" />
            <span className="font-medium">Excluir</span>
          </div>
          <div className="mt-4">
            <p>Tem certeza que deseja excluir esta visualização?</p>
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <Dialog.Close asChild>
              <button className="rounded border border-gray-300 px-4 py-2 text-sm text-gray-600">
                Cancelar
              </button>
            </Dialog.Close>
            <button
              className="rounded bg-red-500 px-4 py-2 text-sm text-white"
              onClick={onDelete}
            >
              Excluir
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  </>
);
