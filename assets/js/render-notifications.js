import { endpoints } from "./endpoints.js";
import { convertDate, capitalize } from "./utils.js";
import { elements } from "./elements.js";

export async function renderNotifications(phoneNumber, chosenPortal) {
   let notificationsData = "";
   const noNotifications = `<p class="no-notification"> Você não possui notificações</p>`;
   try {
      notificationsData = await client.request(endpoints.notificationsForPhoneNumber(phoneNumber, chosenPortal));
      console.log("NOTIFICATIONS DATA");
      console.log(notificationsData);
      if (notificationsData.length != 0) {
         let notificationsList = notificationsData._embedded.notifications;
         for (let i = 0; i < notificationsList.length; i++) {
            let text = notificationsList[i]?.text ?? "";
            let icon = notificationsList[i]?.icon ?? "/assets/img/return.png";
            let channel = notificationsList[i]?.channel ?? "";
            let timestamp = convertDate(notificationsList[i]?.status[0]?.timestamp ?? "");
            let name = notificationsList[i]?.properties?.prizeName ?? "";
            if (Boolean(name) == true) name = capitalize(name.replace(/-/g, " "));

            const notificationItem = `
               <div class="notification-item">
                  <div class="notification-header">
                     <figure class="icon"><img src="${icon}" alt="" /></figure>
                     <h1>${name}</h1>
                  </div>
                  <p>Enviado por: <span>${channel}</span> em:  <span>${timestamp}</span></p>
                  <p class="notification-content"> ${text}</p>
               </div>
            `;
            elements.mainNotificationsContainer.insertAdjacentHTML("afterbegin", notificationItem);
         }



         
      } else {
         elements.mainNotificationsContainer.insertAdjacentHTML("afterbegin", noNotifications);
      }
   } catch {
      elements.mainNotificationsContainer.insertAdjacentHTML("afterbegin", noNotifications);
   }
}
