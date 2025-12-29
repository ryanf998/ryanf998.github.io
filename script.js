document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("artworks");
  const images = track.children;
  const gap = 40;

  const visibleCount = 3;
  const peekRatio = 0.3;
  let index = 0;

  function sizeViewport() {
    const imageWidth = images[0].offsetWidth;

    const viewportWidth =
      visibleCount * imageWidth +
      (visibleCount - 1) * gap +
      2 * peekRatio * imageWidth;

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

  function update() {
    const imageWidth = images[0].offsetWidth;
    const peekOffset = peekRatio * imageWidth;

    track.style.transform = `translateX(${peekOffset - index * (imageWidth + gap)}px)`;
  }

  sizeViewport();
  update();
  window.addEventListener("resize", sizeViewport);
});
