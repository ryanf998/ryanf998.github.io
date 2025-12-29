document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("artworks");
  const images = track.children;

  const gap = 40;

  function getStep() {
    return track.children[0].offsetWidth + gap;
  }
  
  function update() {
    track.style.transform = `translateX(-${index * getStep()}px)`;
  }

  let index = 0;
  const visibleCount = 2;

  window.next = function () {
    if (index < images.length - visibleCount) {
      index++;
      update();
    }
  };

  window.prev = function () {
    if (index > 0) {
      index--;
      update();
    }
  };

  function update() {
    track.style.transform = `translateX(-${index * step}px)`;
  }

  update();
});
