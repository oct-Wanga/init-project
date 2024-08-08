import { create } from 'zustand';

interface EditingStore {
  id: number;
  color: string;
  setId: (id: number) => void;
  setColor: (color: string) => void;
}

const initialState = {
  id: 0,
  color: '#000000',
};
const useEditingStore = create<EditingStore>(set => ({
  ...initialState,
  setId: (id: number) => {
    set({
      id,
    });
  },
  setColor: (color: string) => {
    set(() => ({
      color,
    }));
  },
}));

export default useEditingStore;
