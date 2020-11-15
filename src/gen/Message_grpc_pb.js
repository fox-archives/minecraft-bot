// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var Message_pb = require('./Message_pb.js');

function serialize_helloworld_HelloReply(arg) {
  if (!(arg instanceof Message_pb.HelloReply)) {
    throw new Error('Expected argument of type helloworld.HelloReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_helloworld_HelloReply(buffer_arg) {
  return Message_pb.HelloReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_helloworld_HelloRequest(arg) {
  if (!(arg instanceof Message_pb.HelloRequest)) {
    throw new Error('Expected argument of type helloworld.HelloRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_helloworld_HelloRequest(buffer_arg) {
  return Message_pb.HelloRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var MessengerService = exports.MessengerService = {
  // Sends a greeting
sendMessage: {
    path: '/helloworld.Messenger/SendMessage',
    requestStream: false,
    responseStream: false,
    requestType: Message_pb.HelloRequest,
    responseType: Message_pb.HelloReply,
    requestSerialize: serialize_helloworld_HelloRequest,
    requestDeserialize: deserialize_helloworld_HelloRequest,
    responseSerialize: serialize_helloworld_HelloReply,
    responseDeserialize: deserialize_helloworld_HelloReply,
  },
};

exports.MessengerClient = grpc.makeGenericClientConstructor(MessengerService);
