(() => {
  const arrowLinks = document.querySelectorAll(".arrowBtns-link");

  arrowLinks.forEach((link) => {
    link.onmousemove = function (e) {
      let x = e.pageX - link.offsetLeft;
      let y = e.pageY - link.offsetTop;

      link.style.setProperty("--x", x + "px");
      link.style.setProperty("--y", y + "px");
    };
  });
})();
