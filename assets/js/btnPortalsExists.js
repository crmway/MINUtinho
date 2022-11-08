export function btnPortalsExists() {
   const btnPortals = document.querySelector("#btn-portals");
   if (Boolean(btnPortals) == true) btnPortals.parentNode.removeChild(btnPortals);
}
