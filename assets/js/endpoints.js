export const endpoints = {
   consumersForId(consumerId, tokenForEngine) {
      let endpoint = {
         type: "GET",
         url: `https://api-hmg.bonuz.com/consumers/${consumerId}/`,
         headers: {
            Authorization: tokenForEngine,
            contentType: "application/json",
         },
      };
      return endpoint;
   },
   consumersForPhoneNumber(phoneNumber, tokenForEngine) {
      let endpoint = {
         type: "GET",
         url: `https://api-hmg.bonuz.com/consumers/?search=55${phoneNumber}`,
         headers: {
            Authorization: tokenForEngine,
            contentType: "application/json",
         },
      };
      return endpoint;
   },
   consumersForCpf(cpf, tokenForEngine) {
      let endpoint = {
         type: "GET",
         url: `https://api-hmg.bonuz.com/consumers/?cpf=${cpf}`,
         headers: {
            Authorization: tokenForEngine,
            contentType: "application/json",
         },
      };
      return endpoint;
   },
   profilesForId(consumerId, tokenForEngine) {
      let endpoint = {
         type: "GET",
         url: `https://api-hmg.bonuz.com/profiles?consumerId=${consumerId}`,
         headers: {
            Authorization: tokenForEngine,
            contentType: "application/json",
         },
      };
      return endpoint;
   },
   profilesForCpf(cpf, tokenForEngine) {
      let endpoint = {
         type: "GET",
         url: `https://api-hmg.bonuz.com/profiles?cpf=${cpf}`,
         headers: {
            Authorization: tokenForEngine,
            contentType: "application/json",
         },
      };
      return endpoint;
   },
   transactionsForId(consumerId, chosenPortal, tokenForEngine) {
      let endpoint = {
         type: "GET",
         url: `https://api-hmg.bonuz.com/consumers/${consumerId}/portals/${chosenPortal}/transactions?limit=10`,
         headers: {
            Authorization: tokenForEngine,
            contentType: "application/json",
         },
      };
      return endpoint;
   },
   notificationsForPhoneNumber(phoneNumber, chosenPortal, tokenForEngine) {
      let endpoint = {
         type: "GET",
         url: `https://api-hmg.bonuz.com/consumers/55${phoneNumber}/profiles/${chosenPortal}/notifications`,
         headers: {
            Authorization: tokenForEngine,
            contentType: "application/json",
         },
      };
      return endpoint;
   },
   couponsForId(consumerId, tokenForCoupon) {
      let endpoint = {
         type: "GET",
         url: `https://api-hmg.bonuz.com/bonuz-coupons/coupons?consumerId=${consumerId}`,
         headers: {
            Authorization: tokenForCoupon,
            contentType: "application/json",
         },
      };
      return endpoint;
   },
};
