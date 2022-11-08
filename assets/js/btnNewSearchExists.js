export function btnNewSearchExists() {
   const btnNewSearch = document.querySelector("#btn-new-search");
   if (Boolean(btnNewSearch) == true) btnNewSearch.parentNode.removeChild(btnNewSearch);
   // document.querySelector("#btn-portals").style.width = "100%";
}
