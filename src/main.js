import Profile from './view/profile.js';
import SiteMenu from './view/menu.js';
import Statistic from './view/stats.js';
import Footer from './view/footer.js';
import NoFilmsMessage from './view/no-films.js';

import {generateRank} from './mock/profile.js';
import {generateFilter} from './mock/filter.js';
import {films} from './mock/generatedDatas.js';

import {render, renderPosition} from './utils/render.js';

import MovieList from "./presenter/movielist.js";

const header = document.querySelector(`header`);
const mainContainer = document.querySelector(`.main`);

const profileComponent = new Profile(generateRank());
const siteMenuComponent = new SiteMenu(generateFilter());
const statisticComponent = new Statistic(generateFilter(), generateRank());

const footerComponent = new Footer();

const filmListPresenter = new MovieList(mainContainer);

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
