import {createElement} from '../utilites.js';
import {FILMS_IN_LIST_TOTAL} from '../main.js';

export const createFooterTemplate = () => {
  let totalFilmsQuantity = 432262;

  if (FILMS_IN_LIST_TOTAL === 0) {
    totalFilmsQuantity = 0;
  }

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
