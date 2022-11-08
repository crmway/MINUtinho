export const masks = {
   maskCpf(elementHtml, stringNumber) {
      let cpfValue;
      if (Boolean(elementHtml.value)) {
         cpfValue = elementHtml.value;
      }
      if (Boolean(stringNumber)) {
         cpfValue = stringNumber;
      }

      cpfValue = cpfValue
         .replace(/\D/g, "")
         .replace(/(\d{3})(\d)/, "$1.$2")
         .replace(/(\d{3})(\d)/, "$1.$2")
         .replace(/(\d{3})(\d{1,2})/, "$1-$2")
         .replace(/(-\d{2})\d+?$/, "$1");

      if (Boolean(elementHtml.value)) {
         return (elementHtml.value = cpfValue);
      }
      if (Boolean(stringNumber)) {
         return cpfValue;
      }
   },
   maskPhoneNumber(element) {
      let phoneNumberField = document.querySelector("#input-phone-number");
      let phoneNumberValue = phoneNumberField.value;
      phoneNumberValue = phoneNumberValue
         .replace(/\D+/g, "")
         .replace(/(\d{2})(\d)/, "($1) $2")
         .replace(/(\d{4})(\d)/, "$1-$2")
         .replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3")
         .replace(/(-\d{4})\d+?$/, "$1");
      return (phoneNumberField.value = phoneNumberValue);
   },
   internMaskPhoneNumber(phoneNumber) {
      phoneNumber = phoneNumber + "";
      if (phoneNumber.length == 13) {
         phoneNumber = phoneNumber
            .replace(/\D+/g, "")
            .replace(/(\d{2})(\d)/, "+$1 $2")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2");
         return phoneNumber;
      }
      if (phoneNumber.length < 13) {
         phoneNumber = phoneNumber
            .replace(/\D+/g, "")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4})(\d)/, "$1-$2")
            .replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3")
            .replace(/(-\d{4})\d+?$/, "$1");
         return phoneNumber;
      }
   },
};
