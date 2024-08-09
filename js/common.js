// (() => {
//   /* ************************************************************************ */
//   /* common animation */
//   const observers = document.querySelectorAll(".observer");
//   const video = document.querySelector(".attachedFile-video video");

//   // 영역 감지되면 실행될 콜백
//   const animateBox = function (entries, observer) {
//     // Destructuring
//     const [{ isIntersecting, target }] = entries;

//     // 영역 감지가 true라면 class 추가, 아니면 제거
//     if (isIntersecting) {
//       target.classList.add("animate");

//       if (target.classList.contains("attachedFile-video")) {
//         video.play();
//       }
//     }
//     // else {
//     //   target.classList.remove("animate");
//     // }
//   };

//   // intersection observer 생성자 초기화 (관찰자)
//   const io = new IntersectionObserver(animateBox, {
//     root: null,
//     threshold: 0.5,
//   });

//   // NodeList의 각 요소들 감시 시작
//   observers.forEach((e) => {
//     io.observe(e);
//   });
// })();

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
