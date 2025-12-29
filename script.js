document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("artworks");
  const images = track.children;

  const gap = 40;
  let index = 0;
  const visibleCount = 2;

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
    track.style.transform = `translateX(-${index * stepSize()}px)`;
  }

  update();
});
