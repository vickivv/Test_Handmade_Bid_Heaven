// utils.js
export function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  }
  
  export function validatePassword(password) {
    return password.length >= 8;
  }
  

  export function getCsrfToken() {
    let csrfToken = '';
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const parts = cookie.split('=');
        if (parts[0].trim() === 'csrftoken') {
            csrfToken = parts[1];
            break;
        }
    }
    return csrfToken;
}

