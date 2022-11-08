import { duplicateRemover } from "./utils.js";
import { throwErrorMessage } from "./throwErrorMessage.js";
import { endpoints } from "./endpoints.js";
import { elements } from "./elements.js";
import { renderProfile } from "./render-profile.js";
import { renderExtract } from "./render-extract.js";
import { renderNotifications } from "./render-notifications.js";
import { renderBtnNewSearch } from "./renderBtnNewSearch.js";
import { btnNewSearchExists } from "./btnNewSearchExists.js";
import { btnPortalsExists } from "./btnPortalsExists.js";

export async function renderPortals(input, inputType) {
   btnPortalsExists();
   btnNewSearchExists();
   // document.querySelector("#btn-portals").style.width = "45%";

   let consumerDataobject;
   // console.log(input);
   // console.log(inputType);
   elements.inputForm.style.display = "none";
   elements.portalContainer.style.display = "flex";

   const notEmptyInputFieldsCounter = window.localStorage.getItem("notEmptyInputFieldsCounter");
   // console.log(notEmptyInputFieldsCounter);

   let phoneNumber = "";
   let consumersData = "";
   let consumerId = "";
   // console.log(inputType);
   function renderPortalsContainers(consumersData) {
      const h1 = ` <h1> PORTAIS </h1>`;
      elements.portalContainer.insertAdjacentHTML("afterbegin", h1);

      let listOfPortals = duplicateRemover(consumersData.portals);
      for (let i = 0; i < listOfPortals.length; i++) {
         let portalName = listOfPortals[i] ?? "Portal não nomeado";
         const portalNameContainer = `
               <label for="${listOfPortals[i]}" class="child-container">
                  ${portalName.replace(/-/g, " ").toUpperCase()}
               </label>
               <input type="radio" id="${listOfPortals[i]}" value="${listOfPortals[i]}" name="portal-options"/>
            `;
         elements.portalContainer.insertAdjacentHTML("beforeend", portalNameContainer);
      }
      renderBtnNewSearch(elements.btnReturnsContainer, "afterbegin");
   }

   switch (inputType) {
      case "phonenumber":
         try {
            consumersData = await client.request(endpoints.consumersForPhoneNumber(input));
            consumerId = consumersData[0]?.id;
            console.log(consumerId);
            try {
               consumersData = await client.request(endpoints.consumersForId(consumerId));
               console.log("GET CONSUMERS FOR PHONE NUMBER/ CONSUMER ID");
               console.log(consumersData);
               phoneNumber = input;
               renderPortalsContainers(consumersData);
            } catch {
               btnNewSearchExists();
               renderBtnNewSearch(elements.btnReturnsContainer, "afterbegin");
               elements.messageFeedback.style.display = "block";
               throwErrorMessage.consumerIdNotFoundInConsumerPhoneNumber();
            }
         } catch {
            btnNewSearchExists();
            renderBtnNewSearch(elements.btnReturnsContainer, "afterbegin");
            elements.messageFeedback.style.display = "block";
            throwErrorMessage.phoneNumberNotFound();
         }
         break;

      case "cpf":
         try {
            consumersData = await client.request(endpoints.consumersForCpf(input));
            consumerId = consumersData[0].id;
            consumersData = await client.request(endpoints.consumersForId(consumerId));
            phoneNumber = consumersData?.mobile ?? "";

            renderPortalsContainers(consumersData);
            console.log("GET CONSUMERS FOR CPF/CONSUMER ID");
            console.log(consumersData);
         } catch {
            console.log("CPF NÃO ENCONTRADO NO GET CONSUMER");
            btnNewSearchExists();
            renderBtnNewSearch(elements.btnReturnsContainer, "afterbegin");
            elements.messageFeedback.style.display = "block";
            throwErrorMessage.consumerIdNotFoundInConsumerCpf();
         }
         break;
      case "consumerid":
         try {
            consumersData = await client.request(endpoints.consumersForId(input));
            7;
            renderPortalsContainers(consumersData);
            console.log("GET CONSUMERS FOR ID");
            console.log(consumersData);
            consumerId = consumersData.id;
         } catch {
            console.log("ERRO NO REQUEST CONSUMER FOR ID");
            btnNewSearchExists();
            renderBtnNewSearch(elements.btnReturnsContainer, "afterbegin");
            elements.messageFeedback.style.display = "block";
            throwErrorMessage.consumerIdNotFoundInConsumerId();
         }
         break;
   }
   elements.portalOptions.forEach(function (radio) {
      radio.addEventListener("click", function handleClick(e) {
         let chosenPortal = e.target.value;
         elements.portalContainer.style.display = "none";
         elements.menuTabContainer.style.display = "flex";
         elements.mainProfile.style.display = "flex";
     

         console.log(phoneNumber);
         console.log(chosenPortal);
         console.log(consumersData);
         renderProfile(consumersData, consumerId, chosenPortal);
         renderNotifications(phoneNumber, chosenPortal);
         renderExtract(consumerId, chosenPortal);
      });
   });
}
