import {FILMS_IN_LIST_TOTAL} from '../src/constants.js';
import {MAX_QUANTITY_COMMENTS} from '../src/constants.js';

import Profile from './view/profile.js';
import SiteMenu from './view/menu.js';
import Statistic from './view/stats.js';
import Footer from './view/footer.js';
import NoFilmsMessage from './view/no-films.js';

import {generateComment} from './mock/comments.js';
import {generateFilmCard} from './mock/film-card.js';
import {generateRank} from './mock/profile.js';
import {generateFilter} from './mock/filter.js';

import {render, renderPosition} from './utils/render.js';

import MovieList from "./presenter/movielist.js";

const films = new Array(FILMS_IN_LIST_TOTAL).fill().map(generateFilmCard);
const comments = new Array(MAX_QUANTITY_COMMENTS).fill().map(generateComment);

const header = document.querySelector(`header`);
const mainContainer = document.querySelector(`.main`);

const profileComponent = new Profile(generateRank());
const siteMenuComponent = new SiteMenu(generateFilter());
const statisticComponent = new Statistic(generateFilter(), generateRank());

const footerComponent = new Footer();

const filmListPresenter = new MovieList(mainContainer, comments);

render(header, profileComponent, renderPosition.BEFOREEND);
render(mainContainer, siteMenuComponent, renderPosition.AFTERBEGIN);

if (films.length !== 0) {
  render(siteMenuComponent, statisticComponent, renderPosition.AFTEREND);
} else {
  render(siteMenuComponent, new NoFilmsMessage(), renderPosition.AFTEREND);
}

render(mainContainer, footerComponent, renderPosition.AFTEREND);


if (films.length !== 0) {
  filmListPresenter.init(films);
}
