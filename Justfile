compile:
	grpc_tools_node_protoc \
		--proto_path=proto \
		--js_out=import_style=commonjs,binary:./src/gen \
		--grpc_out=grpc_js:./src/gen \
		proto/Message.proto
