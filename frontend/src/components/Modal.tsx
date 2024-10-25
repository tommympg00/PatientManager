import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, type ReactNode } from 'react';

import { Subtitle } from '.';

export type ModalProps = {
  show: boolean;
  onClose: () => void;
  content: ReactNode;
  header: ReactNode;
  footer: ReactNode;
};

export const Modal = ({ show, onClose, content, header, footer }: ModalProps) => (
  <Transition.Root show={show} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={onClose}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </Transition.Child>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center text-center sm:items-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel className="relative transform rounded-lg bg-white p-4 text-left shadow-xl transition-all sm:w-full sm:max-w-lg">
              <XMarkIcon
                className="absolute right-4 top-4 h-5 cursor-pointer hover:opacity-80"
                onClick={onClose}
              />
              <div className="mt-3 text-center sm:text-left">
                <DialogTitle as="div" className="m-4">
                  <Subtitle>{header}</Subtitle>
                </DialogTitle>

                <div className="m-4">{content}</div>
              </div>

              <div className="flex p-4">{footer}</div>
            </DialogPanel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
);
