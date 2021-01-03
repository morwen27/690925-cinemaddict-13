import AbstractView from '../abstract.js';

export const createFilmCardTemplate = (film) => {
  let {rating, year, filmDuration, genre, poster, description, comments, title, isFavorite, isInWatchList, isAlreadyWatched} = film;

  description = (description.length >= 140) ?
    description.substring(0, 139) + `(...)`
    : description;

  let filmDurationMinutes = filmDuration % 60;
  let filmDurationHours = (filmDuration - filmDurationMinutes) / 60;
  let filmDurationFormated = filmDurationHours + `h ` + filmDurationMinutes + `m`;

  const markFavorite = isFavorite ? `film-card__controls-item--active` : ``;
  const markInWatchList = isInWatchList ? `film-card__controls-item--active` : ``;
  const markAlreadyWatched = isAlreadyWatched ? `film-card__controls-item--active` : ``;

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${filmDurationFormated}</span>
      <span class="film-card__genre">${genre[0]}</span>
    </p>
    <img src=${poster} alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${comments} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button ${markInWatchList} film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button ${markAlreadyWatched} film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item ${markFavorite} button film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._openPopupClickHandler = this._openPopupClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._toWatchlistClickHandler = this._toWatchlistClickHandler.bind(this);
    this._alreadyWatchedClickHandler = this._alreadyWatchedClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _openPopupClickHandler(evt) {
    evt.preventDefault();
    this._callback.createPopupClick(this._film);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick(this._film);
  }

  _toWatchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.toWatchlistClick(this._film);
  }

  _alreadyWatchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.alreadyWatchedClick(this._film);
  }

  setOpenPopupClickHandler(callback) {
    this._callback.createPopupClick = callback;

    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._openPopupClickHandler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._openPopupClickHandler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._openPopupClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;

    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setToWatchlistClickHandler(callback) {
    this._callback.toWatchlistClick = callback;

    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._toWatchlistClickHandler);
  }

  setAlreadyWatchedClickHandler(callback) {
    this._callback.alreadyWatchedClick = callback;

    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._alreadyWatchedClickHandler);
  }
}
