//화면의 크기가 1024px 이상일때 적용 할 코드
// matchMedia("screen and (min-width: 1024px)").matches
(() => {
  /* ************************************************************************ */
  /* navigation */
  const wrapper = document.querySelector(".wrapper");
  const btnHamburger = document.querySelector(".btn-hamburger");
  const navigation = document.querySelector(".navigation");
  const naviLinks = document.querySelectorAll(".navigation-link");
  const sections = document.querySelectorAll("section");

  function menuHandler() {
    sections.forEach((sec) => {
      let top = window.scrollY;
      let offset = sec.offsetTop - 1000;
      let height = sec.offsetHeight;
      let Id = sec.getAttribute("id");

      if (top >= offset && top < offset + height) {
        naviLinks.forEach((link) => {
          link.classList.remove("active");
          document.querySelector(`.navigation a[href*="${Id}"]`).classList.add("active");
        });
      }
    });
  }

  btnHamburger.addEventListener("click", function () {
    btnHamburger.classList.toggle("active");
    navigation.classList.toggle("active");
  });

  wrapper.addEventListener("click", function () {
    btnHamburger.classList.remove("active");
    navigation.classList.remove("active");
  });

  /* ************************************************************************ */
  /* cardCont */
  const cardCont = document.querySelector(".cardCont");
  const cardFrame = document.querySelector(".cardCont-frame");

  class CardFlipOnScroll {
    constructor(cardCont, cardFrame) {
      this.cardCont = cardCont;
      this.cardFrame = cardFrame;
      this.cardElems = cardFrame.querySelectorAll(".cardCont-item");
      this.length = this.cardElems.length;

      this.start = 0;
      this.end = 0;
      this.step = 0;
    }
    init() {
      this.start = this.cardCont.offsetTop;
      this.end = this.cardCont.offsetTop + this.cardCont.offsetHeight - innerHeight * 1.2;
      this.step = (this.end - this.start) / (this.length * 2);
    }
    animate() {
      this.cardElems.forEach((card, i) => {
        const s = this.start + this.step * i;
        const e = s + this.step * (this.length + 1);

        if (scrollY <= s) {
          card.style.transform = `
          perspective(100vw)
          translateX(100vw)
          rotateY(180deg)
        `;
        } else if (scrollY > s && scrollY <= e - this.step) {
          card.style.transform = `
          perspective(100vw)
          translateX(${100 - ((scrollY - s) / (e - s)) * 100}vw)
          rotateY(180deg)
        `;
        } else if (scrollY > e - this.step && scrollY <= e) {
          card.style.transform = `
          perspective(100vw)
          translateX(${100 - ((scrollY - s) / (e - s)) * 100}vw)
          rotateY(${180 - (-(scrollY - (e - this.step)) / this.step) * 180}deg)
        `;
        } else if (scrollY > e) {
          card.style.transform = `
          perspective(100vw)
          translateX(0vw)
          rotateY(0deg)
        `;
        }
        if (matchMedia("screen and (max-width: 768px)").matches) {
          card.style.transform = `
            perspective(100vw)
            translateX(0vw)
            rotateY(0deg)
          `;
        }
      });
    }
  }

  const cardFlipOnScroll = new CardFlipOnScroll(cardCont, cardFrame);
  cardFlipOnScroll.init();

  /* ************************************************************************ */
  /* scrollCont */
  const bubbleElems = document.querySelectorAll(".speechBubble");
  const playerImgElems = document.querySelectorAll(".playerImg-item");
  const playerNameElems = document.querySelectorAll(".playerBox-name span");
  const scrollContent = document.querySelector(".scrollCont");
  const runningWave = document.querySelector(".playerBox-runningWave");
  // let currentBubbleItem = bubbleElems[0];
  let currentImgItem = playerImgElems[0];
  let currentNameItem = playerNameElems[0];

  function runningMusicWave() {
    let start = scrollContent.offsetTop;
    let end = scrollContent.offsetTop + scrollContent.offsetHeight - innerHeight;

    let value = end - start;
    let boundingRect = scrollContent.getBoundingClientRect().top;
    // Math.abs = 음수를 정수로 변형
    let boundingRectValue = (Math.abs(boundingRect) / value) * 100;

    if (start < scrollY || end > scrollY) {
      runningWave.style.cssText = `
      mask-size: ${boundingRectValue}% 100%;
      -webkit-mask-size: ${boundingRectValue}% 100%;
      `;
    }

    if (start > scrollY) {
      runningWave.style.cssText = `
      mask-size: 0% 100%;
      -webkit-mask-size: 0% 100%;
      `;
    }

    if (end < scrollY) {
      runningWave.style.cssText = `
      mask-size: 100% 100%;
      -webkit-mask-size: 100% 100%;
      `;
    }
  }

  for (let i = 0; i < bubbleElems.length; i++) {
    bubbleElems[i].dataset.index = i;
    playerImgElems[i].dataset.index = i;
    playerNameElems[i].dataset.index = i;
  }

  function activate() {
    // currentBubbleItem.classList.add("active");
    currentImgItem.classList.add("active");
    currentNameItem.classList.add("active");
  }

  function inactivate() {
    // currentBubbleItem.classList.remove("active");
    currentImgItem.classList.remove("active");
    currentNameItem.classList.remove("active");
  }

  function showGraphic() {
    let bubble;
    let boundingRect;

    for (let i = 0; i < bubbleElems.length; i++) {
      bubble = bubbleElems[i];
      boundingRect = bubble.getBoundingClientRect().top;

      if (boundingRect > window.innerHeight * 0.1 && boundingRect < window.innerHeight * 0.8) {
        inactivate();

        // currentBubbleItem = bubbleElems[bubble.dataset.index];
        currentImgItem = playerImgElems[bubble.dataset.index];
        currentNameItem = playerNameElems[bubble.dataset.index];
        activate();
      }
    }
  }

  /* ************************************************************************ */
  window.addEventListener("scroll", () => {
    menuHandler();

    cardFlipOnScroll.animate();

    showGraphic();
    runningMusicWave();
  });

  window.addEventListener("resize", () => {
    if (matchMedia("screen and (min-width: 1024px)").matches) {
      btnHamburger.classList.remove("active");
      navigation.classList.remove("active");
    }

    cardFlipOnScroll.init();
  });

  activate();
})();
