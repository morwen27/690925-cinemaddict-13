import {FILMS_IN_LIST_TOTAL} from '../constants.js';
import {genres} from './film-card.js';
import {getRandomInteger, generateRandomValue} from '../utils/common.js';

export const generateFilter = () => {
  let watchedFilms = getRandomInteger(0, 100);
  let favoritesFilms = watchedFilms - getRandomInteger(0, watchedFilms);

  if (FILMS_IN_LIST_TOTAL === 0) {
    watchedFilms = 0;
    favoritesFilms = 0;
  }

  let totalDuration = null;
  for (let i = 0; i < watchedFilms; i++) {
    let averageFilmsDuration = getRandomInteger(90, 120);
    totalDuration += averageFilmsDuration;
  }

  const totalDurationHours = (totalDuration / 60).toFixed(0);
  const totalDurationMinutes = totalDuration % 60;

  return {
    watchlist: 0,
    history: watchedFilms,
    favorites: favoritesFilms,
    totalDurationHours,
    totalDurationMinutes,
    favoriteGenre: generateRandomValue(genres),
  };
};
