export default class RestoService {
  _apiBase = 'http://localhost:3005';

  getResource = async (url) => {
    const response = await fetch(`${this._apiBase}${url}`);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }

    return await response.json();
  }

  getMenuItems = async () => {
    return await this.getResource('/menu/')
  }

  getItemId = async (id) => {
    const response = await this.getResource('/menu/');
    return response.find(el => (el.id === +id));;
  }

  setOrder = async (order) => {
    const number = await this.getOrderNumber(),
      newOrder = {
        id: number,
        order
      },
      response = await fetch(`${this._apiBase}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(newOrder)
      })
    if (!response.ok) {
      throw new Error(`Error: returned status "${response.status}"`)
    }

    if (response.ok) {
      alert(`Your order №${number} has been successfully completed!`);
      window.location.reload();
    }
  }

  getOrderNumber = async () => {
    const response = await this.getResource('/orders/');
    return response.length + 1;
  }
}