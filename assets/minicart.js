class Minicart extends HTMLElement {
  constructor() {
    super();

    //event listeners
    document.addEventListener('mini-cart-open', this.handleMinicartTrigger.bind(this))
  }

  handleMinicartTrigger(){
    const event = new Event('mini-cart-toggle');
    document.getElementById('mini-cart').dispatchEvent(event);
  }

  addListeners(){
    //get form elements and add event listeners
    this.minicartForm = this.querySelector('form');
    this.quantityInputs = this.minicartForm.querySelectorAll('.mini-cart-quantity-js');
    this.quantityInputs.forEach(input => input.addEventListener('change', this.handleInputChange.bind(this, input)))
  }

  updateCount(){
    //updates cart counter
    let itemCount = document.getElementById('cart-item-count-hidden');
    let countElements = document.querySelectorAll('.mini-cart-count-js');

    if (itemCount && countElements) {
      countElements.forEach(el => {
        el.innerHTML = itemCount.innerHTML;
      })
    }
  }

}

customElements.define('mini-cart', Minicart);