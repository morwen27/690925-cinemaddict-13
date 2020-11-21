import { profile } from './view/profile.js';
import { menu } from './view/menu.js';
import { filmList } from './view/film-list.js';
import { filmCard } from './view/film-card.js';
import { showMoreButton } from './view/show-more-button.js';
import { popup } from './view/popup.js';

const FILMS_IN_LIST = 5;
const TOP_RATED_FILMS = 2;
const MOST_COMMENTED_FILMS = 2;

const render = (container, template, place) => {
    container.insertAdjacentHTML(place, template);
}

const header = document.querySelector('header');
const mainContainer = document.querySelector('.main');
const documentBody = document.querySelector('body');


render(header, profile(), 'beforeend');
render(mainContainer, menu(), 'afterbegin');
render(mainContainer, filmList(), 'beforeend');


const filmListContainer = document.querySelector('.films-list > .films-list__container');
const topRatedContainer = document.querySelector('.films-list + .films-list--extra .films-list__container');
const mostCommentedContainer = document.querySelector('.films-list--extra + .films-list--extra .films-list__container');


for (let i = 0; i < FILMS_IN_LIST; i++) {
    render(filmListContainer, filmCard(), 'afterbegin');
}

for (let i = 0; i < TOP_RATED_FILMS; i++) {
    render(topRatedContainer, filmCard(), 'beforeend');
}

for (let i = 0; i < MOST_COMMENTED_FILMS; i++) {
    render(mostCommentedContainer, filmCard(), 'beforeend');
}

render(filmListContainer, showMoreButton(), 'afterend');
render(documentBody, popup(), 'beforeend');
