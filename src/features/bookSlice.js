import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: {
    bids: [],
    asks: [],
  },
  precision: 0,
  loading: false,
  connected: true,
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setOrders: (state, { payload }) => {
      if (payload[1].length > 3) {
        const mappedShot = payload[1].map((item) => ({
          price: item[0],
          count: item[1],
          amount: item[2],
        }));

        state.orders.bids = mappedShot.filter((item) => item.amount > 0);
        state.orders.asks = mappedShot.filter((item) => item.amount < 0);
      } else {
        const stream = {
          price: payload[1][0],
          count: payload[1][1],
          amount: payload[1][2],
        };

        if (stream.count > 0) {
          const side = stream.amount > 0 ? "bids" : "asks";

          const priceIndex = state.orders[side].findIndex(
            (shot) => shot.price === stream.price
          );

          priceIndex !== -1
            ? state.orders[side].map((shot) =>
                shot.price === stream.price
                  ? { ...shot, count: (shot.count += stream.count) }
                  : shot
              )
            : state.orders[side].unshift(stream);
        } else {
          const side =
            stream.amount === 1 ? "bids" : stream.amount === -1 ? "asks" : null;

          if (side) {
            const priceIndex = state.orders[side].findIndex(
              (shot) => shot.price === stream.price
            );

            state.orders[side].splice(priceIndex, 1);
          }
        }
      }
    },
    incPrecision: (state) => {
      if (state.precision < 5) state.precision += 1;
    },
    decPrecision: (state) => {
      if (state.precision > 0) state.precision -= 1;
    },
  },
});

export const { setOrders, incPrecision, decPrecision } = bookSlice.actions;

export default bookSlice.reducer;
