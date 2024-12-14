function validationRegistration(formData) {
  if (!formData.email || !formData.username || !formData.password) {
    return "All fields are required";
  }
  if (formData.username.length < 6 || formData.username.length > 12) {
    return "Username must be between 6 and 12 characters";
  }
  if(formData.password.length < 6 || formData.password.length > 16){
    return "Password must be between 6 and 16 characters";
  }
  if (!/\S+@\S+\.\S+/.test(formData.email)) {
    return "Invalid email format";
  }
  return null;
}

function validationLogin(formData){
  if (!formData.username || !formData.password) {
    return "All fields are required";
  }
  if(formData.username.length < 6 || formData.username.length > 12){
    return "Username must be between 6 and 12 characters";
  }
  if(formData.password.length < 6 || formData.password.length > 16){
    return "Password must be between 6 and 16 characters";
  }
  return null;
}


export  { validationRegistration, validationLogin };