'use strict';

const uuid = require('uuid');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.export.create = (event, context, callback) => {
    const data = JSON.parse(event.body);
    if(typeof data.text !== "string") {
        console.error("A Validação Falhou");
        callback (null, {
            statusCode: 400,
            headers: {'Content-Type': 'text/plain'},
            body: 'não foi possivel criar o item de serviço '
        });
        return;
    }


const params = {
    TableName: process.env.SERVICE_TABLE,
    item: {
        id: uuid.v1(),
        NomeServico: data.text,
        DescricaoServico: data.text,
        EspecificacoesDoServico: {},
    },
};

dynamoDb.put(params, (error) => {
    if (error) {
        console.error(error);
        callback(null, {
            statusCode: error.statusCode || 501,
            headers: {'Conte-Type': 'text/plain'},
            body: 'Não foi possivel criar o item de serviço'
        });
        return;
    }
        
        const response = {
            statusCode: 200,
            body: JSON.stringify(params.item),
        };
        callback(null, response);
    });
};









//  module.exports.hello = (event, context, callback) => {
//    const response = {
//      statusCode: 200,
//      body: JSON.stringify({
//        message: 'Função executada com sucesso!!',
//        input: event,
//      }),
//    };

//    callback(null, response);

//  };


// const AWS = require('aws-sdk');
// const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
// const uuid = require('uuid/v4');

// const postsTable = process.env.;

// function response(statusCode, message) {
//   return {
//     statusCode: statusCode,
//     body: JSON.stringify(message)
//   };
// }
// function sortByDate(a, b) {
//   if (a.createdAt > b.createdAt) {
//     return -1;
//   } else return 1;
// }
// // criando o post
// module.exports.createPost = (event, context, callback) => {
//   const reqBody = JSON.parse(event.body);

//   if (
//     !reqBody.title ||
//     reqBody.title.trim() === '' ||
//     !reqBody.body ||
//     reqBody.body.trim() === ''
//   ) {
//     return callback(
//       null,
//       response(400, {
//         error: 'É preciso ter um título e um corpo,não pode estar vazio'
//       })
//     );
//   }

//   const post = {
//     id: uuid(),
//     createdAt: new Date().toISOString(),
//     userId: 1,
//     title: reqBody.title,
//     body: reqBody.body
//   };

//   return db
//     .put({
//       TableName: postsTable,
//       Item: post
//     })
//     .promise()
//     .then(() => {
//       callback(null, response(201, post));
//     })
//     .catch((err) => response(null, response(err.statusCode, err)));
// };
// // Listar
// module.exports.getAllPosts = (event, context, callback) => {
//   return db
//     .scan({
//       TableName: postsTable
//     })
//     .promise()
//     .then((res) => {
//       callback(null, response(200, res.Items.sort(sortByDate)));
//     })
//     .catch((err) => callback(null, response(err.statusCode, err)));
// };

// // Retornar o numero de posts
// module.exports.getPosts = (event, context, callback) => {
//   const numberOfPosts = event.pathParameters.number;
//   const params = {
//     TableName: postsTable,
//     Limit: numberOfPosts
//   };
//   return db
//     .scan(params)
//     .promise()
//     .then((res) => {
//       callback(null, response(200, res.Items.sort(sortByDate)));
//     })
//     .catch((err) => callback(null, response(err.statusCode, err)));
// };
// // buscar por ID 
// module.exports.getPost = (event, context, callback) => {
//   const id = event.pathParameters.id;

//   const params = {
//     Key: {
//       id: id
//     },
//     TableName: postsTable
//   };

//   return db
//     .get(params)
//     .promise()
//     .then((res) => {
//       if (res.Item) callback(null, response(200, res.Item));
//       else callback(null, response(404, { error: 'Nada encontrado' }));
//     })
//     .catch((err) => callback(null, response(err.statusCode, err)));
// };
// // Atualizar
// module.exports.updatePost = (event, context, callback) => {
//   const id = event.pathParameters.id;
//   const reqBody = JSON.parse(event.body);
//   const { body, title } = reqBody;

//   const params = {
//     Key: {
//       id: id
//     },
//     TableName: postsTable,
//     ConditionExpression: 'attribute_exists(id)',
//     UpdateExpression: 'SET title = :title, body = :body',
//     ExpressionAttributeValues: {
//       ':title': title,
//       ':body': body
//     },
//     ReturnValues: 'ALL_NEW'
//   };
//   console.log('Atualizando');

//   return db
//     .update(params)
//     .promise()
//     .then((res) => {
//       console.log(res);
//       callback(null, response(200, res.Attributes));
//     })
//     .catch((err) => callback(null, response(err.statusCode, err)));
// };
// // Delete
// module.exports.deletePost = (event, context, callback) => {
//   const id = event.pathParameters.id;
//   const params = {
//     Key: {
//       id: id
//     },
//     TableName: postsTable
//   };
//   return db
//     .delete(params)
//     .promise()
//     .then(() =>
//       callback(null, response(200, { message: 'Deletado com sucesso' }))
//     )
//     .catch((err) => callback(null, response(err.statusCode, err)));
