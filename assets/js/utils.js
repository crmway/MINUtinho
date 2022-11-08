export function capitalize(texto) {
   return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export function convertDate(inputDate) {
   var array = new Date(inputDate),
      dia = array.getDate().toString(),
      diaF = dia.length == 1 ? "0" + dia : dia,
      mes = (array.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
      mesF = mes.length == 1 ? "0" + mes : mes,
      anoF = array.getFullYear(),
      hora = array.getUTCHours().toString(),
      minuto = array.getUTCMinutes().toString(),
      minutoF = minuto.length < 2 ? "0" + minuto : minuto;
   return diaF + "/" + mesF + "/" + anoF + " " + hora + ":" + minutoF;
}

export function duplicateRemover(array) {
   return [...new Set(array)];
}

export function searchObject(obj, searchParameter) {
   if (!searchParameter) return obj;
   let searchResult = [];
   for (const key in obj) {
      if (Object.values(obj[key]).includes(searchParameter)) {
         searchResult[key] = obj[key];
      }
   }
   return searchResult;
}

export function toBrazilianCurrency(value) {
   return value.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}

export function amountProfile(obj) {
   function flatten(obj) {
      const final = {};
      const queue = [[" ", obj]];

      while (queue.length) {
         const [baseKey, currentObj] = queue.pop();

         for (const [key, val] of Object.entries(currentObj)) {
            const givenKey = !baseKey ? key : baseKey + capitalize(key);

            if (isObject(val)) {
               queue.push([givenKey, val]);
            } else {
               final[givenKey] = val;
            }
         }
      }
      return final;
   }

   function capitalize(str) {
      return str[0].toUpperCase() + str.slice(1);
   }

   function isObject(val) {
      return typeof val === "object" && val !== null;
   }

   let flattened = JSON.stringify(flatten(obj));

   function profileConverterData(str) {
      function toDate(str) {
         const date = new Date(str);
         return date.toLocaleString("pt-BR");
      }

      function formatDate(str) {
         return str.replace(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/g, toDate);
      }
      flattened = formatDate(str);
      return flattened;
   }
   flattened = profileConverterData(flattened);
   flattened = flattened.replace(/[{}]/g, "");
   flattened = flattened.replace(/" 0/g, '"');
   flattened = flattened.replace(/",|,"/g, '"@@');
   flattened = flattened.replace(/"/g, "");
   flattened = flattened.replace(/-/g, " ");
   flattened = flattened.replace("_id", "Id ");
   flattened = flattened.replace("Keys0", "Chave 1");
   flattened = flattened.replace("Keys1", "Chave 2");
   flattened = flattened.replace("Keys2", "Chave 3");
   flattened = flattened.replace("Keys3", "Chave 4");
   flattened = flattened.replace("Keys4", "Chave 5");
   flattened = flattened.replace("Keys5", "Chave 6");
   flattened = flattened.replace("Keys6", "Chave 7");
   flattened = flattened.replace("Keys7", "Chave 8");
   flattened = flattened.replace("Keys8", "Chave 9");
   flattened = flattened.replace("Keys9", "Chave 10");
   flattened = flattened.replace("Created", "Criado  em");
   flattened = flattened.replace("portal", "Portal");
   flattened = flattened.replace("Experience", "Experiência");
   // flattened = flattened.replace("Cpf", "CPF ");
   flattened = flattened.replace("ConsumerId", "Consumer Id");
   flattened = flattened.replace("Mobile", "Telefone");
   flattened = flattened.replace("StatusName", "Status(nome)");
   flattened = flattened.replace("StatusTimestamp", "Status(timestamp)");
   flattened = flattened.replace("LastUpdated", "Última  atualização");
   flattened = flattened.replace("ContractNumber", "Número  do contrato BB");
   flattened = flattened.split("@@");
   flattened = flattened.map((item) => item.replace(":", "##"));

   let flattenedArray = [];
   for (let i = 0; i < flattened.length; i++) {
      flattened[i].replace(/:/, "##");

      let line = flattened[i].split("##");

      let key = line[0];
      // key = key.replace(/[A-Z]/g, "$&");
      key = key.replace(/[A-Z]./g, " $&");
      key = key.replace(" ", "");

      let value = line[1];
      value = value.replace(true, "true");
      value = value.replace(false, "falso");
      value = value.replace(undefined, "undefined");

      flattenedArray.push([key, value]);
   }
   return flattenedArray;
}
