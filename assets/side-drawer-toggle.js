class SideDrawerToggle extends HTMLElement {
  constructor() {
    super();

    this.addEventListener('click', function(evt){
      evt.preventDefault();
      
      let drawer = document.getElementById(this.getAttribute('data-drawer'));
      
      //Toggle drawer event
      const event = new Event('drawer-toggle');
      drawer.dispatchEvent(event);
     
      const event2 = new Event('mini-cart-open');
      drawer.dispatchEvent(event2);
      
    })
  }
}

customElements.define('side-drawer-toggle', SideDrawerToggle);
