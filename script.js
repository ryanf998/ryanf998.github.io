document.addEventListener("DOMContentLoaded", () => {
  const viewport = document.querySelector(".viewport");
  const track = document.getElementById("artworks");
  const images = Array.from(track.children);

  const gap = 40;
  let centerIndex = 2; // start centered

  function step() {
    return images[0].offsetWidth + gap;
  }

  function update() {
    const viewportCenter = viewport.offsetWidth / 2;

    const trackCenter =
      centerIndex * step() + images[0].offsetWidth / 2;

    const offset = trackCenter - viewportCenter;

    const maxOffset =
      track.scrollWidth - viewport.offsetWidth;

    const clampedOffset = Math.max(0, Math.min(offset, maxOffset));

    track.style.transform = `translateX(${-clampedOffset}px)`;
    track.style.transition = "transform 0.45s ease";

    updateActive();
  }

  function updateActive() {
    images.forEach(img =>
      img.classList.remove("active", "near")
    );

    images[centerIndex]?.classList.add("active");
    images[centerIndex - 1]?.classList.add("near");
    images[centerIndex + 1]?.classList.add("near");
  }

  window.nextSlide = () => {
    if (centerIndex < images.length - 1) {
      centerIndex++;
      update();
    }
  };

  window.prevSlide = () => {
    if (centerIndex > 0) {
      centerIndex--;
      update();
    }
  };

  window.addEventListener("resize", update);

  update(); // initial render
});
