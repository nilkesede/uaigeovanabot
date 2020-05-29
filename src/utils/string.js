const findWord = (word, string) =>
  String(string)
    .toLowerCase()
    .replace(',', '')
    .replace('.', '')
    .replace(':', '')
    .split(' ')
    .includes(word)

const findFirstWord = (word, string) =>
  String(string).split(' ', 1).shift() === word

const findSomeWord = (words, string) =>
  words.some(word => findWord(word, string))

const findSomeFirstWord = (words, string) =>
  words.some(word => findFirstWord(word, string))

module.exports = {
  findWord,
  findFirstWord,
  findSomeWord,
  findSomeFirstWord
}
