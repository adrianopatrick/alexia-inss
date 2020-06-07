const https = require('https')

exports.get = async (req, res, next) => {
  console.log('vai chamar');
  const response = await httpGet(req.params.cep);
  res.status(200).send(`Encontrei a ${response[0].nome}, ela fica localizada na ${response[0].enderecoAps}, ela está aberta de ${response[0].horarioAtendimento}`);
}

function httpGet(cep) {
  return new Promise(((resolve, reject) => {
    var options = {
      host: 'vip-hmeuinssprxr.inss.gov.br',
      path: '/apis/localizadorApsServices/buscaCep/60822168',
      method: 'GET'
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