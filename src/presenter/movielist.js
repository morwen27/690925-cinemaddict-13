import {FILMS_PER_STEP, TOP_RATED_FILMS, MOST_COMMENTED_FILMS} from '../constants.js';
import {SortType, UserAction, UpdateType} from '../constants.js';

import SortView from '../view/sort.js';
import FilmListView from '../view/film-list.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import Statistic from '../view/stats.js';
import NoFilmsMessage from '../view/no-films.js';

import Movie from './movie.js';

import {render, renderPosition, remove} from '../utils/render.js';

export default class MovieList {
  constructor(container, filmsModel) {
    this._mainContainer = container;
    this._filmsModel = filmsModel;

    this._renderedFilmsCount = FILMS_PER_STEP;

    this._allFilms = {};
    this._topRatedFilms = {};
    this._mostCommentedFilms = {};

    this._filmListComponent = new FilmListView();
    this._showMoreButtonComponent = null;
    this._sortComponent = null;
    this._statisticComponent = new Statistic();
    this._NoFilmsMessageComponent = new NoFilmsMessage();

    this._currentSortType = SortType.DEFAULT;

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderSortComponent();

    if (this._getFilms().length) {
      render(this._mainContainer, this._filmListComponent, renderPosition.BEFOREEND);

      this._filmListContainer = this._mainContainer.querySelector(`.films-list > .films-list__container`);
      this._topRatedContainer = this._mainContainer.querySelector(`.films-list + .films-list--extra .films-list__container`);
      this._mostCommentedContainer = this._mainContainer.querySelector(`.films-list--extra + .films-list--extra .films-list__container`);

      this._renderFilmList();
      this._renderTopRated();
      this._renderMostCommented();
    } else {
      this._renderNoFilmMessage();
    }
  }

  _renderFilm(film, container, list) {
    const filmPresenter = new Movie(container, this._handleViewAction);
    filmPresenter.init(film);

    list[film.id] = filmPresenter;
  }

  _renderFilms(data, container, list) {
    data.forEach((film) => this._renderFilm(film, container, list));
  }

  _renderSortComponent() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._mainContainer, this._sortComponent, renderPosition.AFTERBEGIN);
  }

  _renderStatistic() {
    render(this._mainContainer, this._statisticComponent, renderPosition.BEFOREEND);
  }

  _renderNoFilmMessage() {
    render(this._mainContainer, this._NoFilmsMessageComponent, renderPosition.BEFOREEND);
  }

  _renderShowMoreButton() {
    render(this._filmListContainer, this._showMoreButtonComponent, renderPosition.AFTEREND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmList() {
    // const filmCount = this._getFilms().length;
    // const films = this._getFilms().slice(0, Math.min(filmCount, FILMS_PER_STEP));

    // this._renderFilms(films, this._filmListContainer, this._allFilms);

    // if (filmCount > FILMS_PER_STEP) {
    //   this._renderShowMoreButton();
    // }

    const films = this._getFilms();
    const filmCount = films.length;

    if (filmCount === 0) {
      this._renderNoFilmMessage();
      return;
    }

    this._renderFilms(films.slice(0, Math.min(filmCount, this._renderedFilmCount)), this._filmListContainer, this._allFilms);

    if (filmCount > this._renderedFilmCount) {
      this._renderShowMoreButton();
    }

  }

  _renderTopRated() {
    const sortRatingFilm = this._getFilms()
      .slice()
      .sort((a, b) => {
        return b.rating - a.rating;
      }
      )
      .slice(0, TOP_RATED_FILMS);
    this._renderFilms(sortRatingFilm, this._topRatedContainer, this._topRatedFilms);
  }

  _renderMostCommented() {
    const sortCommentedFilm = this._getFilms()
      .slice()
      .sort((a, b) => {
        return b.comments - a.comments;
      }
      )
      .slice(0, MOST_COMMENTED_FILMS);
    this._renderFilms(sortCommentedFilm, this._mostCommentedContainer, this._mostCommentedFilms);
  }

  // _clearFilmList() {
  //   Object
  //     .values(this._allFilms)
  //     .forEach((presenter) => presenter.destroy());

  //   this._allFilms = {};
  //   this._renderedFilmsCount = FILMS_PER_STEP;
  //   remove(this._showMoreButtonComponent);
  // }

  _getFilms() {
    switch (this._currentSortType) {
      case SortType.WATCHLIST:
        return this._filmsModel.getFilms().filter((film) => film.isInWatchList);
      case SortType.HISTORY:
        return this._filmsModel.getFilms().filter((film) => film.isAlreadyWatched);
      case SortType.FAVORITE:
        return this._filmsModel.getFilms().filter((film) => film.isFavorite);
    }

    return this._filmsModel.getFilms();
  }

  _handleShowMoreButtonClick() {
    const filmsCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmsCount, this._renderedFilmsCount + FILMS_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmsCount, newRenderedFilmCount);

    this._renderFilms(films, this._filmListContainer, this._allFilms);
    this._renderedFilmsCount = newRenderedFilmCount;

    if (this._renderedFilmsCount >= filmsCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  // _handleFilmComponentChange(updatedFilm) {
  //   // Здесь будем вызывать обновление модели
  //   // this._films = updateItem(this._films, updatedFilm);

  //   if (updatedFilm.id in this._allFilms) {
  //     this._allFilms[updatedFilm.id].init(updatedFilm);
  //   }

  //   if (updatedFilm.id in this._topRatedFilms) {
  //     this._topRatedFilms[updatedFilm.id].init(updatedFilm);
  //   }

  //   if (updatedFilm.id in this._mostCommentedFilms) {
  //     this._mostCommentedFilms[updatedFilm.id].init(updatedFilm);
  //   }

  // }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearFilmList({resetRenderedFilmCount: true});
    this._renderFilmList();
  }

  _handleViewAction(actionType, updateType, update) {
    console.log(actionType, updateType, update);

    switch (actionType) {
      case UserAction.ADD_TO_FILTER_LIST:
        this._filmsModel.updateFilm(updateType, update);
        break;
    }// добавить действия по добавлению или удалению комментариев
  }

  _handleModelEvent(updateType, data) {
    console.log(updateType, data);

    switch (updateType) {
      case UpdateType.PATCH:
        this._allFilms[data.id].init(data);
        break;
      case UpdateType.MINOR:
        // this._allFilms[data.id].init(data);
        break;
      case UpdateType.MAJOR:
        // this._allFilms[data.id].init(data);
    }
  }

  _clearFilmList({resetRenderedFilmCount = false, resetTypeSort = false} = {}) {
    const filmCount = this._getFilms().length;

    Object
      .values(this._allFilms)
      .forEach((presenter) => presenter.destroy());
    this._allFilms = {};

    remove(this._sortComponent);
    remove(this._NoFilmsMessageComponent);
    remove(this._showMoreButtonComponent);

    if (resetRenderedFilmCount) {
      this._renderedFilmsCount = FILMS_PER_STEP;
    } else {
      this._renderedFilmCount = Math.min(filmCount, this._renderedFilmCount);
    }

    if (resetTypeSort) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

}


