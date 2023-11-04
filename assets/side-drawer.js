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

    //Key up and body click events
    this.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.close());
    this.onBodyClick = this.handleBodyClick.bind(this); 

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

  //Body click event to close drawer
  handleBodyClick(evt) {
    const target = evt.target;
    if (target !== this && !target.closest('side-drawer') && !target.closest('side-drawer-toggle')) {
      this.close();
    }
  }
  
}

customElements.define('side-drawer', SideDrawer);