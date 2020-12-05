import AbstractView from '../abstract.js';

export const createFilmCardTemplate = (film) => {
  let {rating, year, duration, genre, poster, description, comments, title} = film;

  description = (description.length >= 140) ?
    description.substring(0, 139) + `(...)`
    : description;


  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genre[0]}</span>
    </p>
    <img src=${poster} alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${comments} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._createPopupClickHandler = this._createPopupClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _createPopupClickHandler(evt) {
    evt.preventDefault();
    this._callback.createPopupClick(this._film);
  }

  setCreatePopupClickHandler(callback) {
    this._callback.createPopupClick = callback;

    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._createPopupClickHandler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._createPopupClickHandler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._createPopupClickHandler);
  }
}
