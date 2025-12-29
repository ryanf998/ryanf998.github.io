document.addEventListener("DOMContentLoaded", () => {
  const viewport = document.getElementById("viewport");
  const track = document.getElementById("artworks");
  const images = Array.from(track.children);
  const gap = 10;
  const visibleCount = 3;   // 3 full images
  const peekRatio = 0.2;    // peek on each side
  let index = 1;             // start center

  function imgWidth() { return images[0].offsetWidth; }

  function sizeViewport() {
    const vw = (visibleCount + 2 * peekRatio) * imgWidth() + (visibleCount - 1) * gap;
    viewport.style.width = `${vw}px`;
  }

  function scrollToIndex(i) {
    index = Math.max(0, Math.min(images.length - 1, i));
    const viewportCenter = viewport.offsetWidth / 2;
    const imgCenter = index * (imgWidth() + gap) + imgWidth() / 2;

    viewport.scrollTo({ left: imgCenter - viewportCenter, behavior: "smooth" });
    updateScale();
  }

  function updateScale() {
    images.forEach((img, idx) => {
      img.style.transition = "transform 0.4s ease, opacity 0.4s ease";
      img.style.opacity = "0.6";
      img.style.transform = "scale(0.85)";  // default small
    });

    // center image
    images[index].style.transform = "scale(1)";
    images[index].style.opacity = "1";

    // adjacent images
    if (images[index - 1]) { images[index - 1].style.transform = "scale(0.9)"; images[index - 1].style.opacity = "0.8"; }
    if (images[index + 1]) { images[index + 1].style.transform = "scale(0.9)"; images[index + 1].style.opacity = "0.8"; }
  }

  window.nextSlide = () => scrollToIndex(index + 1);
  window.prevSlide = () => scrollToIndex(index - 1);

  window.addEventListener("resize", () => { sizeViewport(); scrollToIndex(index); });

  sizeViewport();
  scrollToIndex(index);
});





