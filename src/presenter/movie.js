import FilmCardView from '../view/film-card.js';
import Popup from '../view/popup.js';
import {render, renderPosition, remove, replace} from '../utils/render.js';

const popupClassName = `.film-details`;

export default class Movie {
  constructor(container, changeData) {
    this._filmComponentContainer = container;
    this._updateFilmComponent = changeData;

    this._filmComponent = null;
    this._popup = null;

    this._handleCreatePopup = this._handleCreatePopup.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleToWatchlistClick = this._handleToWatchlistClick.bind(this);
    this._handleAlreadyWatchedClick = this._handleAlreadyWatchedClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;

    this._filmComponent = new FilmCardView(film);

    this._filmComponent.setOpenPopupClickHandler(this._handleCreatePopup);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmComponent.setToWatchlistClickHandler(this._handleToWatchlistClick);
    this._filmComponent.setAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);

    if (prevFilmComponent === null) {
      render(this._filmComponentContainer, this._filmComponent, renderPosition.BEFOREEND);
      return;
    }

    replace(this._filmComponent, prevFilmComponent);
    remove(prevFilmComponent);

    if (this._popup !== null) {
      remove(this._popup);
      this._handleCreatePopup(film);
    }
  }

  destroy() {
    remove(this._filmComponent);
  }

  _listenersForPopup(popup) {
    popup.setFavoriteClickHandler(this._handleFavoriteClick);
    popup.setToWatchlistClickHandler(this._handleToWatchlistClick);
    popup.setAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);

    const closePopup = () => {
      remove(popup);
      document.body.classList.remove(`hide-overflow`);
      this._popup = null;
    };

    popup.setClosePopupClickHandler(closePopup);

    const closePopupEscHandler = (evt) => {
      evt.preventDefault();

      if (evt.key === `Escape` || evt.key === `Esc`) {
        closePopup();
        document.removeEventListener(`keydown`, closePopupEscHandler);
      }
    };

    document.addEventListener(`keydown`, closePopupEscHandler);
  }

  _handleCreatePopup(film) {
    if (document.querySelector(popupClassName)) {
      document.querySelector(popupClassName).remove();
    }

    this._popup = new Popup(film);
    this._listenersForPopup(this._popup);

    render(document.body, this._popup, renderPosition.BEFOREEND);
    document.body.classList.add(`hide-overflow`);
  }

  _handleFavoriteClick(film) {
    this._updateFilmComponent(Object.assign({}, film, {isFavorite: !film.isFavorite}));
  }

  _handleToWatchlistClick(film) {
    this._updateFilmComponent(Object.assign({}, film, {isInWatchList: !film.isInWatchList}));
  }

  _handleAlreadyWatchedClick(film) {
    this._updateFilmComponent(Object.assign({}, film, {isAlreadyWatched: !film.isAlreadyWatched}));
  }
}
