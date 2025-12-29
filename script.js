document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("artworks");
  const images = track.children;

  const gap = 40;
  let index = 0;
  const visibleCount = 3;

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

  function update() {
    const viewport = document.querySelector(".viewport");
    const viewportWidth = viewport.offsetWidth;
    const imageWidth = images[0].offsetWidth;
  
    const visibleWidth = visibleCount * imageWidth + (visibleCount - 1) * gap;
    const offset = (viewportWidth - visibleWidth) / 2;
  
    track.style.transform = `translateX(${offset - index * (imageWidth + gap)}px)`;
  }

  update();
});


