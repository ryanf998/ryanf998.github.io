document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("artworks");
  let images = Array.from(track.children);

  const gap = 40;
  const visibleCount = 5;

  // --- CLONE IMAGES FOR INFINITE LOOP ---
  images.slice(-2).forEach(img => {
    const clone = img.cloneNode(true);
    clone.dataset.clone = "true";
    track.insertBefore(clone, track.firstChild);
  });

  images.slice(0, 2).forEach(img => {
    const clone = img.cloneNode(true);
    clone.dataset.clone = "true";
    track.appendChild(clone);
  });

  images = Array.from(track.children);
  const realCount = images.length - 4; // total images minus 2 start + 2 end clones
  let index = 2; // first real image

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
    const center = index + Math.floor(visibleCount / 2);
    const active = images[center];
    if (!active) return;

    active.classList.add("active");
    if (images[center - 1]) images[center - 1].classList.add("near");
    if (images[center + 1]) images[center + 1].classList.add("near");
  }

  // --- UPDATE TRACK POSITION ---
  function update() {
    const imageWidth = images[0].offsetWidth;
    const peekOffset = 0.2 * imageWidth; // left peek
    track.style.transform = `translateX(${-index * (imageWidth + gap) + peekOffset}px)`;
    track.style.transition = "transform 0.5s ease";
    updateActive();
  }

  // --- NEXT / PREV BUTTONS ---
  window.nextSlide = function() {
    index++;
    update();
    if (index >= realCount + 2) { 
      setTimeout(() => {
        track.style.transition = "none";
        index = 2;
        update();
        setTimeout(() => track.style.transition = "transform 0.5s ease", 0);
      }, 500);
    }
  };

  window.prevSlide = function() {
    index--;
    update();
    if (index < 2) { 
      setTimeout(() => {
        track.style.transition = "none";
        index = realCount + 1;
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

