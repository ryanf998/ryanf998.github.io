document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("artworks");
  const images = Array.from(track.children);

  const gap = 40;
  const visibleCount = 5;

  // index = CENTER image
  let index = Math.floor(visibleCount / 2);

  function sizeViewport() {
    const imageWidth = images[0].offsetWidth;
    const viewport = document.querySelector(".viewport");

    const viewportWidth =
      visibleCount * imageWidth + (visibleCount - 1) * gap;

    viewport.style.width = `${viewportWidth}px`;
    update();
  }

  function update() {
    const imageWidth = images[0].offsetWidth;
    const viewport = document.querySelector(".viewport");

    const trackWidth =
      images.length * imageWidth + (images.length - 1) * gap;

    // Center the active image
    let offset =
      index * (imageWidth + gap) -
      (viewport.offsetWidth / 2 - imageWidth / 2);

    // Clamp so we can reach first & last image cleanly
    const maxOffset = trackWidth - viewport.offsetWidth;
    if (offset < 0) offset = 0;
    if (offset > maxOffset) offset = maxOffset;

    track.style.transform = `translateX(${-offset}px)`;
    track.style.transition = "transform 0.5s ease";

    updateActive();
  }

  function updateActive() {
    images.forEach(img => img.classList.remove("active", "near"));

    images[index].classList.add("active");
    if (images[index - 1]) images[index - 1].classList.add("near");
    if (images[index + 1]) images[index + 1].classList.add("near");
  }

  window.nextSlide = function () {
    if (index < images.length - 1) {
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

  window.addEventListener("load", sizeViewport);
  window.addEventListener("resize", sizeViewport);
});
