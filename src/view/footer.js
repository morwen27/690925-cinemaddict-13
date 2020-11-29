import {createElement} from '../utilites.js';

export const createFooterTemplate = () => {
  const totalFilmsQuantity = 432262;

  return `<footer class="footer">
  <section class="footer__logo logo logo--smaller">Cinemaddict</section>
  <section class="footer__statistics">
    ${totalFilmsQuantity}
  </section>
</footer>`;
};

export default class Footer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFooterTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
