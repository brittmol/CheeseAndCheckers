const navBurger = document.querySelector(".burger");
const openNavBurger = document.querySelector(".burger_open");
const closeNavBurger = document.querySelector(".burger_close");

const open = () => {
  navBurger.style.display = "flex";
  navBurger.style.top = "0";
};

const close = () => {
  main_menu.style.top = "-100%";
};

openNavBurger = openNav.addEventListener("click", open);
closeNavBurger.addEventListener("click", close);
