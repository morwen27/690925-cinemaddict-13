import {FILMS_PER_STEP} from '../constants.js';
import {TOP_RATED_FILMS} from '../constants.js';
import {MOST_COMMENTED_FILMS} from '../constants.js';

import FilmListView from '../view/film-list.js';
import ShowMoreButtonView from '../view/show-more-button.js';

import Movie from './movie.js';

import {updateItem} from "../utils/common.js";
import {render, renderPosition, remove} from '../utils/render.js';

export default class MovieList {
  constructor(container) {
    this._mainContainer = container;

    this._renderedFilmsCount = FILMS_PER_STEP;

    this._allFilms = {};
    this._topRatedFilms = {};
    this._mostCommentedFilms = {};

    this._filmListComponent = new FilmListView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleFilmComponentChange = this._handleFilmComponentChange.bind(this);
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

  _renderFilm(film, container, list) {
    const filmPresenter = new Movie(container, this._handleFilmComponentChange);
    filmPresenter.init(film);

    list[film.id] = filmPresenter;
  }

  _renderFilms(data, from, to, container, list) {
    data
      .slice(from, to)
      .forEach((film) => this._renderFilm(film, container, list));
  }

  _renderShowMoreButton() {
    render(this._filmListContainer, this._showMoreButtonComponent, renderPosition.AFTEREND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmList() {
    this._renderFilms(this._films, 0, Math.min(this._films.length, FILMS_PER_STEP), this._filmListContainer, this._allFilms);

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
    this._renderFilms(sortRatingFilm, 0, TOP_RATED_FILMS, this._topRatedContainer, this._topRatedFilms);
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
    this._renderFilms(sortCommentedFilm, 0, MOST_COMMENTED_FILMS, this._mostCommentedContainer, this._mostCommentedFilms);
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

  _handleShowMoreButtonClick() {
    this._renderFilms(this._films, this._renderedFilmsCount, this._renderedFilmsCount + FILMS_PER_STEP, this._filmListContainer);
    this._renderedFilmsCount += FILMS_PER_STEP;

    if (this._renderedFilmsCount >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _handleFilmComponentChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);

    if (updatedFilm.id in this._allFilms) {
      this._allFilms[updatedFilm.id].init(updatedFilm);
    }

    if (updatedFilm.id in this._topRatedFilms) {
      this._topRatedFilms[updatedFilm.id].init(updatedFilm);
    }

    if (updatedFilm.id in this._mostCommentedFilms) {
      this._mostCommentedFilms[updatedFilm.id].init(updatedFilm);
    }

  }
}


