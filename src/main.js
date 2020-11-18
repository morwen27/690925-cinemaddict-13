import {user} from './view/user.js';
import {menu} from './view/menu.js';
import {filmListSection} from './view/film.js';
import {film} from './view/film.js';
import {showMoreButton} from './view/show-more-button.js';
import {popup} from './view/popup.js';

const FILMS_IN_LIST = 5;
const TOP_RATED_FILMS = 2;
const MOST_COMMENTED_FILMS = 2;

const render = (container, template, place) => {
    container.insertAdjacentHTML(place, template);
}

const header = document.querySelector('header');
const mainContainer = document.querySelector('.main');
const documentBody = document.querySelector('body');


render(header, user(), 'beforeend');
render(mainContainer, menu(), 'afterbegin');
render(mainContainer, filmListSection(), 'beforeend');


const filmListContainer = document.querySelector('.films-list > .films-list__container');
const topRatedContainer = document.querySelector('.films-list + .films-list--extra .films-list__container');
const mostCommentedContainer = document.querySelector('.films-list--extra + .films-list--extra .films-list__container'); 


for (let i = 0; i < FILMS_IN_LIST; i++) {
    render(filmListContainer, film(), 'afterbegin');
}

for (let i = 0; i < TOP_RATED_FILMS; i++) {
    render(topRatedContainer, film(), 'beforeend');
}

for (let i = 0; i < MOST_COMMENTED_FILMS; i++) {
    render(mostCommentedContainer, film(), 'beforeend');
}

render(filmListContainer, showMoreButton(), 'afterend');
render(documentBody, popup(), 'beforeend');