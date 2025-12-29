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
  
    const imageWidth = images[0].offsetWidth;
    const gap = 40;
    const viewport = document.querySelector('.viewport');
    const viewportCenter = viewport.offsetWidth / 2;
  
    // Find image whose center is closest to viewport center
    let closestIndex = 0;
    let closestDist = Infinity;
  
    images.forEach((img, i) => {
      const imgLeft = i * (imageWidth + gap) - track.offsetLeft;
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


