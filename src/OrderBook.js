import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOrders } from "./features/bookSlice";
import "./OrderBook.css";

function OrderBook() {
  const orders = useSelector((state) => state.books.orders);
  const instrument = "BTCUSD";
  const headers = ["count", "amount", "total", "price"];
  const dispatch = useDispatch();

  const formatFPN = (number) => parseFloat(number).toFixed(4)
  const absN = (number) => Math.abs(number)

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

  // useEffect(() => {
  //   console.log(orders);
  // }, [orders]);

  const orderHead = (arr) => (
    <thead>
      <tr>
        {arr.map((item, index) => (
          <th className="c" key={index}>{item.toUpperCase()}</th>
        ))}
      </tr>
    </thead>
  );

  const orderRows = (arr, type) =>
    arr &&
    arr.map((item, index) =>
      type === "bids" ? (
        <tr key={index}>
          <td className="c">{item.count}</td>
          <td>{formatFPN(item.amount)}</td>
          <td>{formatFPN(item.amount * item.count)}</td>
          <td>{Number(item.price).toLocaleString('en-US')}</td>
        </tr>
      ) : (
        <tr key={index}>
          <td>{Number(item.price).toLocaleString('en-US')}</td>
          <td>{formatFPN(absN(item.amount) * item.count)}</td>
          <td>{formatFPN(absN(item.amount))}</td>
          <td className="c">{item.count}</td>
        </tr>
      )
    );

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
        <table className="bids">
          {orderHead(headers)}
          <tbody className="t-body">{orderRows(orders.bids, "bids")}</tbody>
        </table>

        <table className="asks">
          {orderHead(headers.reverse())}
          <tbody className="t-body">{orderRows(orders.asks, "asks")}</tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderBook;
