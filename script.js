<script>
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("artworks");
  const images = track.children;

  const imageWidth = 300;
  const gap = 40;
  const step = imageWidth + gap;

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

</script>



