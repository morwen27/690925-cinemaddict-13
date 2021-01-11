import Profile from './view/profile.js';
import Footer from './view/footer.js';

import {generateRank} from './mock/profile.js';
import {films} from './mock/generatedDatas.js';

import {render, renderPosition} from './utils/render.js';

import MovieList from "./presenter/movielist.js";

import FilmsModel from "./model/films.js";

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const header = document.querySelector(`header`);
const mainContainer = document.querySelector(`.main`);

const profileComponent = new Profile(generateRank());
const footerComponent = new Footer();

const filmListPresenter = new MovieList(mainContainer, filmsModel);

render(header, profileComponent, renderPosition.BEFOREEND);


render(mainContainer, footerComponent, renderPosition.AFTEREND);

filmListPresenter.init();
