document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("artworks");
  const images = Array.from(track.children);
  const gap = 40;                // Gap between images
  const visibleCount = 5;        // Fixed number of images in viewport
  let index = 0;                  // Index of the leftmost visible image

  // --- SIZE VIEWPORT ---
  function sizeViewport() {
    const imageWidth = images[0].offsetWidth;
    const viewportWidth = visibleCount * imageWidth + (visibleCount - 1) * gap;
    document.querySelector(".viewport").style.width = `${viewportWidth}px`;
  }

  // --- UPDATE ACTIVE IMAGE ---
  function updateActive() {
    images.forEach(img => img.classList.remove("active", "near"));
    const centerIndex = index + Math.floor(visibleCount / 2);
    if (images[centerIndex]) {
      images[centerIndex].classList.add("active");
      if (images[centerIndex - 1]) images[centerIndex - 1].classList.add("near");
      if (images[centerIndex + 1]) images[centerIndex + 1].classList.add("near");
    }
  }

  // --- UPDATE TRACK POSITION ---
  function update() {
    const imageWidth = images[0].offsetWidth;
    const trackWidth = images.length * (imageWidth + gap) - gap; // total track width
    const viewport = document.querySelector('.viewport');
    const viewportWidth = viewport.offsetWidth;
  
    let translate = -index * (imageWidth + gap);
  
    // if the track is too short on the right, shift it back
    if (translate + trackWidth < viewportWidth) {
      translate = viewportWidth - trackWidth;
    }
  
    track.style.transform = `translateX(${translate}px)`;
  }

  window.nextSlide = function() {
    // max index = total images - 1 (so last image is at the right edge)
    const maxIndex = images.length - 1;
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

  // --- INITIALIZE ---
  sizeViewport();
  update();
  window.addEventListener("resize", () => {
    sizeViewport();
    update();
  });
});


