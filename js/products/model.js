export default class Model {
  constructor() {
    this.products = [];
  }

  async loadProducts() {
    let data = await fetch("./js/products.json");
    let result = await data.json();
    this.products = result;
    for (let product of this.products) {
      product.count = 1;
    }
  }

  updateCounter(id, action) {
    let product = this.products.find((item) => item.id === id);

    if (action === "plus") {
      product.count += 1;
    }
    if (action === "minus") {
      product.count > 0 ? (product.count -= 1) : 0;
    }

    if (action === "reset") {
      product.count = 1;
    }

    return product;
  }

  findProduct(id) {
    let res = this.products.find((item) => item.id === id);
    return res;
  }
}
