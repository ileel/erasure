'use strict'
console.log( '::: Loading function' )

const AWS = require( 'aws-sdk' )
// Check if environment supports native promises
if ( typeof Promise === 'undefined' ) {
  AWS.config.setPromisesDependency( require( 'bluebird' ) )
}
const S3 = new AWS.S3( { apiVersion: '2006-03-01' } )

const process = require( './process' )

exports.handler = ( event, context, callback ) => {
  const done = ( err, res ) => callback( null, {
    statusCode: err ? '400' : '200',
    body: err ? err.message : JSON.stringify( res ),
    headers: {
      'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
    },
  } )

  switch ( event.httpMethod ) {
    case 'GET':
      S3.getObject( { Bucket: 'oferasure', Key: 'text.json' } ).promise().then( ( data ) => {
        let theBody
        try {
          const DATA = data.Body.toString( 'utf-8' )
          theBody = JSON.parse( DATA )
          console.info( 'Content parsed' )
          done( null, theBody )
        } catch ( ex ) {
          done( new Error( 'Failed to parse json structure ' + ex ) )
        }
      } )
      break
    case 'POST':
      S3.getObject( { Bucket: 'oferasure', Key: 'text.json' } ).promise().then( ( data ) => {
        let theBody
        try {
          const DATA = data.Body.toString( 'utf-8' )
          theBody = JSON.parse( DATA )
          console.info( 'Content parsed' )
          const storedChuncks = ( process.obtainChunck( 2, theBody ))
          const changedChunck = { "content": "something" }
          if ( process.isValid( storedChuncks, changedChunck ) ) {
            //process.addId changes
            done( null, changedChunck )
          } else {
            done( new Error( 'Invalid request for chunk ', storedChuncks ) )
          }
        } catch ( ex ) {
          done( new Error( 'Failed to parse json structure ' + ex ) )
        }
      } )
      break
    default:
      done( new Error( 'Unsupported method ' + JSON.stringify( event ) ) )
  }
}