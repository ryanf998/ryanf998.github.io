document.addEventListener("DOMContentLoaded", () => {
  const viewport = document.querySelector(".viewport");
  const track = document.getElementById("artworks");
  const images = Array.from(track.children);

  const gap = 40;
  const visibleCount = 5;
  let index = 2; // center image

  function imageWidth() {
    return images[0].offsetWidth;
  }

  // LOCK viewport width → ensures 0.2 | 1 | 1 | 1 | 0.2
  function sizeViewport() {
    const width =
      visibleCount * imageWidth() +
      (visibleCount - 1) * gap;
    viewport.style.width = `${width}px`;
  }

  function scrollToIndex(i) {
    index = Math.max(0, Math.min(images.length - 1, i));

    const viewportCenter = viewport.offsetWidth / 2;
    const imageCenter =
      index * (imageWidth() + gap) + imageWidth() / 2;

    viewport.scrollTo({
      left: imageCenter - viewportCenter,
      behavior: "smooth"
    });

    updateActive();
  }

  function updateActive() {
    images.forEach(img => img.classList.remove("active", "near"));

    images[index]?.classList.add("active");
    images[index - 1]?.classList.add("near");
    images[index + 1]?.classList.add("near");
  }

  window.nextSlide = () => scrollToIndex(index + 1);
  window.prevSlide = () => scrollToIndex(index - 1);

  window.addEventListener("resize", () => {
    sizeViewport();
    scrollToIndex(index);
  });

  sizeViewport();
  scrollToIndex(index);
});
