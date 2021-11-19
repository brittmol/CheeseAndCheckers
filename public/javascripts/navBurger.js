window.addEventListener("load", (event) => {
  const navBurgerLinks = document.querySelector(".nav_links");
  const openNavBurger = document.querySelector(".burger_open");
  const closeNavBurger = document.querySelector(".burger_close");

  const open = () => {
    console.log("open");
    navBurgerLinks.style.display = "flex";
    navBurgerLinks.style.top = "0";
    closeNavBurger.style.zIndex = "2";
    openNavBurger.style.zIndex = "-1";
  };

  const close = () => {
    console.log("close");
    navBurgerLinks.style.top = "-100%";
    
  };

  openNavBurger.addEventListener("click", open);
  closeNavBurger.addEventListener("click", close);
});
