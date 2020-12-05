import {genres} from './film-card.js';
import {getRandomInteger, generateRandomValue} from '../utils/common.js';

export const generateFilter = () => {
  const watchedFilms = getRandomInteger(0, 100);
  const favoritesFilms = watchedFilms - getRandomInteger(0, watchedFilms);

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
