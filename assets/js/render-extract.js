import { endpoints } from "./endpoints.js";
import { convertDate, toBrazilianCurrency, capitalize } from "./utils.js";
import { elements } from "./elements.js";
import { loader } from "./loader.js";

export async function renderExtract(consumerId, chosenPortal) {
   loader(elements.extractContainer);
   let couponsData = "";

   try {
      couponsData = await client.request(endpoints.couponsForId(consumerId));
   } catch {
      console.log("CONSUMER ID NÃO ENCONTRADO NO GET COUPONS ", consumerId);
   }
   document.querySelector("#loader-box").style.display = "none";

   let transactionsData = "";
   try {
      transactionsData = await client.request(endpoints.transactionsForId(consumerId, chosenPortal));
      console.log("TRANSACTION DATA");
      console.log(transactionsData);
      let rewardsList = transactionsData._embedded.rewards;

      for (let i = 0; i < rewardsList.length; i++) {
         let rewardPrice = toBrazilianCurrency(rewardsList[i]?.value ?? "");
         let rewardTimestamp = convertDate(rewardsList[i]?.status?.timestamp ?? "");
         let rewardStatus = rewardsList[i].status.name;
         let rewardTitle = capitalize(rewardsList[i]._embedded?.experience?.title) ?? "";
         let rewardBanner = rewardsList[i]?._embedded.experience?.appreciationBanner?.href ?? "";

         const rewardContainer = `
            <div>
               <div class="reward-container item-hover" id="reward-container-${i}">
                  <div class="reward-icon"><img src="${rewardBanner}" alt="" /></div>
                  <div class="reward-resume">
                     <label for="reward-${i}" class="item-label reward-name">${rewardTitle}</label>
                     <div class="reward-timestamp">${rewardTimestamp}</div>
                     <div class="reward-price">${rewardPrice}</div>
                  </div>
                  <input type="checkbox" id="reward-${i}" class="item-input" />
                  <div class="item-content" id="reward-content-${i}"></div>
               </div>
            </div>
         `;
         elements.extractContainer.insertAdjacentHTML("beforeend", rewardContainer);
         let getRewardContainerContent = document.querySelector(`#reward-content-${i}`);
         let paymentList = rewardsList[i]._embedded.payments;
         if (paymentList.length == 0) {
            document.querySelector(`#reward-container-${i}`).classList.remove("item-hover");
         }

         for (let j = 0; j < paymentList.length; j++) {
            let dealIcon = paymentList[j]._embedded.deal.icon.href;
            let dealTitle = paymentList[j]._embedded.deal.title;
            let dealPrice = toBrazilianCurrency(paymentList[j].value);
            let dealDescription = paymentList[j].status.detail.description;
            let dealTimestamp = convertDate(paymentList[j].status.timestamp);
            let transactionId = rewardsList[i].id;
            let dealStatus = paymentList[j].status.detail.name;
            let dealStatusContainer = "";
            function setDealStatus() {
               let textStatus = "";
               let hrefStatus = "";
               if (dealStatus === "delivered") {
                  hrefStatus = "./img/check.png";
                  textStatus = "Entregue";
               }
               if (dealStatus === "forwarded") {
                  hrefStatus = "./img/alarm-clock.png";
                  textStatus = "Processando ";
               }
               if (dealStatus === "created") {
                  hrefStatus = "./img/alarm-plus.png";
                  textStatus = "Criado ";
               }
               if (dealStatus === "canceled") {
                  hrefStatus = "./img/multiply.png";
                  textStatus = "Cancelado ";
               }
               dealStatusContainer = `
                  <div class="deal-status">
                  <img src="${hrefStatus}" width="17" height="17"/>
                  <p>${textStatus}</p>
                  </div>           
               `;

               return dealStatusContainer;
            }

            let rewardChannelContainer = "";
            function setRewardChannel() {
               if (rewardsList[i].channel === "engine-timeout" || rewardsList[i].channel === "engine-no-choice") {
                  rewardChannelContainer = `
                     <div class="reward-channel">
                        <img src="./img/clock-two-thirty.png" width="17" height="17"/>
                        <p>Prêmio definido automaticamente</p>
                     </div>           
                  `;
               }
               return rewardChannelContainer;
            }

            let giftedPhoneNumberContainer = "";
            // Boolean(Object.getOwnPropertyDescriptor(consumersData, "name"))
            function setGiftedPhoneNumber() {
               if (Boolean(couponsData) === true) {
                  couponsData.forEach((couponItem) => {
                     if (transactionId === couponItem.rewardId) {
                        if (Boolean(Object.getOwnPropertyDescriptor(couponItem.status, "detail")) === true && Boolean(Object.getOwnPropertyDescriptor(couponItem.status.detail, "mobile")) === true) {
                           let giftedPhoneNumber = couponItem.status.detail.mobile;
                           giftedPhoneNumberContainer = `<div class="gifted"> <span>Número presenteado com o prêmio: </span>${giftedPhoneNumber}</div>`;
                        }
                     }
                  });
               }
               return giftedPhoneNumberContainer;
            }

            const dealContainer = `
               <div class="deal-container">
                  <div class="deal-item">
                     <header>
                        <div class="deal-icon"><img src="${dealIcon}" alt="" /></div>
                        <div>
                           <label for="deal-${dealTitle}-${i}${j}" class="deal-label">${dealTitle}</label>
                           <div class="timestamp">
                              <div class="time-icon"><img src="" alt="" /></div>
                              <div class="deal-timestamp">${dealTimestamp}</div>
                           </div>
                        </div>
                     </header>
                     <input type="checkbox" id="deal-${dealTitle}-${i}${j}" class="deal-input" />
                     <div class="deal-content">
                        ${setGiftedPhoneNumber()}
                        ${setDealStatus()}
                        ${setRewardChannel()}
                        <p class="deal-price">Valor do bônus: <span>${dealPrice}</span></p>
                        <div class="description">${dealDescription}</div>
                     </div>
                  </div>
               </div>
            `;
            getRewardContainerContent.insertAdjacentHTML("afterbegin", dealContainer);
         }
      }
   } catch {
      const noTransaction = `<p class="no-notification"> Você não possui recompensas</p>`;
      elements.extractContainer.insertAdjacentHTML("afterbegin", noTransaction);
   }
}
