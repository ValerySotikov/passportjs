let signBut = document.querySelector('.sign-but');

signBut.addEventListener('click', redirect);

redirect = () => {
  location.href = "http://localhost/signup";
};