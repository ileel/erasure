let fs = require('fs');
//run it: $ node word_count.js

const readWordList = (file) => {
  let list = fs.readFileSync(file)
  return JSON.parse(list)
}

const _sortIt = (result) => {
  let sortable = [];
  for ( let word in result )
    sortable.push([ word, result[ word ] ])
  sortable.sort(
    function (a, b) {
      return a[ 1 ] - b[ 1 ]
    }
  )
  return sortable
}

const _countWords = (longString, accumulator) => {
  let arrayWords = longString.toLowerCase().match(/\w+/g)
  arrayWords.forEach((word) => {
    accumulator[ word ] = word in accumulator ? accumulator[ word ] + 1 : 1;
  })
  return accumulator;
}

const _walk = (obj, accumulator) => {
  Object.keys(obj)
    .forEach((key) => {
      if ( typeof obj[ key ] === 'object' ) {
        _walk(obj[ key ], accumulator)
      } else if ( typeof obj[ key ] === 'string' ) {
        accumulator = _countWords(obj[ key ], accumulator)
      }
    })
  return accumulator
}

const countAllWords = (list) => {
  let worldCountResult = {};
  worldCountResult = _walk(list, worldCountResult)
  return _sortIt(worldCountResult)
}

const wordList = readWordList('text.json')
const data = countAllWords(wordList)
for (let i = 0, len = data.length; i < len; i++) {
  console.log(data[i]);
}

