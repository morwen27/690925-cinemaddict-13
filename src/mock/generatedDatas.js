import {FILMS_IN_LIST_TOTAL} from '../constants.js';
import {MAX_QUANTITY_COMMENTS} from '../constants.js';

import {generateComment} from './comments.js';
import {generateFilmCard} from './film-card.js';

export const films = new Array(FILMS_IN_LIST_TOTAL).fill().map(generateFilmCard);
export const comments = new Array(MAX_QUANTITY_COMMENTS).fill().map(generateComment);
