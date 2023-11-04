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

}

customElements.define('mini-cart', Minicart);