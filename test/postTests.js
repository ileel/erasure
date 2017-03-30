// index.test.js
'use strict'

let chai = require( 'chai' );
let expect = chai.expect;

let testJson = require( './input.json' )
let result = 'doop'

let process = require( '../server/process' )

describe( ' erasure processing tests ', function () {

  it( 'successfully finds the chunck id in the file', function () {
    const content = process.obtainChunck(3, testJson )
    return expect( content ).to.eql( result )
  } )


} )