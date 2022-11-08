import { endpoints } from "./endpoints.js";
import { capitalize, duplicateRemover, amountProfile } from "./utils.js";
import { elements } from "./elements.js";
import { renderBtnPortals } from "./renderBtnPortals.js";
import { renderBtnNewSearch } from "./renderBtnNewSearch.js";
import { btnPortalsExists } from "./btnPortalsExists.js";
import { btnNewSearchExists } from "./btnNewSearchExists.js";
import { masks } from "./masks.js";

export async function renderProfile(consumersData, consumerId, chosenPortal) {
   btnPortalsExists();
   btnNewSearchExists();
   let client = ZAFClient.init();
   let settings = await client.metadata().then((metadata) => metadata.settings);
   console.log(settings);
   let tokenForEngine = await settings["Token do Engine"];
   let tokenForCoupons = await settings["Token do Coupon"];
   console.log([tokenForEngine, tokenForCoupons]);

   let ProfileItem = "";
   let clientName = consumersData.name ? capitalize(consumersData.name) : "Nome do cliente não cadastrado";
   let cpf = consumersData?.cpf ? `<div><span>CPF: </span>${masks.maskCpf("", consumersData.cpf)}</div>` : `<div>Cpf não cadastrado</div>`;

   let mobile = consumersData?.mobile ? `<div><span>Telefone: </span>${masks.internMaskPhoneNumber(consumersData?.mobile)}</div>` : "Telefone não cadastrado";

   let email = Boolean(Object.getOwnPropertyDescriptor(consumersData, "email")) ? `<div><span>Email: </span>${consumersData.email}</div>` : "Email não cadastrado";
   let operatorTitle = Boolean(Object.getOwnPropertyDescriptor(consumersData._embedded, "operator")) ? `<div><span>Operadora: </span>${consumersData._embedded.operator.title}</div>` : "Operadora não cadastrada";

   function renderClientName(clientName) {
      const profileItemClientName = `<h1>${clientName}</h1>`;
      elements.mainProfile.insertAdjacentHTML("afterbegin", profileItemClientName);
   }
   renderClientName(clientName);

   function renderProfileDefault() {
      const defaultProfileParent = `
         <section  section class="parent-container"  id="default-profile-parent" name="section"></section>`;
      elements.mainProfile.insertAdjacentHTML("beforeend", defaultProfileParent);
      const defaultProfileProps = [cpf, mobile, email, operatorTitle];

      defaultProfileProps.forEach((prop) => {
         const profileDefaultChild = `<div class="child-container profile-default-child">${prop}</div>`;
         const setDefaultProfileParent = document.querySelector("#default-profile-parent");
         setDefaultProfileParent.insertAdjacentHTML("beforeend", profileDefaultChild);
      });
   }
   renderProfileDefault();

   let profilesData = "";
   let experiencesParent = `
      <section class="parent-container" id="experiences-parent"> 
         <h1>Experiências </h1> 
      </section> 
   `;
   elements.mainProfile.insertAdjacentHTML("beforeend", experiencesParent);
   const getExperiencesParent = document.querySelector("#experiences-parent");
   renderBtnPortals(elements.btnReturnsContainer, "afterbegin");
   renderBtnNewSearch(elements.btnReturnsContainer, "afterbegin");

   const noExperiences = `<p> Você não possui notificações par ao portal ${capitalize(chosenPortal.replace(/-/g, " "))}</p>`;

   try {
      profilesData = await client.request(endpoints.profilesForId(consumerId, tokenForEngine));
      function listExperiencesForPortal() {
         const allProfilesByChosenPortal = profilesData.filter((profile) => profile.portal == chosenPortal);
         const allExperiencesByChosenPortal = allProfilesByChosenPortal.map((profile) => profile.experience);
         const experiencesByChosenPortal = duplicateRemover(allExperiencesByChosenPortal);
         return experiencesByChosenPortal;
      }
      if (listExperiencesForPortal().length !== 0) {
         async function renderExperiences() {
            listExperiencesForPortal().forEach((experience, index) => {
               function renderExperienceChilds() {
                  const experienceTitle = experience == undefined ? "Experiência não nomeada" : experience.replace(/-/g, " ").toUpperCase();
                  const experienceChild = `
                     <div class="experience-container">
                        <div class="experience-header">
                           <label for="experience-child-${index}" class="item-label">${experienceTitle}</label>
                           <input type="checkbox" id="experience-child-${index}" name="experience-child" value="${experience}"
                              class="item-input" />
                           <div id="experience-content-${experience}-${index}" class="experience-content"></div>
                        </div>
                     </div>
                  `;
                  getExperiencesParent.insertAdjacentHTML("beforeend", experienceChild);

                  const getExperienceChild = document.querySelector(`#experience-child-${index}`);
                  function renderProfilesOfChildExperiences() {
                     getExperienceChild.addEventListener("click", (e) => {
                        let chosenExperience = e.target.value;
                        let profilesForChosenExperience = profilesData.filter((profile) => profile.experience === chosenExperience);

                        const getExperienceChildContent = document.querySelector(`#experience-content-${experience}-${index}`);
                        if (getExperienceChildContent.childNodes.length == 0) {
                           profilesForChosenExperience.forEach((profile, index) => {
                              const profileExperience = `
                                 <div class="profile-container" id="profile-container-${chosenExperience}-${index}" value="${index}">
                                    <div class="profile-header">
                                       <label for="profile-${chosenExperience}${index}" class="item-label">${chosenExperience.replace(/-/g, " ").toUpperCase()}: ${index + 1}</label>
                                       <input type="checkbox" id="profile-${chosenExperience}${index}" value="${index}" name="experience-options"
                                          class="item-input" />
                                       <div id="profile-content-${chosenExperience}${index}" class="profile-content profile-content-${chosenExperience}${index}"></div>
                                    </div>
                                 </div>
                              `;
                              getExperienceChildContent.insertAdjacentHTML("beforeend", profileExperience);

                              const getProfileExperience = document.querySelector(`#profile-${chosenExperience}${index}`);
                              getProfileExperience.addEventListener("click", (e) => {
                                 let refProfile = e.target.value;

                                 const getProfileExperienceContent = document.querySelector(`.profile-content-${chosenExperience}${index}`);
                                 if (getProfileExperienceContent.childNodes.length == 0) {
                                    ProfileItem = [profilesForChosenExperience[refProfile]];
                                    let createdProfileItem = ProfileItem[0].created;
                                    let arrayItems = amountProfile(ProfileItem);
                                    if (arrayItems.length > 15) {
                                       let longProfile = `
                                       <div id="paginate">
                                          <div class="list-${chosenExperience}${index}-${refProfile} list"></div>
                                          <div class="controls">
                                             <div class="first-${chosenExperience}${index}-${refProfile} first">&#171;</div>
                                             <div class="prev-${chosenExperience}${index}-${refProfile} prev">
                                                   <</div>
                                                      <div class="numbers-${chosenExperience}${index}-${refProfile} numbers">
                                                         <div>1</div>
                                                      </div>
                                                      <div class="next-${chosenExperience}${index}-${refProfile} next">></div>
                                                      <div class="last-${chosenExperience}${index}-${refProfile} last">&#187;</div>
                                             </div>
                                          </div>
                                       </div>`;
                                       getProfileExperienceContent.insertAdjacentHTML("beforeend", longProfile);

                                       const data = arrayItems.map((item) => item.join(": "));

                                       let perPage = 15;
                                       const state = {
                                          perPage: perPage,
                                          page: 1,
                                          totalPage: Math.ceil(data.length / perPage),
                                          maxVisivleButtons: 5,
                                       };
                                       const html = {
                                          get(element) {
                                             return document.querySelector(element);
                                          },
                                       };

                                       const controls = {
                                          next() {
                                             state.page++;
                                             const lastPage = state.page > state.totalPage;
                                             if (lastPage) {
                                                state.page--;
                                             }
                                          },
                                          prev() {
                                             state.page--;
                                             if (state.page < 1) {
                                                state.page++;
                                             }
                                          },
                                          goTo(page) {
                                             if (page < 1) {
                                                page = 1;
                                             }
                                             state.page = +page;

                                             if (page > state.totalPage) {
                                                state.page = state.totalPage;
                                             }
                                          },
                                          createListener() {
                                             html.get(`.first-${chosenExperience}${index}-${refProfile}`).addEventListener("click", () => {
                                                controls.goTo(1);
                                                update();
                                             });
                                             html.get(`.last-${chosenExperience}${index}-${refProfile}`).addEventListener("click", () => {
                                                controls.goTo(state.totalPage);
                                                update();
                                             });
                                             html.get(`.next-${chosenExperience}${index}-${refProfile}`).addEventListener("click", () => {
                                                controls.next();
                                                update();
                                             });
                                             html.get(`.prev-${chosenExperience}${index}-${refProfile}`).addEventListener("click", () => {
                                                controls.prev();
                                                update();
                                             });
                                          },
                                       };
                                       const list = {
                                          create(item) {
                                             const div = document.createElement("div");
                                             div.classList.add("item");
                                             div.innerHTML = item;
                                             html.get(`.list-${chosenExperience}${index}-${refProfile}`).appendChild(div);
                                          },
                                          update() {
                                             html.get(`.list-${chosenExperience}${index}-${refProfile}`).innerHTML = "";
                                             let page = state.page - 1;
                                             let start = page * state.perPage;
                                             let end = start + state.perPage;
                                             const paginatedItems = data.slice(start, end);
                                             paginatedItems.forEach(list.create);
                                          },
                                       };
                                       const buttons = {
                                          element: html.get(`.numbers-${chosenExperience}${index}-${refProfile}`),
                                          create(number) {
                                             const button = document.createElement("div");
                                             button.innerHTML = number;

                                             if (state.page == number) {
                                                button.classList.add("active");
                                             }

                                             button.addEventListener("click", (event) => {
                                                const page = event.target.innerText;
                                                controls.goTo(page);
                                                update();
                                             });
                                             buttons.element.appendChild(button);
                                          },
                                          update() {
                                             buttons.element.innerHTML = "";
                                             const { maxLeft, maxRight } = buttons.calculateMaxVisible();
                                             for (let page = maxLeft; page <= maxRight; page++) {
                                                buttons.create(page);
                                             }
                                          },
                                          calculateMaxVisible() {
                                             const { maxVisivleButtons } = state;
                                             let maxLeft = state.page - Math.floor(maxVisivleButtons / 2);
                                             let maxRight = state.page + Math.floor(maxVisivleButtons / 2);
                                             if (maxLeft < 1) {
                                                maxLeft = 1;
                                                maxRight = maxVisivleButtons;
                                             }
                                             if (maxRight > state.totalPage) {
                                                maxLeft = state.totalPage - (maxVisivleButtons - 1);
                                                maxRight = state.totalPage;
                                                if (maxLeft < 1) maxLeft = 1;
                                             }
                                             return { maxLeft, maxRight };
                                          },
                                       };

                                       function update() {
                                          list.update();
                                          buttons.update();
                                       }
                                       function init() {
                                          update();
                                          controls.createListener();
                                       }
                                       init();
                                    } else {
                                       arrayItems.forEach((item) => {
                                          let shortProfile = `<div class="short-profile">${item[0]}: ${item[1]}</div>`;
                                          getProfileExperienceContent.insertAdjacentHTML("beforeend", shortProfile);
                                       });
                                    }
                                 }
                              });
                           });
                        }
                     });
                  }
                  renderProfilesOfChildExperiences();
               }
               renderExperienceChilds();
            });
         }
         renderExperiences();
      } else {
         getExperiencesParent.insertAdjacentHTML("beforeend", noExperiences);
      }
   } catch {
      getExperiencesParent.insertAdjacentHTML("beforeend", noExperiences);
   }
}
