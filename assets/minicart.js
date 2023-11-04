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

}

customElements.define('mini-cart', Minicart);