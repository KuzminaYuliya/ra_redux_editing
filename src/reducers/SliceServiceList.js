import { createSlice } from '@reduxjs/toolkit';
import genID from '../utils/genID';

const initialState = {
  editItem: null,
  filter: null,
  list: [
    {
      name: 'Перепрошить',
      price: '6 000',
      id: `${genID()}`,
    },
    {
      name: 'Замена дисплея',
      price: '5 000',
      id: `${genID()}`,
    },
    {
      name: 'Замена аккумулятора',
      price: '1 000',
      id: `${genID()}`,
    },
    {
      name: 'Посмотреть',
      price: '200',
      id: `${genID()}`,
    },
  ],
};

const counterSlice = createSlice({
  name: 'serviceList',
  initialState,
  reducers: {
    put(state, action) {
      state = action.payload;
    },
    save(state, action) {
      const { id, name, price } = action.payload;
      if (!id && name && price) {
        state.list.push({ ...action.payload, id: genID() });
      } else if (name && price) {
        const idx = state.list.findIndex((i) => i.id === id);
        state.list[idx] = action.payload;
      }
      state.editItem = null;
    },
    edit(state, action) {
      const { id } = action.payload;
      state.editItem = state.list.find((i) => i.id === id);
    },
    remove(state, action) {
      const { id } = action.payload;
      const editId = state.editItem ? state.editItem.id : null;
      if (editId === id) {
        state.editItem = null;
      }
      const idx = state.list.findIndex((i) => i.id === id);
      state.list.splice(idx, 1);
    },
    reset(state, action) {
      state.editItem = null;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { edit, save, remove, reset, setFilter } = counterSlice.actions;
export default counterSlice.reducer;
