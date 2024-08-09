(() => {
  const aniItems = document.querySelectorAll(".commonAni");
  const video = document.querySelector(".attachedFile-video video");

  function showItem() {
    const triggerPoint = (window.innerHeight / 5) * 4;

    aniItems.forEach((item) => {
      const itemTop = item.getBoundingClientRect().top;

      if (itemTop < triggerPoint) {
        item.classList.add("show");
        if (item.classList.contains("attachedFile-video")) {
          video.play();
        }
      } else {
        item.classList.remove("show");
      }
    });
  }

  window.addEventListener("scroll", showItem);
})();
