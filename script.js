document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("artworks");
  let images = Array.from(track.children);

  const gap = 40;          // gap between images
  const visibleCount = 5;  // how many images fit in viewport

  const cloneCount = 2;    // number of images to clone at start/end

  // --- CLONE IMAGES FOR INFINITE LOOP ---
  images.slice(-cloneCount).forEach(img => {
    const clone = img.cloneNode(true);
    clone.dataset.clone = "true";
    track.insertBefore(clone, track.firstChild);
  });

  images.slice(0, cloneCount).forEach(img => {
    const clone = img.cloneNode(true);
    clone.dataset.clone = "true";
    track.appendChild(clone);
  });

  // reassign images array
  images = Array.from(track.children);
  const realCount = images.length - cloneCount * 2;

  // initial index: first real image
  let index = cloneCount;

  // --- SIZE VIEWPORT ---
  function sizeViewport() {
    const imageWidth = images[0].offsetWidth;
    const viewportWidth = visibleCount * imageWidth + (visibleCount - 1) * gap;
    const viewport = document.querySelector(".viewport");
    viewport.style.width = `${viewportWidth}px`;
  }

  // --- UPDATE ACTIVE IMAGE ---
  function updateActive() {
    images.forEach(img => img.classList.remove("active", "near"));

    const imageWidth = images[0].offsetWidth;
    const trackTransform = -index * (imageWidth + gap) + 0.2 * imageWidth;

    const viewport = document.querySelector(".viewport");
    const viewportCenter = viewport.offsetWidth / 2;

    let closestIndex = 0;
    let closestDist = Infinity;

    images.forEach((img, i) => {
      const imgLeft = i * (imageWidth + gap) + trackTransform;
      const imgCenter = imgLeft + imageWidth / 2;
      const dist = Math.abs(viewportCenter - imgCenter);

      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = i;
      }
    });

    images[closestIndex].classList.add("active");
    if (images[closestIndex - 1]) images[closestIndex - 1].classList.add("near");
    if (images[closestIndex + 1]) images[closestIndex + 1].classList.add("near");
  }

  // --- UPDATE TRACK POSITION ---
  function update() {
    const imageWidth = images[0].offsetWidth;
    const peekOffset = 0.2 * imageWidth;
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(${-index * (imageWidth + gap) + peekOffset}px)`;
    updateActive();
  }

  // --- NEXT / PREV BUTTONS ---
  window.nextSlide = function() {
    index++;
    update();

    if (index >= realCount + cloneCount) {
      setTimeout(() => {
        track.style.transition = "none";
        index = cloneCount; // wrap to first real image
        update();
        setTimeout(() => track.style.transition = "transform 0.5s ease", 0);
      }, 500);
    }
  };

  window.prevSlide = function() {
    index--;
    update();

    if (index < cloneCount) {
      setTimeout(() => {
        track.style.transition = "none";
        index = realCount + cloneCount - 1; // wrap to last real image
        update();
        setTimeout(() => track.style.transition = "transform 0.5s ease", 0);
      }, 500);
    }
  };

  // --- INITIALIZE ---
  window.onload = () => {
    sizeViewport();
    update();
  };

  window.addEventListener("resize", () => {
    sizeViewport();
    update();
  });
});
