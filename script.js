document.addEventListener("DOMContentLoaded", () => {
  const viewport = document.getElementById("viewport");
  const track = document.getElementById("artworks");
  const images = Array.from(track.children);

  const gap = 40;
  let index = 2; // start centered (5 visible → middle = 2)

  function imageWidth() {
    return images[0].offsetWidth + gap;
  }

  function scrollToIndex(i) {
    index = Math.max(0, Math.min(images.length - 1, i));
    viewport.scrollTo({
      left: index * imageWidth(),
      behavior: "smooth"
    });
    updateActive();
  }

  function updateActive() {
    images.forEach(img => img.classList.remove("active", "near"));

    images[index].classList.add("active");
    if (images[index - 1]) images[index - 1].classList.add("near");
    if (images[index + 1]) images[index + 1].classList.add("near");
  }

  window.nextSlide = () => {
    scrollToIndex(index + 1);
  };

  window.prevSlide = () => {
    scrollToIndex(index - 1);
  };

  // Initial state
  scrollToIndex(index);
});
