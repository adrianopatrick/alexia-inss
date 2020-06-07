const https = require('https');

exports.get = async (req, res, next) => {
  console.log('vai chamar');
  const response = await httpGet(req.params.cep);
  console.log(JSON.stringify(response));
  // res.status(200).send(`Encontrei a ${response[0].nome}, ela fica localizada na ${response[0].enderecoAps}, ela está aberta de ${response[0].horarioAtendimento}`);
  res.status(200).send(`${response.value.joke}`);
}

function httpGet(cep) {
  return new Promise(((resolve, reject) => {
    var options = {
      host: 'api.icndb.com',
        port: 443,
        path: '/jokes/random',
        method: 'GET',
    };
    
    const request = https.request(options, (response) => {

      response.setEncoding('utf8');
      let returnData = '';

      response.on('data', (chunk) => {
        returnData += chunk;
      });

      response.on('end', () => {
        resolve(JSON.parse(returnData));
      });

      response.on('error', (error) => {
        reject(error);
      });
    });
    request.end();
  }));
}