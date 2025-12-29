document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("artworks");
  const images = track.children;

  const gap = 40;
  let index = 0;
  const visibleCount = 3;
  const peekRatio = 0.3;

  function stepSize() {
    return images[0].offsetWidth + gap;
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

  function sizeViewport() {
    const imageWidth = images[0].offsetWidth;
    const viewportWidth =
      visibleCount * imageWidth +
      (visibleCount - 1) * gap +
      peekRatio * imageWidth * 2;
  
    document.querySelector(".viewport").style.width = `${viewportWidth}px`;
  }

  function update() {
    const viewport = document.querySelector(".viewport");
    const imageWidth = images[0].offsetWidth;
  
    const visibleWidth =
      visibleCount * imageWidth +
      (visibleCount - 1) * gap;
  
    const peek = peekRatio * imageWidth * 2; // both sides
    const offset = (viewport.offsetWidth - visibleWidth - peek) / 2;
  
    track.style.transform = `translateX(${offset - index * (imageWidth + gap)}px)`;
  }

  update();
});



