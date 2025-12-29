<script>
const track = document.getElementById("artworks");
const images = track.children;
const gap = 40; // same as CSS gap
let index = 0;

function update() {
  const imageWidth = images[0].offsetWidth; // current image width
  track.style.transform = `translateX(-${index * (imageWidth + gap)}px)`;
}

function next() {
  if (index < images.length - 3) { // 3 images visible (peek style)
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

// initialize
update();
</script>


