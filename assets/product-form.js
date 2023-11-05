class ProductForm extends HTMLElement {
  constructor() {
    super();

    this.form = this.querySelector('form');
    this.form.querySelector('[name=id]').disabled = false;
    this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
  }

  onSubmitHandler(evt) {
    evt.preventDefault();
    const submitButton = this.querySelector('[type="submit"]');
    if (submitButton.classList.contains('loading')) return;

    this.handleErrorMessage();

    submitButton.setAttribute('aria-disabled', true);
    submitButton.classList.add('loading');    
    submitButton.disabled = true;

    const config = fetchConfig('javascript');
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    delete config.headers['Content-Type'];

    const formData = new FormData(this.form);
    config.body = formData;

    fetch('cart/add.js', config)
    .then((response) => response.json())
    .then((response) => {
      if (response.status) {
        this.handleErrorMessage(response.description);
        return;
      }
    })
    .catch((e) => {
      console.error(e);
    })
    .finally(() => {
      submitButton.classList.remove('loading');
      submitButton.removeAttribute('aria-disabled');
      submitButton.disabled = false;
      document.querySelector('side-drawer').classList.add('active');

      const event = new Event('mini-cart-open');
      document.dispatchEvent(event);
    });

    function fetchConfig(type = 'json') {
      return {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': `application/${type}` }
      };
    }
  }

  handleErrorMessage(errorMessage = false) {
    this.errorMessageWrapper = this.errorMessageWrapper || this.querySelector('.product-form-error-message-wrapper');
    this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form-error-message');

    this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

    if (errorMessage) {
      this.errorMessage.textContent = errorMessage;
    }
  }
};

customElements.define('product-form', ProductForm);