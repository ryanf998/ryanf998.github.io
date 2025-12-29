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
    index++;
    if (index > images.length - 3) index = 0; // wrap around
    update();
  };
  
  window.prevSlide = function () {
    index--;
    if (index < 0) index = images.length - 3; // wrap around
    update();
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
    const imageWidth = images[0].offsetWidth;
    const gap = 40;
  
    // translate track so the first image aligns after left peek
    const peekOffset = 0.2 * imageWidth;
    track.style.transform = `translateX(${-index * (imageWidth + gap) + peekOffset}px)`;
  
    updateActive();
  }

  sizeViewport();
  update();
  window.addEventListener("resize", sizeViewport);
});





