import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GlobalDialogState {
  isDialogOpen: boolean;
  dialogType: string | null;
  title: string;
}

const initialState: GlobalDialogState = {
  isDialogOpen: false,
  dialogType: null,
  title: 'Dialog',
};

const GlobalDialogWrapperSlice = createSlice({
  name: 'GlobalDialog',
  initialState,
  reducers: {
    openDialog(state, action: PayloadAction<{ type: string; title: string }>) {
      state.isDialogOpen = true;
      state.dialogType = action.payload.type;
      state.title = action.payload.title;
    },
    closeDialog(state) {
      state.isDialogOpen = false;
      state.dialogType = null;
    },
  },
});

export const { openDialog, closeDialog } = GlobalDialogWrapperSlice.actions;
export default GlobalDialogWrapperSlice.reducer;
