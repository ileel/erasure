'use strict'

const obtainChunck = ( idVal, content ) => {
  let cont = ''
  if ( content.hasOwnProperty( 'blocks' ) ) {
    Array.from( content.blocks ).map( item => {
      if ( item.id === idVal ) cont = item
    } )
  }
  return cont ? cont : 'id not found ' + idVal
}

const isValid = ( storedChuncks, changedChunck ) => {
  //just one change
  //not more than 60 changes per day TODO
}

module.exports.obtainChunck = obtainChunck
module.exports.isValid = isValid
