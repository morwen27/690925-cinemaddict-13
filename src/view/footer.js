import {FILMS_IN_LIST_TOTAL} from '../constants.js';
import AbstractView from '../abstract.js';

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

export default class Footer extends AbstractView {
  getTemplate() {
    return createFooterTemplate();
  }
}
