'use strict'

const obtainChunck = ( idVal, content ) => {
  let cont = ''
  if ( content.hasOwnProperty( 'elements' ) ) {
    Array.from( content.elements ).map( item => {
      if ( item.id === idVal ) cont = item
    } )
  }
  return cont ? cont : 'id not found ' + idVal
}

module.exports.obtainChunck = obtainChunck
