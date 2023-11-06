 class Minicart extends HTMLElement {
  constructor() {
    super();

    //event listeners
    document.addEventListener('DOMContentLoaded', this.renderMinicart());
    document.addEventListener('mini-cart-open', this.handleMinicartTrigger.bind(this));
  }

  //quantity input change
  handleInputChange(input){
    // updates cart with line item changes
    this.classList.add('loading');
    let lineKey = input.getAttribute('data-key');
    let quantity = parseInt(input.value);

    if (lineKey && quantity >= 0) {
      const body = JSON.stringify({
        id: lineKey,
        quantity: quantity,
        sections: 'minicart-js'
      });

      fetch('/cart/change.json', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'xmlhttprequest'
        },
        ...{ 
          body
        }})
      .then((response) => {
        return response.text();
      }).then((text) => {
        let sectionHtml = JSON.parse(text).sections['minicart-js']
        this.renderMinicart(sectionHtml)
      }).catch((e) => {
        console.error(e);
      });
    } else {
      this.classList.remove('loading');
      console.error('No line item details');
    }
  }

  //section rendering for minicart
  renderMinicart(html){
    this.classList.add('loading');

    if (html) {
      //insert cart items
      this.querySelector('.mini-cart-items-js').innerHTML = html;

      //add event listeners
      this.addListeners()

      //update cart count
      this.updateCount()

      //update total
      this.updateTotal()

      //update elements
      this.updateElements()

      //remove loading icon
      this.classList.remove('loading');
    } else {
      fetch('/?section_id=minicart-js')
      .then((response) => {
        return response.text();
      })
      .then((response) => {
        //insert cart items
        this.querySelector('.mini-cart-items-js').innerHTML = response;

        //add event listeners
        this.addListeners()

        //update cart count
        this.updateCount()

        //update total
        this.updateTotal()

        //update elements
        this.updateElements()

        //remove loading icon
        this.classList.remove('loading');
      })
    }

  }

  handleMinicartTrigger(){
    // renders minicart on toggle
    this.renderMinicart()
    const event = new Event('mini-cart-toggle');
    document.getElementById('mini-cart').dispatchEvent(event);
  }

  addListeners(){
    //get form elements and add event listeners
    this.minicartForm = this.querySelector('form');
    this.quantityInputs = this.minicartForm.querySelectorAll('.mini-cart-quantity-js');
    this.quantityInputs.forEach(input => input.addEventListener('change', this.handleInputChange.bind(this, input)));
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

  updateTotal(){
    //updates cart total
    let totalElements = document.querySelectorAll('.mini-cart-total-js');
    let cartTotal = document.getElementById('cart-total-hidden');

    if (totalElements && cartTotal) {
      totalElements.forEach(el => {
        el.innerHTML = cartTotal.innerHTML;
      })
    }
  }

  updateElements(){
    //hide and show elements depending on cart items
    let hideWhenCartEmpty = document.querySelectorAll('.hide-mini-cart-empty-js');
    let itemCount = parseFloat(document.getElementById('cart-item-count-hidden').querySelector('.mini-cart-item-count-js').innerHTML);

    if (hideWhenCartEmpty && itemCount >= 0) {
      hideWhenCartEmpty.forEach(el => {
        if (itemCount > 0) {
          el.classList.remove('hidden');
        } else {
          el.classList.add('hidden');
        }
      })
    }
  }

}

customElements.define('mini-cart', Minicart);

class MinicartRemoveButton extends HTMLElement {
  constructor() {
    super();

    this.miniCartForm = this.closest("form#mini-cart");
    this.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.miniCartForm.classList.add('loading');
      const qty = this.parentElement.querySelector('quantity-input input');
      qty.value = 0;
      const event = new Event('change');
      qty.dispatchEvent(event);
    });

  }
}

customElements.define('mini-cart-remove', MinicartRemoveButton);   