import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  precision: 0,
  loading: false,
  connected: true,
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setOrders: (state, { payload }) => {
      let orders
      if (payload[1].length > 3) {
        orders = payload[1].map((item) => ({
          price: item[1][0],
          count: item[1][1],
          amount: item[1][2],
          total: null
        }));
        state.orders = orders
      } else {
        const stream = {
          price: payload[1][0],
          count: payload[1][1],
          amount: payload[1][2],
        };
        if (stream.count > 0) {
          // stream.amount > 0
          //   ? state.orders.bids.unshift(stream)
          //   : state.orders.asks.unshift(stream);
        }
      }
    },
    incPrecision: (state) => {
      if (state.precision < 3) state.precision += 1;
    },
    decPrecision: (state) => {
      if (state.precision > 0) state.precision -= 1;
    },
  },
});

export const { setOrders, incPrecision, decPrecision } = bookSlice.actions;

export default bookSlice.reducer;
