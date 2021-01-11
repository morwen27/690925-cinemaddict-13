import AbstractView from '../abstract.js';
import {SortType} from '../constants.js';

export const createSortTemplate = (currentSortType) => {

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item ${currentSortType === SortType.DEFAULT ? `main-navigation__item--active` : ``}" data-sort-type="${SortType.DEFAULT}">All movies</a>
      <a href="#watchlist" class="main-navigation__item ${currentSortType === SortType.WATCHLIST ? `main-navigation__item--active` : ``}" data-sort-type="${SortType.WATCHLIST}">Watchlist <span class="main-navigation__item-count"></span></a>
      <a href="#history" class="main-navigation__item ${currentSortType === SortType.HISTORY ? `main-navigation__item--active` : ``}" data-sort-type="${SortType.HISTORY}">History <span class="main-navigation__item-count"></span></a>
      <a href="#favorites" class="main-navigation__item ${currentSortType === SortType.FAVORITE ? `main-navigation__item--active` : ``}" data-sort-type="${SortType.FAVORITE}">Favorites <span class="main-navigation__item-count"></span></a>
    </div>
    <a href="#stats" class="main-navigation__additional main-navigation__additional--active">Stats</a>
  </nav>`;
};

export default class SortView extends AbstractView {
  constructor(currentSortType) {
    super();

    this._currentSortType = currentSortType;

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;

    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}

