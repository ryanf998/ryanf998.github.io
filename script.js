document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("artworks");
  const images = Array.from(track.children);
  const gap = 40;
  const visibleCount = 5;

  let index = 0; // leftmost visible image

  // --- SIZE VIEWPORT ---
  function sizeViewport() {
    const imageWidth = images[0].offsetWidth;
    const viewportWidth = visibleCount * imageWidth + (visibleCount - 1) * gap;
    const viewport = document.querySelector(".viewport");
    viewport.style.width = `${viewportWidth}px`;
    update(); // reposition track after resize
  }

  // --- UPDATE TRACK POSITION ---
  function update() {
    const imageWidth = images[0].offsetWidth;
    const trackWidth = images.length * imageWidth + (images.length - 1) * gap;
    const viewport = document.querySelector('.viewport');
    const maxOffset = trackWidth - viewport.offsetWidth;
  
    let offset = index * (imageWidth + gap) - (viewport.offsetWidth / 2 - imageWidth / 2);
  
    // Clamp offset so we don’t scroll past edges
    if (offset < 0) offset = 0;
    if (offset > maxOffset) offset = maxOffset;
  
    track.style.transform = `translateX(${-offset}px)`;
    track.style.transition = "transform 0.5s ease";
  
    updateActive();
  }


  // --- HIGHLIGHT CENTER IMAGE ---
  function updateActive() {
    images.forEach(img => img.classList.remove("active", "near"));

    const imageWidth = images[0].offsetWidth;
    const viewport = document.querySelector('.viewport');
    const viewportCenter = viewport.offsetWidth / 2;

    // Compute each image center relative to viewport
    let closestIndex = 0;
    let closestDist = Infinity;

    images.forEach((img, i) => {
      const imgLeft = i * (imageWidth + gap) - (-index * (imageWidth + gap));
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

  // --- BUTTONS ---
  window.nextSlide = function() {
    const maxIndex = images.length - visibleCount; // rightmost scrollable index
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
  window.addEventListener("load", () => {
    sizeViewport();
    update();
  });

  window.addEventListener("resize", () => {
    sizeViewport();
  });
});

