export const endpoints = {
   consumersForId(consumerId) {
      let endpoint = {
         type: "GET",
         url: `https://api-hmg.bonuz.com/consumers/${consumerId}/`,
         headers: {
            Authorization: "Bearer 7rpcZp2jiaXhFmZxY4kvetoB0086A5W567",
            contentType: "application/json",
         },
      };
      return endpoint;
   },
   consumersForPhoneNumber(phoneNumber) {
      let endpoint = {
         type: "GET",
         url: `https://api-hmg.bonuz.com/consumers/?search=55${phoneNumber}`,
         headers: {
            Authorization: "Bearer 7rpcZp2jiaXhFmZxY4kvetoB0086A5W567",
            contentType: "application/json",
         },
      };
      return endpoint;
   },
   consumersForCpf(cpf) {
      let endpoint = {
         type: "GET",
         url: `https://api-hmg.bonuz.com/consumers/?cpf=${cpf}`,
         headers: {
            Authorization: "Bearer 7rpcZp2jiaXhFmZxY4kvetoB0086A5W567",
            contentType: "application/json",
         },
      };
      return endpoint;
   },
   profilesForId(consumerId) {
      let endpoint = {
         type: "GET",
         url: `https://api-hmg.bonuz.com/profiles?consumerId=${consumerId}`,
         headers: {
            Authorization: "bearer dGl0aS1lLXdlc2xleS1zbmlwZXM=",
            contentType: "application/json",
         },
      };
      return endpoint;
   },
   profilesForCpf(cpf) {
      let endpoint = {
         type: "GET",
         url: `https://api-hmg.bonuz.com/profiles?cpf=${cpf}`,
         headers: {
            Authorization: "bearer dGl0aS1lLXdlc2xleS1zbmlwZXM=",
            contentType: "application/json",
         },
      };
      return endpoint;
   },
   transactionsForId(consumerId, chosenPortal) {
      let endpoint = {
         type: "GET",
         url: `https://api-hmg.bonuz.com/consumers/${consumerId}/portals/${chosenPortal}/transactions?limit=10`,
         headers: {
            Authorization: "Bearer 7rpcZp2jiaXhFmZxY4kvetoB0086A5W567",
            contentType: "application/json",
         },
      };
      return endpoint;
   },
   notificationsForPhoneNumber(phoneNumber, chosenPortal) {
      let endpoint = {
         type: "GET",
         url: `https://api-hmg.bonuz.com/consumers/55${phoneNumber}/profiles/${chosenPortal}/notifications`,
         headers: {
            Authorization: "Bearer 7rpcZp2jiaXhFmZxY4kvetoB0086A5W567",
            contentType: "application/json",
         },
      };
      return endpoint;
   },
   couponsForId(consumerId) {
      let endpoint = {
         type: "GET",
         url: `https://api-hmg.bonuz.com/bonuz-coupons/coupons?consumerId=${consumerId}`,
         headers: {
            Authorization: "bearer TvqSXOMXDEebdLpnYcL2HPhGeCN672dHIiotw628ce5b411c93",
            contentType: "application/json",
         },
      };
      return endpoint;
   },
};
