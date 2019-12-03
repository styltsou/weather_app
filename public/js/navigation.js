const pageTitle = document.querySelector('.heading-primary');
const navLinks = document.querySelectorAll('.navigation__link');

for (let i = 0; i < navLinks.length; i++) {
  if (navLinks[i].innerHTML === pageTitle.innerHTML) {
    navLinks[i].classList.add('current');
  }
}
