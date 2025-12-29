document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("artworks");
  const imagesOrig = Array.from(track.children);
  const gap = 40;
  const visibleCount = 5;
  const cloneCount = 2;

  // --- CLONE IMAGES FOR INFINITE LOOP ---
  const clonesStart = imagesOrig.slice(-cloneCount).map(img => {
    const clone = img.cloneNode(true);
    clone.dataset.clone = "true";
    return clone;
  });
  const clonesEnd = imagesOrig.slice(0, cloneCount).map(img => {
    const clone = img.cloneNode(true);
    clone.dataset.clone = "true";
    return clone;
  });

  // Clear track and re-insert correctly
  track.innerHTML = "";
  clonesStart.forEach(c => track.appendChild(c));
  imagesOrig.forEach(img => track.appendChild(img));
  clonesEnd.forEach(c => track.appendChild(c));

  let images = Array.from(track.children);
  const realCount = imagesOrig.length;
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
