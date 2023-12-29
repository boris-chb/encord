import { create } from 'zustand';

import type { MutableRefObject } from 'react';

interface SheetCloseRefState {
  sheetCloseRef: MutableRefObject<HTMLButtonElement | null>;
  setSheetCloseRef: (ref: HTMLButtonElement | null) => void;
}

const useStore = create<SheetCloseRefState>((set) => ({
  sheetCloseRef: { current: null },
  setSheetCloseRef: (ref) => set({ sheetCloseRef: { current: ref } }),
}));

export default useStore;
