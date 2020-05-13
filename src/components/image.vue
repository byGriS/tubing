<template>
  <div ref="wrapImage">
    <canvas ref="canvas" /> 
  </div>
</template>

<script>
import img1 from "../assets/tubing1.png";
import img2 from "../assets/tubing2.png";
import img3 from "../assets/tubing3.png";

export default {
  props: ["move"],
  data() {
    return {
      timer: null,
      imgs: [],
      indexImage: 0,
    };
  },
  methods: {
    drawImage() {
      if ((this.move == 0)) this.indexImage = 0;
      if ((this.move == 1)) {
        this.indexImage++;
        if (this.indexImage > 2) this.indexImage = 0;
      }
      if ((this.move == -1)) {
        this.indexImage--;
        if (this.indexImage < 0) this.indexImage = 2;
      }
      let h, w;
      let canvas = this.$refs.canvas;
      let wrapCanvas = this.$refs.wrapImage;
      let context = canvas.getContext("2d");
      w = wrapCanvas.clientWidth;
      canvas.width = w;
      h = w * 0.84;
      canvas.height = h;
      context.drawImage(this.imgs[this.indexImage], 0, 0, w, h);
    }
  },
  mounted() {
    window.removeEventListener("resize", this.drawImage);
    clearInterval(this.timer);
    this.imgs.push(new Image());
    this.imgs[0].src = img1;
    this.imgs.push(new Image());
    this.imgs[1].src = img2;
    this.imgs.push(new Image());
    this.imgs[2].src = img3;
    this.drawImage();
    var self = this;
    this.timer = setInterval(function() {
      self.drawImage();
    }, 500);
    window.addEventListener("resize", this.drawImage);
  },
  beforeDestroy(){
    window.removeEventListener("resize", this.drawImage);
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
img {
  display: none;
}
</style>