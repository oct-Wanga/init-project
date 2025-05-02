import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

interface IToast {
  Component: JSX.Element;
}

interface IToastState {
  toasts: IToast[];
  openToast: (Component: JSX.Element) => void;
  closeToast: () => void;
  resetToast: () => void;
}
/**
 * Toast 목록 관리 Context
 */

const useToastStore = createWithEqualityFn<IToastState>(
  (set, get) => ({
    toasts: [],
    openToast: (Component: JSX.Element) => {
      set({ toasts: [...get().toasts, { Component }] });
    },
    closeToast: () => {
      set({ toasts: [...get().toasts.slice(0, get().toasts.length - 1)] });
    },
    resetToast: () => {
      set({ toasts: [] });
    },
  }),
  shallow,
);

export default useToastStore;
