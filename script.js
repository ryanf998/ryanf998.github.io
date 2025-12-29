document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("artworks");
  
  // --- CLONE IMAGES FOR INFINITE LOOP ---
  let images = Array.from(track.children);

  // Clone last 2 to start
  images.slice(-2).forEach(img => {
    const clone = img.cloneNode(true);
    clone.dataset.clone = "true"; // mark clones
    track.insertBefore(clone, track.firstChild);
  });

  // Clone first 2 to end
  images.slice(0, 2).forEach(img => {
    const clone = img.cloneNode(true);
    clone.dataset.clone = "true";
    track.appendChild(clone);
  });

  // Re-assign images array
  images = Array.from(track.children);

  const realCount = images.length - 4; // total minus 2 clones at start + 2 at end

  // --- INITIAL INDEX ---
  let index = 2; // first real image

  const gap = 40;
  const visibleCount = 5;

  function sizeViewport() {
    const imageWidth = images[0].offsetWidth;
    const viewportWidth = visibleCount * imageWidth + (visibleCount - 1) * gap;
    document.querySelector(".viewport").style.width = `${viewportWidth}px`;
  }

  function updateActive() {
    images.forEach(img => img.classList.remove("active", "near"));

    const center = index + Math.floor(visibleCount / 2);
    const active = images[center];

    if (!active) return;

    // Only highlight real images
    if (!active.dataset.clone) {
      active.classList.add("active");
      if (images[center - 1]) images[center - 1].classList.add("near");
      if (images[center + 1]) images[center + 1].classList.add("near");
    }
  }

  function update() {
    const imageWidth = images[0].offsetWidth;
    const peekOffset = 0.2 * imageWidth; // 0.2 image visible on left
  
    track.style.transform = `translateX(${-index * (imageWidth + gap) + peekOffset}px)`;
    updateActive();
  }

  window.nextSlide = function() {
    index++;
    update();
  
    if (index >= realCount + 2) { // +2 because first two are clones
      setTimeout(() => {
        track.style.transition = "none";
        index = 2; // first real image
        update();
        setTimeout(() => track.style.transition = "transform 0.5s ease", 0);
      }, 500);
    }
  };

  window.prevSlide = function() {
    index--;
    update();
  
    if (index < 2) { // first two are clones
      setTimeout(() => {
        track.style.transition = "none";
        index = realCount + 1; // last real image
        update();
        setTimeout(() => track.style.transition = "transform 0.5s ease", 0);
      }, 500);
    }
  };

  sizeViewport();
  update();
  window.addEventListener("resize", sizeViewport);
});



