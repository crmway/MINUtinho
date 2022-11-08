import { elements } from "./elements.js";

export function renderBtnNewSearch(element, position) {
   let btnNewSearch = `<input type="button" id="btn-new-search" class="btn-container" value="NOVA BUSCA" />`;
   // elements.messageFeedback.style.display = "block";
   // console.log(element);
   // console.log(position);
   element.insertAdjacentHTML(position, btnNewSearch);
   document.querySelector("#btn-new-search").addEventListener("click", () => {
      location.reload();
   });
}
