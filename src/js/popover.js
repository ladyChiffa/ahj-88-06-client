import '../css/popover.css';

export default class Popover {
    constructor() {
      this._element = document.createElement('div');
      this._element.classList.add('popover');
      this._open = false;
    }

    togglePopover(title, message, element) {
        if(!this._open) {
          this._element.innerHTML = `<div class='popover__title'>${title}</div><div class='popover__body'>${message}</div>`;
          
          document.body.appendChild(this._element);
          const eRec = element.getBoundingClientRect();
          this._element.style.top = eRec.top - this._element.offsetHeight + 'px';
          this._element.style.left = eRec.left + element.offsetWidth / 2 - this._element.offsetWidth / 2 + 'px';
        }
        else {
          this._element.remove();
        }
        this._open = !this._open;
    }
}
