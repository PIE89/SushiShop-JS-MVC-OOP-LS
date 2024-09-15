export default class View {
  constructor(rolls) {
    rolls.forEach((roll) => this.renderCard(roll));
  }

  elements = {
    productsContainer: document.getElementById("products-container"),
  };

  renderCard(cardObj) {
    let cardHTML = `
	<div class="col-md-6">
		<div class="card mb-4" data-id="${cardObj.id}">
			<img class="product-img" src="img/roll/${cardObj.imgSrc}" alt="${cardObj.title}" />
			<div class="card-body text-center">
				<h4 class="item-title">${cardObj.title}</h4>
				<p><small data-items-in-box="" class="text-muted">${cardObj.itemsInBox} шт.</small></p>

				<div class="details-wrapper">
					<!-- Счетчик -->
					<div class="items counter-wrapper">
						<div class="items__control" data-action="minus">-</div>
						<div class="items__current" data-counter="">${cardObj.count}</div>
						<div class="items__control" data-action="plus">+</div>
					</div>
					<!-- // Счетчик -->

					<div class="price">
						<div class="price__weight">${cardObj.weight}г.</div>
						<div class="price__currency">${cardObj.price} ₽</div>
					</div>
				</div>

				<button
					data-action="add-to-cart"
					type="button"
					class="btn btn-block btn-outline-warning"
				>
					+ в корзину
				</button>
			</div>
		</div>
	</div>
`;

    this.elements.productsContainer.insertAdjacentHTML("beforeend", cardHTML);
  }

  updateCounter(cardObj) {
    const cardWrapper = document.querySelector(`[data-id="${cardObj.id}"]`);
    const counterElement = cardWrapper.querySelector("[data-counter");

    counterElement.innerText = cardObj.count;
  }
}
