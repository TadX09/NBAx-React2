import { config } from "./config";

const caller =  (
  url,
  method,
  headers = {},
  data = {},
  options = {},
  httpCall = global.fetch
) => {
  return new Promise((resolve, reject) => {
    httpCall(url, {
      ...options,
      method,
      headers,
      body: method === "GET" ? null : JSON.stringify(data),
      dataType: "json",
    })
      .then( (response) => {
        const respo =  response.json();
       
        if (!response.ok) {
          reject();
          //handleCallApiError(new Error(`${respo.message}`));
          console.log("Error: ", respo.message);
          return;
        }

        // Codigo para Recibir el error del APi en Base de Datos
        if (respo.hasOwnProperty("APIDBError")) {
          reject();
          // handleCallApiError(new Error(`${respo.APIDBError}`));
          return;
        }

        resolve(respo);
        //return ;
      })
      // .then((res) => {
      //   if (config.DebuggingMode) {
      //     console.log(`Url: ${url}, Response: `, res);
      //   }
      //   resolve(res);
      // })
      .catch((error) => {
        // handleCallApiError(error);
        console.log("Error: ", error);
      });
  });
};

const getDefaultHeader = () => {
  return {
    "Content-Type": "application/json",
  };
};

/**
 * Realiza una peticion a una URL especificada.
 *
 * @param {String} url Dirección donde se realizara la peticioón
 * @param {String} method Tipo de peticion a ejecutar (POST, GET, PUT, DELETE)
 * @param {JSON} [data={}] Objeto que se adjuntará al body de la petición
 * @returns {object}
 */
function callApi(
  url,
  method,
  data = {},
  headers = getDefaultHeader(),
  options = {},
  httpCall = global.fetch
) {
  method = method.toUpperCase();

  if (config.DebuggingMode) {
    console.log(`Url: ${url}`);
    console.log(`Headers: ${JSON.stringify(getDefaultHeader())}`);
  }

  return caller(url, method, getDefaultHeader(), data, options, httpCall);
}

function getTodayFormatDate(){
  let objectDate = new Date();
 
  let day = (objectDate.getDate() < 10)? "0"+objectDate.getDate():objectDate.getDate();
  let month = (objectDate.getMonth()+1 < 10)? "0"+String(objectDate.getMonth()+1):objectDate.getMonth()+1;
  let year = objectDate.getFullYear();
  //console.log(objectDate,day,month,year);
  let formatDate = `${year}-${month}-${day}`;

  return formatDate;
}

function getTodayFromDateObject(date){
  let objectDate = date;
 
  let day = (objectDate.getDate() < 10)? "0"+objectDate.getDate():objectDate.getDate();
  let month = (objectDate.getMonth()+1 < 10)? "0"+String(objectDate.getMonth()+1):objectDate.getMonth()+1;
  let year = objectDate.getFullYear();
  //console.log(objectDate,day,month,year);
  let formatDate = `${year}-${month}-${day}`;

  return formatDate;
}

function getTomorrow(){
  var ms = new Date().getTime() + 86400000;
  var tomorrow = new Date(ms);
  return getTodayFromDateObject(tomorrow);
}

export { callApi,getTodayFormatDate,getTodayFromDateObject,getTomorrow};
