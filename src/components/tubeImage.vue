<template>
  <div ref="wrapImage" id="wrapImage">
    <canvas ref="canvas" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      timer: null
    };
  },
  methods: {
    drawImage() {
      var h, w;
      var canvas = this.$refs.canvas;
      canvas.height = 0;
      var wrapCanvas = this.$refs.wrapImage;
      var context = canvas.getContext("2d");
      w = wrapCanvas.clientWidth;
      h = wrapCanvas.clientHeight;
      canvas.width = w;
      canvas.height = h - 6;
      for (let i = 0; i < this.$store.state.tubeStore.tubePoints.length; i++) {
        let color = "";
        if (this.$store.state.tubeStore.tubePoints[i] > 50) {
          let value =
            150 -
            Math.floor(
              (150 / 50) * (this.$store.state.tubeStore.tubePoints[i] - 50)
            );
          color = "rgb(" + value + ",150,0)";
        } else {
          let value = Math.floor(
            (150 / 50) * (this.$store.state.tubeStore.tubePoints[i])
          );
          color = "rgb(150," + value + ",0, 5)";
        }
        context.lineWidth = 5;
        context.strokeStyle = color;
        context.strokeRect(
          0,
          (h / this.$store.state.tubeStore.tubePoints.length) * i,
          w*0.5,
          h / this.$store.state.tubeStore.tubePoints.length
        );
      }
    }
  },
  mounted() {
    window.removeEventListener("resize", this.drawImage);
    clearInterval(this.timer);
    this.drawImage();
    var self = this;
    this.timer = setInterval(function() {
      self.drawImage();
    }, 500);
    window.addEventListener("resize", this.drawImage);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.drawImage);
    clearInterval(this.timer);
  }
};
</script>
<style scoped>
#wrapImage {
  padding: 0;
  height: 100%;
}
</style>