import { masks } from "./js/masks.js";
import { throwErrorMessage } from "./js/throwErrorMessage.js";
import { validateFields } from "./js/validateFields.js";
import { autoFillInputFiels } from "./js/autoFillInputFiels.js";
import { elements } from "./js/elements.js";
import { renderPortals } from "./js/render-portals.js";
import { renderBtnNewSearch } from "./js/renderBtnNewSearch.js";
import { btnNewSearchExists } from "./js/btnNewSearchExists.js";

elements.inputCpf.addEventListener("input", () => masks.maskCpf(elements.inputCpf, ""));
elements.inputPhoneNumber.addEventListener("input", () => masks.maskPhoneNumber("input-html", elements.inputPhoneNumber));

elements.btnInitialSearch.addEventListener("click", () => {
   const inputValidationObject = JSON.parse(validateFields(elements.inputPhoneNumber, elements.inputCpf, elements.inputConsumerId));
   // console.log(inputValidsationObject);

   if (inputValidationObject.field == "phonenumber" && inputValidationObject.validate == true) renderPortals(inputValidationObject.fieldValue, inputValidationObject.field);
   if (inputValidationObject.field == "cpf" && inputValidationObject.validate == true) renderPortals(inputValidationObject.fieldValue, inputValidationObject.field);
   if (inputValidationObject.field == "consumerid" && inputValidationObject.validate == true) renderPortals(inputValidationObject.fieldValue, inputValidationObject.field);
});
autoFillInputFiels();

// let lastEntryMemory = JSON.parse(window.localStorage.getItem("inputMemory"));
// console.log(lastEntryMemory);

elements.menuTab.forEach((tabmenu) => {
   tabmenu.addEventListener("click", (e) => {
      if (e.target.dataset.js == "main-profile") {
         document.getElementById("main-profile").style.display = "flex";
         document.getElementById("main-extract").style.display = "none";
         elements.mainNotificationsContainer.style.display = "none";
      }
      if (e.target.dataset.js == "main-extract") {
         document.getElementById("main-profile").style.display = "none";
         document.getElementById("main-extract").style.display = "flex";
         elements.mainNotificationsContainer.style.display = "none";
      }
      if (e.target.dataset.js == "notifications-container") {
         document.getElementById("main-profile").style.display = "none";
         document.getElementById("main-extract").style.display = "none";
         elements.mainNotificationsContainer.style.display = "flex";
      }
   });
});

// for (let i = 0; i < elements.menuTab.length; i++) {
//    elements.menuTab[i].addEventListener("click", (e) => {
//       if (e.target.dataset.js == "main-profile") {
//          document.getElementById("main-profile").style.display = "flex";
//          document.getElementById("main-extract").style.display = "none";
//          elements.mainNotificationsContainer.style.display = "none";
//       }
//       if (e.target.dataset.js == "main-extract") {
//          document.getElementById("main-profile").style.display = "none";
//          document.getElementById("main-extract").style.display = "flex";
//          elements.mainNotificationsContainer.style.display = "none";
//       }
//       if (e.target.dataset.js == "notifications-container") {
//          document.getElementById("main-profile").style.display = "none";
//          document.getElementById("main-extract").style.display = "none";
//          elements.mainNotificationsContainer.style.display = "flex";
//       }
//    });

// window.localStorage.setItem("inputMemory", JSON.stringify({ field: "cpf", fieldValue: cpf }));
//
// if (window.localStorage.getItem("phone")) {
//    window.onload = elements.inputPhoneNumber.value = window.localStorage.getItem("phone");
// }
// if (window.localStorage.getItem("consumerId")) {
//    let consumerParse = JSON.parse(window.localStorage.getItem("consumerId"));
//    window.onload = elements.inputConsumerId.value = consumerParse.fieldValue;
// }
// if (window.localStorage.getItem("cpf")) {
//    window.onload = elements.inputCpf.value = window.localStorage.getItem("cpf");
// }
// }
