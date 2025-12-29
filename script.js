document.addEventListener("DOMContentLoaded", () => {
  const viewport = document.querySelector(".viewport");
  const track = document.getElementById("artworks");
  const images = Array.from(track.children);

  const gap = 10;
  const fullVisible = 4;   // full images in the middle
  const peekRatio = 0.2;   // left + right peek
  let index = 0;

  function getImageWidth() {
    return images[0].getBoundingClientRect().width;
  }

  function sizeViewport() {
    const imgW = getImageWidth();

    const width =
      (fullVisible + 2 * peekRatio) * imgW +
      (fullVisible + 1) * gap;

    viewport.style.width = `${width}px`;
  }

  function update() {
    const imgW = getImageWidth();
    const offset = index * (imgW + gap);

    track.style.transform = `translateX(${-offset}px)`;
    track.style.transition = "transform 0.5s ease";

    updateActive();
  }

  function updateActive() {
    images.forEach(img => img.classList.remove("active", "near"));

    images[index]?.classList.add("active");
    images[index - 1]?.classList.add("near");
    images[index + 1]?.classList.add("near");
  }

  window.nextSlide = () => {
    if (index < images.length - fullVisible) {
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

  window.addEventListener("resize", () => {
    sizeViewport();
    update();
  });

  sizeViewport();
  update();
});
