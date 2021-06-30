import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOrders } from "./features/bookSlice";
import "./OrderBook.css";

function OrderBook() {
  const bids = [];
  const asks = [];
  const orders = useSelector((state) => state.orders);
  const instrument = "BTCUSD";
  const headers = ["count", "amount", "total", "price"];
  const dispatch = useDispatch();

  // dispatch(connectBitfinex(instrument));

  useEffect(() => {
    const subscribe = {
      event: "subscribe",
      channel: "book",
      symbol: `t${instrument}`,
    };
    const ws = new WebSocket("wss://api-pub.bitfinex.com/ws/2");

    ws.onopen = () => {
      ws.send(JSON.stringify(subscribe));
    };
    ws.onmessage = (msg) => {
      const response = JSON.parse(msg.data);

      if (!response.event) {
        // console.log(response);
        dispatch(setOrders(response));
      }
    };
    ws.onclose = () => {
      ws.close();
    };

    return () => {
      ws.close();
    };
  }, [instrument, dispatch]);

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  const orderHead = (arr) => (
    <thead>
      <tr>
        {arr.map((item, index) => (
          <th key={index}>{item.toUpperCase()}</th>
        ))}
      </tr>
    </thead>
  );

  const orderRows = (arr) =>
    arr &&
    arr.map((item, index) => (
      <tr key={index}>
        <td> {item[1]} </td>
        <td> {item[0]} </td>
      </tr>
    ));

  return (
    <div className="widget">
      <div className="widget-head">
        <div>
          <b>ORDER BOOK</b> BTC/USD
        </div>
        <div>Precision</div>
      </div>
      <hr />
      <div className="order-container">
        <table>
          {orderHead(headers)}
          <tbody className="t-body">{orderRows(bids)}</tbody>
        </table>

        <table>
          {orderHead(headers.reverse())}
          <tbody>{orderRows(asks)}</tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderBook;
