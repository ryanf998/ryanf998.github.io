document.addEventListener("DOMContentLoaded", () => {
  const viewport = document.getElementById("viewport");
  const track = document.getElementById("artworks");
  const images = Array.from(track.children);
  const gap = 10;
  const visibleFull = 5;   // number of fully visible images
  const peekRatio = 0.2;   // peek fraction on each side
  let index = 2;            // start center

  function baseWidth() {
    return images[0].offsetWidth;
  }

  function sizeViewport() {
    const vw = (visibleFull + 2 * peekRatio) * baseWidth() + (visibleFull - 1) * gap;
    viewport.style.width = `${vw}px`;
  }

  function scrollToIndex(i) {
    index = Math.max(0, Math.min(images.length - 1, i));
    const viewportCenter = viewport.offsetWidth / 2;
    const imgCenter = index * (baseWidth() + gap) + baseWidth() / 2;

    viewport.scrollTo({
      left: imgCenter - viewportCenter,
      behavior: "smooth"
    });

    updateSizes();
  }

  function updateSizes() {
    const full = baseWidth();
    images.forEach((img, idx) => {
      img.style.transition = "width 0.4s ease, opacity 0.4s ease";
      img.style.width = full * 0.8 + "px";  // default smaller
      img.style.opacity = "0.35";
    });

    // center image
    images[index].style.width = full + "px";
    images[index].style.opacity = "1";

    // immediate neighbors
    if (images[index - 1]) {
      images[index - 1].style.width = full * 0.9 + "px";
      images[index - 1].style.opacity = "0.6";
    }
    if (images[index + 1]) {
      images[index + 1].style.width = full * 0.9 + "px";
      images[index + 1].style.opacity = "0.6";
    }
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
