import ProductsModel from "./products/model.js";
import CartModel from "./cart/model.js";
import CartView from "./cart/view.js";
import ProductView from "./products/view.js";

let productsModel = new ProductsModel();
let cartModel = new CartModel();
let cartView = new CartView();
await getRolls();

let productsView = new ProductView(productsModel.products);

// Асинхронная функция выгрузки роллов из JSON файла
async function getRolls() {
  await productsModel.loadProducts();
  cartView.renderCard(cartModel.cart);
  cartView.renderTotal(cartModel.countTotal());
}

productsView.elements.productsContainer.addEventListener("click", function (e) {
  let action = e.target.dataset.action;

  if (action === "plus" || action === "minus") {
    let productId = +e.target.closest(".card").dataset.id;

    const product = productsModel.updateCounter(productId, action);

    productsView.updateCounter(product);
  }

  if (action === "add-to-cart") {
    let productId = +e.target.closest(".card").dataset.id;
    let product = productsModel.findProduct(productId);
    cartModel.addToCart(product);
    cartView.renderCard(cartModel.cart);
    productsModel.updateCounter(productId, "reset");
    productsView.updateCounter(product);

    cartView.renderTotal(cartModel.countTotal());
  }
});

cartView.elements.cartContainer.addEventListener("click", function (e) {
  let action = e.target.dataset.action;
  if (action === "plus") {
    let product = cartModel.findProduct(
      +e.target.closest(".cart-item").dataset.id
    );

    cartModel.plus(product);
    cartView.renderCard(cartModel.cart);
  }

  if (action === "minus") {
    let product = cartModel.findProduct(
      +e.target.closest(".cart-item").dataset.id
    );

    cartModel.deleteFromCart(product);
    cartView.renderCard(cartModel.cart);
  }

  cartView.renderTotal(cartModel.countTotal());
});
