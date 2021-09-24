import React from "react";
import { connect } from "react-redux";
import { deleteFromCart } from "../../actions/";
import WithRestoService from "../hoc";
import "./cart-table.scss";

const CartTable = ({ items, deleteFromCart, RestoService }) => {
  if (items.length === 0) {
    return (<div className="cart__title">Ваша корзина пуста.</div>)
  }

  return (
    <>
      <div className="cart__title">Ваш заказ:</div>
      <div className="cart__list">
        {items.map((item) => {
          const { title, price, url, id, quantity } = item;
          return (
            <div key={id} className="cart__item">
              <img src={url} className="cart__item-img" alt="{title}"></img>
              <div className="cart__item-title">{title}</div>
              <div className="cart__item-price">{price * quantity}$ (per {quantity})</div>
              <div onClick={() => deleteFromCart(id)} className="cart__close">
                &times;
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={() => RestoService.setOrder(generateOrder(items))} className="order">Оформить заказ</button>
    </>
  );
};

const generateOrder =(items) => {
  const newOrder = items.map(item => ({
    id: item.id,
    title: item.title,
    price: `${item.price} $`,
    quantity: `${item.quantity} items`,
    totalSum: `${item.price * item.quantity} $`
  }));
  return newOrder;
}

const mapSteteToProps = ({ items }) => ({ items });
const mapDispatchToProps = { deleteFromCart };

export default WithRestoService()(connect(mapSteteToProps, mapDispatchToProps)(CartTable));
