document.addEventListener("DOMContentLoaded", () => {
  const viewport = document.getElementById("viewport");
  const track = document.getElementById("artworks");
  const images = Array.from(track.children);
  const gap = 10;
  const visibleCount = 3;   // 3 full images
  const peekRatio = 0.2;    // peek on each side
  let index = 1;             // start with second image centered

  function imgWidth() {
    return images[0].offsetWidth;
  }

  // Set viewport width for 3 full images + 0.2 peek each side
  function sizeViewport() {
    const vw = (visibleCount + 2 * peekRatio) * imgWidth() + (visibleCount - 1) * gap;
    viewport.style.width = `${vw}px`;
  }

  // Scroll to the selected index
  function scrollToIndex(i) {
    index = Math.max(0, Math.min(images.length - 1, i));
    const viewportCenter = viewport.offsetWidth / 2;
    const imgCenter = index * (imgWidth() + gap) + imgWidth() / 2;

    viewport.scrollTo({
      left: imgCenter - viewportCenter,
      behavior: "smooth"
    });

    updateScale();
  }

  // Update scaling and opacity for center + adjacent images
  function updateScale() {
    images.forEach((img, idx) => {
      img.style.transition = "transform 0.4s ease, opacity 0.4s ease";
      img.style.transform = "scale(0.8)";
      img.style.opacity = "0.35";
    });

    // center image
    images[index].style.transform = "scale(1)";
    images[index].style.opacity = "1";

    // adjacent images
    if (images[index - 1]) {
      images[index - 1].style.transform = "scale(0.9)";
      images[index - 1].style.opacity = "0.6";
    }
    if (images[index + 1]) {
      images[index + 1].style.transform = "scale(0.9)";
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
