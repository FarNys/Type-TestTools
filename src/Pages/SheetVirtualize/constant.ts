export const ARROW_KEYS = [37, 38, 39, 40];

const createAlphabetList = () => {
  let emptyList = [];
  for (let i = 48; i < 91; i++) {
    emptyList.push(i);
  }
  return emptyList;
};
export let ALPHABET_KEYS = createAlphabetList();
