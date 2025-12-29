document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("artworks");
  const images = Array.from(track.children);
  const gap = 40; // same as in CSS
  let index = 0;   // start at first image

  function sizeViewport() {
    const imageWidth = images[0].offsetWidth;
    const viewportWidth = Math.min(images.length, 5) * imageWidth + (Math.min(images.length,5)-1)*gap;
    document.querySelector(".viewport").style.width = `${viewportWidth}px`;
    update(); // ensure track is positioned correctly after resizing
  }

  function update() {
    const imageWidth = images[0].offsetWidth;
    const translateX = -index * (imageWidth + gap);
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(${translateX}px)`;
  }

  window.nextSlide = () => {
    if (index < images.length - 5) { // stop at last full frame
      index++;
      update();
    }
  };

  window.prevSlide = () => {
    if (index > 0) {
      index--;
      update();
    }
  };

  window.addEventListener("resize", sizeViewport);
  window.onload = sizeViewport;
});
