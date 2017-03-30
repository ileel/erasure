// index.test.js
'use strict'

let chai = require( 'chai' );
let expect = chai.expect;

let testJson = require( './input.json' )
let result = ''

let process = require( '../server/process' )

describe( 'redshift processing tests ', function () {

  it( 'successfully finds the chunck id in the fule', function () {
    const content = process.obtainChunck( testJson )
    return expect( content ).to.eql( result )
  } )


} )