import React, { Component } from "react";
import MenuListItem from "../menu-list-item";
import { connect } from "react-redux";
import withRestoService from "../hoc";
import { menuLoaded, menuRequested, menuError, addedToCart } from '../../actions/';
import Spinner from '../spinner/';
import Error from '../error';

import "./menu-list.scss";

class MenuList extends Component {
  componentDidMount() {
    const { RestoService, menuLoaded, menuRequested, menuError } = this.props;
    menuRequested();
    RestoService.getMenuItems()
      .then((res) => menuLoaded(res))
      .catch(() => menuError());
  }

  render() {
    const { menuItems, loading, error, addedToCart } = this.props;

    if (error) {
      return <Error/>
    }

    if (loading) {
      return <Spinner/>
    }

    const items = menuItems.map(menuItem => (
      <MenuListItem
        key={menuItem.id}
        menuItem={menuItem}
        onAddToCart={() => addedToCart(menuItem.id)} />
    ));

    return (
      <ul className="menu__list">
        {items}
      </ul>
    );
  }
}

const mapStateToProps = ({menu, loading, error}) => ({ menuItems: menu, loading, error });
const mapDispatchToProps = { menuLoaded, menuRequested, menuError, addedToCart }

export default withRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList));
