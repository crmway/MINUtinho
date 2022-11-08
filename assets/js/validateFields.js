import { throwErrorMessage } from "./throwErrorMessage.js";
import { btnNewSearchExists } from "./btnNewSearchExists.js";
import { elements } from "./elements.js";
import { renderBtnNewSearch } from "./renderBtnNewSearch.js";

export function validateFields(elementPhoneNumber, elementCpf, elementConsumerId) {
   window.localStorage.setItem("inputMemoryObject", JSON.stringify({ phoneNumber: elementPhoneNumber.value, cpf: elementCpf.value, consumerId: elementConsumerId.value }));

   // window.localStorage.clear();
   const inputValidationList = { phoneNumberValidation: 0, cpfValidation: 0, consumerIdValidation: 0 };
   let notEmptyInputFieldsCounter = 0;
   if (Boolean(elementPhoneNumber.value) == true) notEmptyInputFieldsCounter++;
   if (Boolean(elementCpf.value) == true) notEmptyInputFieldsCounter++;
   if (Boolean(elementConsumerId.value) == true) notEmptyInputFieldsCounter++;
   // console.log(typeof notEmptyInputFieldsCounter);
   window.localStorage.setItem("notEmptyInputFieldsCounter", notEmptyInputFieldsCounter);

   if (notEmptyInputFieldsCounter > 1) {
      // console.log(Boolean(notEmptyInputFieldsCounter > 1));
      // window.localStorage.clear();

      client
         .invoke("instances.create", {
            location: "modal",
            url: "assets/modals/error-inputDuplicate.html",
         })
         .then(function (modalContext) {
            var modalClient = client.instance(modalContext["instances.create"][0].instanceGuid);
            modalClient.on("modal.close", function () {});
         });
   }
   if (notEmptyInputFieldsCounter == 0) {
      window.localStorage.clear();
      client
         .invoke("instances.create", {
            location: "modal",
            url: "assets/modals/main-inputEmpty.html",
         })
         .then(function (modalContext) {
            var modalClient = client.instance(modalContext["instances.create"][0].instanceGuid);
            modalClient.on("modal.close", function () {});
         });
   } else {
      if (Boolean(elementPhoneNumber.value) == true && notEmptyInputFieldsCounter == 1) {
         let phoneNumber = elementPhoneNumber.value;
         phoneNumber = phoneNumber.replace(/\D+/g, "");
         window.localStorage.setItem("inputMemoryForRequest", JSON.stringify({ field: "phonenumber", fieldValue: phoneNumber, validate: false }));
         let regex = /([0-9]{11})$/;
         if (Boolean(regex.test(phoneNumber)) == true) {
            window.localStorage.setItem("inputMemoryForRequest", JSON.stringify({ field: "phonenumber", fieldValue: phoneNumber, validate: true }));
            // console.log(window.localStorage.getItem("inputMemory"));
         } else {
            btnNewSearchExists();
            elements.messageFeedback.style.display = "block";
            renderBtnNewSearch(elements.messageFeedback, "afterend");
            elements.inputForm.style.display = "none";
            throwErrorMessage.phoneNumberInvalid();
         }
      }
      if (Boolean(elementCpf.value) == true && notEmptyInputFieldsCounter == 1) {
         let cpf = elementCpf.value;
         cpf = cpf.replace(/[^0-9]/g, "");
         window.localStorage.setItem("inputMemoryForRequest", JSON.stringify({ field: "cpf", fieldValue: cpf, validate: false }));
         let regex = /([0-9]{11})$/;
         if (Boolean(regex.test(cpf)) == true) {
            window.localStorage.setItem("inputMemoryForRequest", JSON.stringify({ field: "cpf", fieldValue: cpf, validate: true }));
            // console.log(window.localStorage.getItem("inputMemory"));
         } else {
            btnNewSearchExists();
            elements.messageFeedback.style.display = "block";
            renderBtnNewSearch(elements.messageFeedback, "afterend");
            elements.inputForm.style.display = "none";
            throwErrorMessage.cpfInvalid();
         }
      }
      if (Boolean(elementConsumerId.value) == true && notEmptyInputFieldsCounter == 1) {
         let consumerId = elementConsumerId.value;
         window.localStorage.setItem("inputMemoryForRequest", JSON.stringify({ field: "consumerid", fieldValue: consumerId, validate: false }));
         let regex = /([A-Za-z0-9]{32})$/;
         if (Boolean(regex.test(consumerId)) == true) {
            window.localStorage.setItem("inputMemoryForRequest", JSON.stringify({ field: "consumerid", fieldValue: consumerId, validate: true }));
            // console.log(window.localStorage.getItem("inputMemory"));
         } else {
            btnNewSearchExists();
            elements.messageFeedback.style.display = "block";
            renderBtnNewSearch(elements.messageFeedback, "afterend");
            elements.inputForm.style.display = "none";
            throwErrorMessage.consumerIdInvalid();
         }
      }
   }
   if (notEmptyInputFieldsCounter != 0 && notEmptyInputFieldsCounter < 2) {
      return window.localStorage.getItem("inputMemoryForRequest");
   }
}
