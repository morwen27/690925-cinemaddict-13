import {FILMS_PER_STEP} from '../constants.js';
import {TOP_RATED_FILMS} from '../constants.js';
import {MOST_COMMENTED_FILMS} from '../constants.js';

import FilmListView from '../view/film-list.js';
import FilmCardView from '../view/film-card.js';
import ShowMoreButtonView from '../view/show-more-button.js';

import Popup from '../view/popup.js';
import Comment from '../view/comment.js';

import {render, renderPosition, remove, replace} from '../utils/render.js';
import {updateItem} from "../utils/common.js";
import FilmCard from '../view/film-card.js';


export default class MovieList {
  constructor(container, comments) {
    this._mainContainer = container;
    this.commentsData = comments;

    this.renderedFilms = FILMS_PER_STEP;

    this._allFilms = {};

    this._filmListComponent = new FilmListView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._popup = null;

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleCreatePopup = this._handleCreatePopup.bind(this);
    this._handleFilmComponentChange = this._handleFilmComponentChange.bind(this);

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleToWatchlistClick = this._handleToWatchlistClick.bind(this);
    this._handleAlreadyWatchedClick = this._handleAlreadyWatchedClick.bind(this);
  }

  init(films) {
    this._films = films.slice();

    render(this._mainContainer, this._filmListComponent, renderPosition.BEFOREEND);

    this._filmListContainer = this._mainContainer.querySelector(`.films-list > .films-list__container`);
    this._topRatedContainer = this._mainContainer.querySelector(`.films-list + .films-list--extra .films-list__container`);
    this._mostCommentedContainer = this._mainContainer.querySelector(`.films-list--extra + .films-list--extra .films-list__container`);

    this._renderFilmList();
    this._renderTopRated();
    this._renderMostCommented();
  }

  _renderFilm(film, container) {
    this._filmCardComponent = new FilmCardView(film);
    this._addListenersForComponent(this._filmCardComponent);

    this._allFilms[film.id] = this._filmCardComponent;

    render(container, this._filmCardComponent, renderPosition.BEFOREEND);
  }

  _renderFilms(data, from, to, container) {
    data
      .slice(from, to)
      .forEach((film) => this._renderFilm(film, container));
  }

  _renderShowMoreButton() {
    render(this._filmListContainer, this._showMoreButtonComponent, renderPosition.AFTEREND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmList() {
    this._renderFilms(this._films, 0, Math.min(this._films.length, FILMS_PER_STEP), this._filmListContainer);

    if (this._films.length > FILMS_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderTopRated() {
    const sortRatingFilm = this._films
    .slice()
    .sort((a, b) => {
      if (a.rating > b.rating) {
        return -1;
      }
      if (a.rating < b.rating) {
        return 1;
      }
      return 0;
    }
    );
    this._renderFilms(sortRatingFilm, 0, TOP_RATED_FILMS, this._topRatedContainer);
  }

  _renderMostCommented() {
    const sortCommentedFilm = this._films
    .slice()
    .sort((a, b) => {
      if (a.comments > b.comments) {
        return -1;
      }
      if (a.comments < b.comments) {
        return 1;
      }
      return 0;
    }
    );
    this._renderFilms(sortCommentedFilm, 0, MOST_COMMENTED_FILMS, this._mostCommentedContainer);
  }

  _addListenersForComponent(film) {
    film.setOpenPopupClickHandler(this._handleCreatePopup);
    film.setFavoriteClickHandler(this._handleFavoriteClick);
    film.setToWatchlistClickHandler(this._handleToWatchlistClick);
    film.setAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);
  }

  _listenersForPopup(popup) {
    popup.setFavoriteClickHandler(this._handleFavoriteClick);
    popup.setToWatchlistClickHandler(this._handleToWatchlistClick);
    popup.setAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);

    const closePopup = () => {
      remove(popup);
      this._popup = null;
      document.body.classList.remove(`hide-overflow`);
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

  _destroyComponent() {
    remove(this._filmCardComponent);
  }

  _clearFilmList() {
    Object
      .values(this._allFilms)
      .forEach((component) => component._destroyComponent());

    this._allFilms = {};
    this.renderedFilms = FILMS_PER_STEP;
    remove(this._showMoreButtonComponent);
  }

  _updateFilmComponent(film) {
    const updatedFilm = new FilmCard(film);
    this._addListenersForComponent(updatedFilm);

    replace(updatedFilm, this._allFilms[film.id]);
    remove(this._allFilms[film.id]);

    if (this._popup !== null) {
      remove(this._popup);
      this._handleCreatePopup(film);
    }

    this._allFilms[film.id] = updatedFilm;
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._films, this.renderedFilms, this.renderedFilms + FILMS_PER_STEP, this._filmListContainer);
    this.renderedFilms += FILMS_PER_STEP;

    if (this.renderedFilms >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _handleCreatePopup(film) {
    if (this._popup !== null) {
      remove(this._popup);
    }

    this._popup = new Popup(film);

    render(this._mainContainer.parentElement, this._popup, renderPosition.BEFOREEND);
    document.body.classList.add(`hide-overflow`);

    const commentList = this._popup.getElement().querySelector(`.film-details__comments-list`);

    for (let i = 0; i < film.comments; i++) {
      render(commentList, new Comment(this.commentsData[i]), renderPosition.BEFOREEND);
    }

    this._listenersForPopup(this._popup);
  }

  _handleFilmComponentChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._updateFilmComponent(updatedFilm);
  }

  _handleFavoriteClick(film) {
    this._handleFilmComponentChange(Object.assign({}, film, {isFavorite: !film.isFavorite}));
  }

  _handleToWatchlistClick(film) {
    this._handleFilmComponentChange(Object.assign({}, film, {isInWatchList: !film.isInWatchList}));
  }

  _handleAlreadyWatchedClick(film) {
    this._handleFilmComponentChange(Object.assign({}, film, {isAlreadyWatched: !film.isAlreadyWatched}));
  }
}

