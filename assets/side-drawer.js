class SideDrawer extends HTMLElement {
  constructor() {
    super();

    const thisElement = this;

    //Toggle event listeners
    this.addEventListener('drawer-toggle', function(){
      if (this.classList.contains('active')) {
        thisElement.close(this);
      } else {
        thisElement.open(this);
      }
    })

  }

  //Open drawer
  open(drawer) {
    this.classList.add('active');
    // document.body.classList.add('shadow');
    this.addEventListener('transitionend', () => {
      drawer.focus();
    }, { once: true });

    document.body.addEventListener('click', this.onBodyClick, {passive: true});
  }

  //Close drawer
  close() {
    this.classList.remove('active');

    document.body.removeEventListener('click', this.onBodyClick, {passive: true});
  }
  
}

customElements.define('side-drawer', SideDrawer);