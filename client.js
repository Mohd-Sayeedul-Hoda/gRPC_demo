const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync('todo.proto', {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const text = process.argv[2];
const client = new todoPackage.Todo('localhost:40000', grpc.credentials.createInsecure());

client.createTodo(
	{
		id: -1,
		text: text,
	},
	(err, response) => {
		console.log('received from server' + JSON.stringify(response));
	}
);

client.readTodos({}, (err, response) => {
	console.log('received from readTodos' + JSON.stringify(response));
});
