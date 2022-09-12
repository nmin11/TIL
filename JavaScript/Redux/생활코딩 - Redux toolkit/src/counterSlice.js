import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const asyncUpFetch = createAsyncThunk(
  'counterSlice/asyncUpFetch',
  async () => {
    const resp = await fetch('https://api.countapi.xyz/hit/loko1124.tistory.com/visits');
    const data = await resp.json();
    return data.value;
  }
);

const counterSlice = createSlice({
  name: 'counterSlice',
  initialState: {
    value: 0,
    status: 'Welcome'
  },
  reducers: {
    up: (state, action) => {
      state.value += action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(asyncUpFetch.pending, (state) => {
      state.status = 'Loading';
    });
    builder.addCase(asyncUpFetch.fulfilled, (state, action) => {
      state.value = action.payload;
      state.status = 'Complete';
    });
    builder.addCase(asyncUpFetch.rejected, (state) => {
      state.status = 'Fail';
    });
  }
});

export default counterSlice;
export const { up, set } = counterSlice.actions;
export { asyncUpFetch }