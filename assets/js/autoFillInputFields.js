import { elements } from "./elements.js";
export function autoFillInputFields() {
   let inputMemoryObject = JSON.parse(window.localStorage.getItem("inputMemoryObject"));

   // console.log(inputMemoryObject);
   if (Boolean(inputMemoryObject.phoneNumber) == true) {
      elements.inputPhoneNumber.value = inputMemoryObject.phoneNumber;
   }
   if (Boolean(inputMemoryObject.cpf) == true) {
      elements.inputCpf.value = inputMemoryObject.cpf;
   }
   if (Boolean(inputMemoryObject.consumerId) == true) {
      elements.inputConsumerId.value = inputMemoryObject.consumerId;
   }
}
