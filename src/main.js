import {FILMS_IN_LIST_TOTAL} from '../src/constants.js';

import {render, renderPosition} from './utilites.js';

import Profile from './view/profile.js';
import SiteMenu from './view/menu.js';
import Statistic from './view/stats.js';
import FilmList from './view/film-list.js';
import FilmCard from './view/film-card.js';
import Comment from './view/comment.js';
import ShowMoreButton from './view/show-more-button.js';
import Footer from './view/footer.js';
import Popup from './view/popup.js';
import NoFilmsMessage from './view/no-films.js';

import {generateComment} from './mock/comments.js';
import {generateFilmCard} from './mock/film-card.js';
import {generateRank} from './mock/profile.js';
import {generateFilter} from './mock/filter.js';

const FILMS_PER_STEP = 5;

const TOP_RATED_FILMS = 2;
const MOST_COMMENTED_FILMS = 2;

const MAX_QUANTITY_COMMENTS = 5;

const films = new Array(FILMS_IN_LIST_TOTAL).fill().map(generateFilmCard);
const comments = new Array(MAX_QUANTITY_COMMENTS).fill().map(generateComment);

const createPopup = (film) => {
  const popup = new Popup(film);
  render(footerComponent.getElement(), popup.getElement(), renderPosition.AFTEREND);
  document.body.classList.add(`hide-overflow`);

  const commentList = popup.getElement().querySelector(`.film-details__comments-list`);

  for (let i = 0; i < film.comments; i++) {
    render(commentList, new Comment(comments[i]).getElement(), renderPosition.BEFOREEND);
  }

  const closePopupButton = popup.getElement().querySelector(`.film-details__close-btn`);

  const closePopup = () => {
    popup.getElement().remove();
    popup.removeElement();
    document.body.classList.remove(`hide-overflow`);
  };

  const closePopupEscHandler = (evt) => {
    evt.preventDefault();

    if (evt.key === `Escape` || evt.key === `Esc`) {
      closePopup();
      document.removeEventListener(`keydown`, closePopupEscHandler);
    }
  };

  closePopupButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    closePopup();
  });

  document.addEventListener(`keydown`, closePopupEscHandler);
};

const hangEvents = (filmComponent, filmData) => {
  const poster = filmComponent.querySelector(`.film-card__poster`);
  const title = filmComponent.querySelector(`.film-card__title`);
  const commentsTitle = filmComponent.querySelector(`.film-card__comments`);

  poster.addEventListener(`click`, function () {
    createPopup(filmData);
  });
  title.addEventListener(`click`, function () {
    createPopup(filmData);
  });
  commentsTitle.addEventListener(`click`, function () {
    createPopup(filmData);
  });
};

const header = document.querySelector(`header`);
const mainContainer = document.querySelector(`.main`);

const profileComponent = new Profile(generateRank());
const siteMenuComponent = new SiteMenu(generateFilter());
const statisticComponent = new Statistic(generateFilter(), generateRank());
const filmListComponent = new FilmList();
const footerComponent = new Footer();

render(header, profileComponent.getElement(), renderPosition.BEFOREEND);
render(mainContainer, siteMenuComponent.getElement(), renderPosition.AFTERBEGIN);

if (films.length !== 0) {
  render(siteMenuComponent.getElement(), statisticComponent.getElement(), renderPosition.AFTEREND);
} else {
  render(siteMenuComponent.getElement(), new NoFilmsMessage().getElement(), renderPosition.AFTEREND);
}

render(mainContainer, filmListComponent.getElement(), renderPosition.BEFOREEND);
render(mainContainer, footerComponent.getElement(), renderPosition.AFTEREND);

const filmListContainer = filmListComponent.getElement().querySelector(`.films-list > .films-list__container`);
const topRatedContainer = filmListComponent.getElement().querySelector(`.films-list + .films-list--extra .films-list__container`);
const mostCommentedContainer = filmListComponent.getElement().querySelector(`.films-list--extra + .films-list--extra .films-list__container`);

for (let i = 0; i < Math.min(films.length, FILMS_PER_STEP); i++) {
  const film = new FilmCard(films[i]);
  render(filmListContainer, film.getElement(), renderPosition.BEFOREEND);
  hangEvents(film.getElement(), films[i]);
}

if (films.length > FILMS_PER_STEP) {
  const showMoreButton = new ShowMoreButton();
  render(filmListContainer, showMoreButton.getElement(), renderPosition.AFTEREND);

  let renderedFilms = FILMS_PER_STEP;

  showMoreButton.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();

    films
      .slice(renderedFilms, renderedFilms + FILMS_PER_STEP)
      .forEach((film) => {
        const newCard = new FilmCard(film);
        render(filmListContainer, newCard.getElement(), renderPosition.BEFOREEND);
        hangEvents(newCard.getElement(), film);
      });

    renderedFilms += FILMS_PER_STEP;

    if (renderedFilms >= films.length) {
      showMoreButton.getElement().remove();
      showMoreButton.removeElement();
    }
  });
}

for (let i = 0; i < TOP_RATED_FILMS; i++) {
  const film = new FilmCard(films[i]);
  render(topRatedContainer, film.getElement(), renderPosition.BEFOREEND);
  hangEvents(film.getElement(), films[i]);
}

for (let i = 0; i < MOST_COMMENTED_FILMS; i++) {
  const film = new FilmCard(films[i]);
  render(mostCommentedContainer, film.getElement(), renderPosition.BEFOREEND);
  hangEvents(film.getElement(), films[i]);
}
