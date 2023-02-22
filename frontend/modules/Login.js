const validator = require('validator');

export default class Login {
  constructor() {
    this.form = document.querySelector(".form-login");
    this.errors = false;
  }

  init() {
    if( !this.form ) return;
    this.handleEvents();
  }

  handleEvents() {
    this.handleSubimit();
    this.handleKeyPress();
  }

  handleSubimit() {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.removeErrors();
      this.validate();
      if( this.errors ) return;
      this.form.submit();
    });
  }

  handleKeyPress() {

    const inputs = this.form.querySelectorAll(".input-form-login");

    inputs.forEach(input => {
      input.addEventListener("keypress", event => {
        if(!this.errors) return;
        this.removeErrors();
      })
    });
  }

  validate() {
    this.validateEmail();
    this.validatePassword();
  }

  validateEmail() {
    const email = this.form.querySelector("#email");
    if( !validator.isEmail(email.value) ) {
      this.createError(email, "E-mail inválido!");
      this.errors = true;
    }
  }

  validatePassword() {
    const password = this.form.querySelector("#password");
    if( password.value.length < 6 || password.value.length > 30 ) {
      this.createError(password, "Senha inválida!");
      this.errors = true;
    }
  }

  createError(element, error) {
    const errorDiv = document.createElement("div");

    element.classList.add("is-invalid");
    errorDiv.classList.add("invalid-feedback");
    errorDiv.innerText = error;

    element.insertAdjacentElement("afterEnd", errorDiv);
  }

  removeErrors() {
    const errorsInput = this.form.querySelectorAll(".is-invalid");
    const errorsDiv = this.form.querySelectorAll(".invalid-feedback");
    
    errorsInput.forEach(error => {
      error.classList.remove("is-invalid");
    });

    errorsDiv.forEach(error => {
      error.remove();
    });
    this.errors = false;
  }
}