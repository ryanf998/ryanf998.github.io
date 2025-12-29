document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("artworks");
  const images = Array.from(track.children);
  const gap = 40;
  const visibleCount = 5;

  let index = 0; // leftmost visible image

  function sizeViewport() {
    const imageWidth = images[0].offsetWidth;
    const viewportWidth = visibleCount * imageWidth + (visibleCount - 1) * gap;
    const viewport = document.querySelector(".viewport");
    viewport.style.width = `${viewportWidth}px`;
    update();
  }

  function update() {
    const imageWidth = images[0].offsetWidth;
    const trackWidth = images.length * imageWidth + (images.length - 1) * gap;
    const viewport = document.querySelector('.viewport');
    const maxOffset = trackWidth - viewport.offsetWidth;

    // Scroll so leftmost image is at index
    let offset = index * (imageWidth + gap);

    // Clamp offset so track never scrolls too far
    if (offset > maxOffset) offset = maxOffset;
    if (offset < 0) offset = 0;

    track.style.transform = `translateX(${-offset}px)`;
    track.style.transition = "transform 0.5s ease";

    updateActive();
  }

  function updateActive() {
    images.forEach(img => img.classList.remove("active", "near"));

    const imageWidth = images[0].offsetWidth;
    const viewport = document.querySelector('.viewport');
    const viewportCenter = viewport.offsetWidth / 2;

    // Find image closest to center of viewport
    let closestIndex = 0;
    let closestDist = Infinity;

    images.forEach((img, i) => {
      const imgLeft = i * (imageWidth + gap) - (index * (imageWidth + gap));
      const imgCenter = imgLeft + imageWidth / 2;
      const dist = Math.abs(viewportCenter - imgCenter);

      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = i;
      }
    });

    images[closestIndex].classList.add("active");
    if (images[closestIndex - 1]) images[closestIndex - 1].classList.add("near");
    if (images[closestIndex + 1]) images[closestIndex + 1].classList.add("near");
  }

  window.nextSlide = function() {
    const maxIndex = images.length - visibleCount;
    if (index < maxIndex) {
      index++;
      update();
    }
  };

  window.prevSlide = function() {
    if (index > 0) {
      index--;
      update();
    }
  };

  window.addEventListener("load", () => {
    sizeViewport();
    update();
  });

  window.addEventListener("resize", () => {
    sizeViewport();
  });
});
