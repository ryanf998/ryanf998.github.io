document.addEventListener("DOMContentLoaded", () => {
  const viewport = document.getElementById("viewport");
  const track = document.getElementById("artworks");
  const images = Array.from(track.children);

  const imageWidth = images[0].offsetWidth;
  const step = imageWidth + gap;
  
  const gap = 40;
  let centerIndex = 2; // middle image on load 

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

  function update() {
    const viewport = document.querySelector(".viewport");
    const viewportCenter = viewport.offsetWidth / 2;
  
    const trackCenter =
      centerIndex * step + imageWidth / 2;
  
    const offset = trackCenter - viewportCenter;
  
    const maxOffset =
      track.scrollWidth - viewport.offsetWidth;
  
    const clampedOffset = Math.max(0, Math.min(offset, maxOffset));
  
    track.style.transform = `translateX(${-clampedOffset}px)`;
  
    updateActive();
  }
  
  function updateActive() {
    images.forEach(img => img.classList.remove("active", "near"));
  
    images[centerIndex].classList.add("active");
  
    if (images[centerIndex - 1])
      images[centerIndex - 1].classList.add("near");
  
    if (images[centerIndex + 1])
      images[centerIndex + 1].classList.add("near");
  }

  window.nextSlide = function () {
    if (centerIndex < images.length - 1) {
      centerIndex++;
      update();
    }
  };
  
  window.prevSlide = function () {
    if (centerIndex > 0) {
      centerIndex--;
      update();
    }
  };
  
  // Initial state
  scrollToIndex(index);
});

