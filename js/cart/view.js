export default class View {
  constructor() {}

  elements = {
    cartContainer: document.getElementById("cart-wrapper"),
    form: document.getElementById("order-form"),
    empty: document.querySelector("[data-cart-empty]"),
    total: document.querySelector("#total-price"),
  };

  renderCard(products) {
    this.elements.cartContainer.innerHTML = "";
    products.forEach((cartObj) => {
      let cardHTML = `
	<div class="cart-item" data-id="${cartObj.id}">
		<div class="cart-item__top">
			<div class="cart-item__img">
			<img src="img/roll/${cartObj.imgSrc}" alt="${cartObj.title}" />
			</div>
			<div class="cart-item__desc">
			<div class="cart-item__title">${cartObj.title}</div>
			<div class="cart-item__weight">${cartObj.itemsInBox} / ${cartObj.weight}</div>

			<!-- cart-item__details -->
			<div class="cart-item__details">
				<div class="items items--small counter-wrapper">
				<div class="items__control" data-action="minus">-</div>
				<div class="items__current" data-counter="">${cartObj.count}</div>
				<div class="items__control" data-action="plus">+</div>
				</div>

				<div class="price">
				<div class="price__currency">${cartObj.price}</div>
				</div>
			</div>
			<!-- // cart-item__details -->
			</div>
		</div>
	</div>`;
      this.elements.cartContainer.insertAdjacentHTML("beforeend", cardHTML);
    });
    this.toggleCart();
  }

  toggleCart() {
    if (this.elements.cartContainer.children.length > 0) {
      this.elements.form.classList.remove("none");
      this.elements.empty.classList.add("none");
    } else {
      this.elements.form.classList.add("none");
      this.elements.empty.classList.remove("none");
    }
  }

  renderTotal(sum) {
    let totalPrice = new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(sum);

    this.elements.total.textContent = totalPrice;
  }
}
