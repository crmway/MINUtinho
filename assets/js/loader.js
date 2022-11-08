export function loader(element) {
   const loader = `
      <div id="loader-box">
         <div id="loading"></div>
      </div>
   `;
   element.insertAdjacentHTML("beforeend", loader);
}
