<script>
  const track = document.getElementById("artworks");
  const images = track.children;
  const imageWidth = 340; // image + gap
  let index = 1; // start centered

  function update() {
    track.style.transform =
      `translateX(-${index * imageWidth - imageWidth}px)`;
  }

  function next() {
    if (index < images.length - 1) {
      index++;
      update();
    }
  }

  function prev() {
    if (index > 0) {
      index--;
      update();
    }
  }

  update();
</script>
