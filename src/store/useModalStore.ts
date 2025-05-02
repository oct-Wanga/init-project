import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

interface IModal {
  Component: JSX.Element;
}

interface IModalState {
  modals: IModal[];
  openModal: (Component: JSX.Element) => void;
  onCloseModal: () => void;
  resetModal: () => void;
}

/**
 * Modal 목록 관리 Context
 */
const useModalStore = createWithEqualityFn<IModalState>(
  (set, get) => ({
    modals: [],
    openModal: (Component: JSX.Element) => {
      set({ modals: [...get().modals, { Component }] });
    },
    onCloseModal: () => {
      set({ modals: [...get().modals.slice(0, get().modals.length - 1)] });
    },
    resetModal: () => {
      set({ modals: [] });
    },
  }),
  shallow,
);

export default useModalStore;
