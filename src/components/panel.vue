<template>
  <div class="center">
    <div>
      <label>Текущая глубина:</label>
      <label>
        <strong>{{currentLength}}</strong>
      </label>
    </div>
    <div>
      <label>Самый ослабленный участок трубы:</label>
      <label>
        <strong>{{warningLength==0?'0':100-warningLength}}</strong>
      </label>
    </div>
    <div>
      <label>Действия:</label>
      <br />
      <a
        class="btn btn-primary"
        @touchstart="upMD"
        @mousedown="upMD"
        @touchend="resetTimer"
        @mouseup="resetTimer"
        @mouseleave="resetTimer"
      >Поднимать трубу</a>
      <br />
      <a
        class="btn btn-primary"
        @touchstart="downMD"
        @mousedown="downMD"
        @touchend="resetTimer"
        @mouseup="resetTimer"
        @mouseleave="resetTimer"
      >Опускать трубу</a>

      <br />
      <br />
      <br />
      <a class="btn btn-danger" @click="reset">Обнулить данные</a>
    </div>
  </div>
</template>
<script>
export default {
  props: ["move"],
  data() {
    return {
      timer: null,
      currentLength: 0,
      warningLength: 0
    };
  },
  computed: {},
  watch: {
    currentLength: function() {
      this.$store.state.tubeStore.tubePoints[100 - this.currentLength] -= 10;
      if (this.$store.state.tubeStore.tubePoints[100 - this.currentLength] < 20){
        alert("Внимание, труба на участке " + this.currentLength + "м вскоре сломается");
        this.resetTimer();
      }
      for (let i = 0; i < this.$store.state.tubeStore.tubePoints.length; i++) {
        if (
          this.$store.state.tubeStore.tubePoints[this.warningLength] >
          this.$store.state.tubeStore.tubePoints[i]
        )
          this.warningLength = i;
      }
    }
  },
  methods: {
    keyDown() {
      if (event.keyCode == 38) this.upMD();
      if (event.keyCode == 40) this.downMD();
      window.removeEventListener("keydown", this.keyDown);
      window.addEventListener("keyup", this.keyUp);
    },
    keyUp() {
      this.resetTimer();
      window.addEventListener("keydown", this.keyDown);
    },
    upMD() {
      let self = this;
      this.timer = setInterval(function() {
        if (self.currentLength > 0) {
          self.currentLength--;
          self.$emit("changeMove", -1);
        } else {
          self.resetTimer();
        }
      }, 100);
    },
    resetTimer() {
      clearInterval(this.timer);
      this.$emit("changeMove", 0);
    },
    downMD() {
      let self = this;
      this.timer = setInterval(function() {
        if (self.currentLength < 100) {
          self.currentLength++;
          self.$emit("changeMove", 1);
        } else {
          self.resetTimer();
        }
      }, 100);
    },
    reset() {
      for (let i = 0; i < 100; i++)
        this.$store.state.tubeStore.tubePoints[i] = 100;
      this.currentLength = 0;
      this.warningLength = 100;
    }
  },
  mounted() {
    window.addEventListener("keydown", this.keyDown);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.keyUp);
  }
};
</script>

<style scoped>
label {
  margin-left: 5px;
}
a {
  width: 200px;
  margin: 5px;
  color: white !important;
}
div{
  text-align: center;
}
</style>