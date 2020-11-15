// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var Message_pb = require('./Message_pb.js');

function serialize_helloworld_SlackMessageReply(arg) {
  if (!(arg instanceof Message_pb.SlackMessageReply)) {
    throw new Error('Expected argument of type helloworld.SlackMessageReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_helloworld_SlackMessageReply(buffer_arg) {
  return Message_pb.SlackMessageReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_helloworld_SlackMessageRequest(arg) {
  if (!(arg instanceof Message_pb.SlackMessageRequest)) {
    throw new Error('Expected argument of type helloworld.SlackMessageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_helloworld_SlackMessageRequest(buffer_arg) {
  return Message_pb.SlackMessageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var MessengerService = exports.MessengerService = {
  sendSlackMessage: {
    path: '/helloworld.Messenger/SendSlackMessage',
    requestStream: false,
    responseStream: false,
    requestType: Message_pb.SlackMessageRequest,
    responseType: Message_pb.SlackMessageReply,
    requestSerialize: serialize_helloworld_SlackMessageRequest,
    requestDeserialize: deserialize_helloworld_SlackMessageRequest,
    responseSerialize: serialize_helloworld_SlackMessageReply,
    responseDeserialize: deserialize_helloworld_SlackMessageReply,
  },
};

exports.MessengerClient = grpc.makeGenericClientConstructor(MessengerService);
