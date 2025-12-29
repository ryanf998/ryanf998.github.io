document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("artworks");
  
  // --- CLONE IMAGES FOR INFINITE LOOP ---
  let images = Array.from(track.children);
  
  // Clone last 2 images to the start
  images.slice(-2).forEach(img => {
    const clone = img.cloneNode(true);
    track.insertBefore(clone, track.firstChild);
  });
  
  // Clone first 2 images to the end
  images.slice(0, 2).forEach(img => {
    const clone = img.cloneNode(true);
    track.appendChild(clone);
  });
  
  // Re-assign images array after cloning
  images = Array.from(track.children);
  
  // --- INITIAL INDEX ---
  let index = 2; // first real image

  
  
  const gap = 40;
  const visibleCount = 5;
  const peekRatio = 0.3;

  function sizeViewport() {
    const imageWidth = images[0].offsetWidth;
  
    const viewportWidth =
      visibleCount * imageWidth +
      (visibleCount - 1) * gap;
  
    document.querySelector(".viewport").style.width = `${viewportWidth}px`;
  }

  window.nextSlide = function () {
    index++;
    update();
  
    // If reached clone at the end, jump to original start
    if (index >= images.length - 2) { // last 2 are clones
      setTimeout(() => {
        track.style.transition = "none"; // remove animation
        index = 2; // first real image
        update();
        setTimeout(() => track.style.transition = "transform 0.5s ease", 0);
      }, 500); // match transition duration
    }
  };

  window.prevSlide = function () {
    index--;
    update();
  
    // If reached clone at start, jump to original end
    if (index < 0) { // first 2 are clones
      setTimeout(() => {
        track.style.transition = "none"; // remove animation
        index = images.length - visibleCount - 2; // last real images
        update();
        setTimeout(() => track.style.transition = "transform 0.5s ease", 0);
      }, 500);
    }
  };

  function updateActive() {
    [...images].forEach(img => {
      img.classList.remove("active", "near");
    });
  
    const center = index + Math.floor(visibleCount / 2);
  
    const active = images[center];
    if (!active) return;
  
    active.classList.add("active");
  
    if (images[center - 1]) images[center - 1].classList.add("near");
    if (images[center + 1]) images[center + 1].classList.add("near");
  }
  
  function update() {
    const imageWidth = images[0].offsetWidth;
  
    // translate track so the first image aligns after left peek
    const peekOffset = 0.2 * imageWidth;
    track.style.transform = `translateX(${-index * (imageWidth + gap) + peekOffset}px)`;
  
    updateActive();
  }

  sizeViewport();
  update();
  window.addEventListener("resize", sizeViewport);
});







