<script>
const track = document.getElementById("artworks");
const images = track.children;
const imageWidth = 340; // width + gap
let index = 0;

function update() {
  track.style.transform = `translateX(-${index * imageWidth}px)`;
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
