import { renderPortals } from "./render-portals.js";
import { elements } from "./elements.js";

export function renderBtnPortals(element, position) {
   let inputValidationObject = JSON.parse(window.localStorage.getItem("inputMemoryForRequest"));
   // btnNewSearchExists();
   let btnPortals = `<input type="button" id="btn-portals" class="btn-container"  value="PORTAIS" />`;
   // elements.messageFeedback.style.display = "block";
   element.insertAdjacentHTML(position, btnPortals);

   document.querySelector("#btn-portals").addEventListener("click", () => {
      console.log(inputValidationObject);
      elements.portalContainer.innerHTML = "";
      elements.menuTabContainer.style.display = "none";
      elements.mainProfile.innerHTML = "";
      //   elements.main.padding  = "0";
      elements.extractContainer.innerHTML = "";
      elements.mainNotificationsContainer.innerHTML = "";

      renderPortals(inputValidationObject.fieldValue, inputValidationObject.field);
      let profileTabCheckbox = document.getElementById("tab-profile");
      profileTabCheckbox.checked = true;
      document.getElementById("main-profile").style.display = "flex";
      document.getElementById("main-extract").style.display = "none";
      elements.mainNotificationsContainer.style.display = "none";
   });
}
