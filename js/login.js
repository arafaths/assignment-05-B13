// Login Function
document.getElementById('btn-login')
  .addEventListener('click', () => {
    // Get Input Username
    const inputUser = document.getElementById('input-user');
    const userValue = inputUser.value.toLowerCase();

    // Get Input Password
    const inputPass = document.getElementById('input-pass');
    const passValue = inputPass.value;

    // Match Rules
    if (userValue === 'admin' && passValue === 'admin123') {
      window.location.assign('./home.html')
    }
    else {
      if (userValue === 'admin') {
        alert('Incorrect Password');
      }
      else {
        alert('Incorrect Username')
      }
    }
  });

 
// Eys icon Toggle Function
document.getElementById('toggle-pass')
.addEventListener('click', () => {
    const inputPass = document.getElementById('input-pass');
  if (inputPass.type === 'password') {
      inputPass.type = 'text'
  }
  else {
    inputPass.type = 'password'
  }
})

