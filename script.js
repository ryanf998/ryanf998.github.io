document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("artworks");
  const images = track.children;
  const gap = 40;

  const visibleCount = 5;
  const peekRatio = 0.3;
  let index = 0;

  function sizeViewport() {
    const imageWidth = images[0].offsetWidth;
  
    const viewportWidth =
      visibleCount * imageWidth +
      (visibleCount - 1) * gap;
  
    document.querySelector(".viewport").style.width = `${viewportWidth}px`;
  }

  window.nextSlide = function () {
    if (index < images.length - visibleCount) {
      index++;
      update();
    }
  };

  window.prevSlide = function () {
    if (index > 0) {
      index--;
      update();
    }
  };

  function updateActive() {
    [...images].forEach(img => {
      img.classList.remove("active", "near");
    });
  
    const center = index + Math.floor(visibleCount / 2);
  
    const active = images[center];
    if (!active) return;
  
    active.classList.add("active");
  
    if (images[center - 1]) images[center - 1].classList.add("near");
    if (images[center + 1]) images[center + 1].classList.add("near");
  }
  
  function update() {
    updateActive();
  
    const activeImg = track.querySelector(".active");
    if (activeImg) {
      activeImg.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest"
      });
    }
  }

  sizeViewport();
  update();
  window.addEventListener("resize", sizeViewport);
});




