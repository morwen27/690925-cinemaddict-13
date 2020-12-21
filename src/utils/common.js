export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const generateRandomValue = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};

export const generateRandomArray = (array, maxIndex) => {
  const lengthArray = getRandomInteger(1, maxIndex);
  let randomArray = [];

  for (let i = 0; i < lengthArray; i++) {
    randomArray.push(generateRandomValue(array));
  }

  return randomArray;
};

export const generateStringFromArray = (array, separator) => {
  let stringValue = ``;

  if (array.length > 1) {
    stringValue = array.join(separator);
  }

  return stringValue;
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};
