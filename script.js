document.addEventListener("DOMContentLoaded", () => {
  const viewport = document.querySelector(".viewport");
  const track = document.getElementById("artworks");
  const images = Array.from(track.children);

  const gap = 20;
  const visibleCount = 5;
  let index = 2; // center image on load

  function imageWidth() {
    return images[0].offsetWidth;
  }

  function sizeViewport() {
    const width =
      visibleCount * imageWidth() +
      (visibleCount - 1) * gap;

    viewport.style.width = `${width}px`;
  }

  function update() {
    const viewportCenter = viewport.offsetWidth / 2;

    const imageCenter =
      index * (imageWidth() + gap) + imageWidth() / 2;

    const offset = imageCenter - viewportCenter;

    const maxOffset =
      track.scrollWidth - viewport.offsetWidth;

    const clamped = Math.max(0, Math.min(offset, maxOffset));

    track.style.transform = `translateX(${-clamped}px)`;
    track.style.transition = "transform 0.45s ease";

    updateActive();
  }

  function updateActive() {
    images.forEach(img =>
      img.classList.remove("active", "near")
    );

    images[index]?.classList.add("active");
    images[index - 1]?.classList.add("near");
    images[index + 1]?.classList.add("near");
  }

  window.nextSlide = () => {
    if (index < images.length - 1) {
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
