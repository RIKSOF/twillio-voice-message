'use strict';

/**
 * @author Copyright RIKSOF (Private) Limited.
 *
 * @file Module for working with Twilio voice message service.
 */
const BAD_REQUEST = 400;

/**
 * Helper class for working with Twilio to send voice messages.
 *
 * @class [VoiceMessage Object]
 *
 */
class VoiceMessage {

  /**
   * Constructor creating twilio client object.
   *
   * @constructor
   *
   * @param {string} accountSid                       The account's secret identifier.
   * @param {string} authToken                        The authentication token.
   *
   * @class [VoiceMessage Object]
   */
  constructor( accountSid, authToken ) {
    this.twilioClient = require( 'twilio' )( accountSid, authToken );
  }

  /**
   * Sends a voice message to the given identifier.
   *
   * @param {Object} data                               Data to be send.
   *
   * @returns {Promise} p
   */
  send( data ) {
    // Initialize error as empty.
    let error = null;

    // Validate the param from constains value.
    if ( !data.from ) error = new Error( 'Please provide sender phone number' );

    // Validate the param to constains value.
    if ( !data.to ) error = new Error( 'Please provide recipient phone numbers' );

    // Validate the param message constains value.
    if ( !data.message ) error = new Error( 'Please provide message for a twilio call' );

    // Throw Validation error if exist.
    if ( error ) {
      error.status = BAD_REQUEST;
      return Promise.reject( error );
    }

    return this.twilioClient.calls.create({
      to: data.to,
      from: data.from,
      url: data.message
    });
  }
}

// Make the module available to all
module.exports = VoiceMessage;
