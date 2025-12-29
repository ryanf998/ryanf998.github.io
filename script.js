document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("artworks");
  let images = Array.from(track.children);

  const gap = 40;
  const visibleCount = 5;
  const cloneCount = 2;

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

  images = Array.from(track.children);
  const realCount = images.length - cloneCount * 2;

  let index = cloneCount; // first real image

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
    const peekOffset = 0.2 * imageWidth;
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(${-index * (imageWidth + gap) + peekOffset}px)`;
    updateActive();
  }

  // --- BUTTONS ---
  window.nextSlide = () => {
    index++;
    update();
    if (index >= realCount + cloneCount) {
      setTimeout(() => {
        track.style.transition = "none";
        index = cloneCount;
        update();
        setTimeout(() => track.style.transition = "transform 0.5s ease", 0);
      }, 500);
    }
  };

  window.prevSlide = () => {
    index--;
    update();
    if (index < cloneCount) {
      setTimeout(() => {
        track.style.transition = "none";
        index = realCount + cloneCount - 1;
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
