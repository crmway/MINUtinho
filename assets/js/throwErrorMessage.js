import { elements } from "./elements.js";
const messageFeedbackField = elements.messageFeedback;
export const throwErrorMessage = {
   phoneNumberInvalid() {
      messageFeedbackField.innerHTML = "Número de telefone inválido</br></br>Clique em VOLTAR e tente novamente";
   },
   phoneNumberNotFound() {
      messageFeedbackField.innerHTML = "Número de telefone não encontrado em Consumers</br></br>Clique em VOLTAR e tente novamente";
   },
   consumerIdNotFoundInConsumerPhoneNumber() {
      messageFeedbackField.innerHTML = "ConsumerId não encontrado com este número de telefone</br></br>Clique em VOLTAR e tente novamente";
   },
   cpfInvalid() {
      messageFeedbackField.innerHTML = "Número de CPF inválido</br></br>Clique em VOLTAR e tente novamente";
   },
   consumerIdNotFoundInConsumerCpf() {
      messageFeedbackField.innerHTML = "Número de CPF não encontrado em Consumers</br></br>Clique em VOLTAR e tente novamente";
   },
   consumerIdInvalid() {
      messageFeedbackField.innerHTML = "ConsumerId inválido</br></br>Clique em VOLTAR e tente novamente";
   },
   consumerIdNotFoundInConsumerId() {
      messageFeedbackField.innerHTML = "Consumer ID não encontrado em Consumers</br></br>Clique em VOLTAR e tente novamente";
   },
   tooManyFieldsFilled() {
      messageFeedbackField.innerHTML = "Preencha apenas um campo</br></br>Clique em VOLTAR e tente novamente";
   },
};
