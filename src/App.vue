<template>
  <div id="app">
    <div class="navbar navbar-dark bg-dark box-shadow">
      <div class="container d-flex justify-content-between">
        <a href="#" class="navbar-brand d-flex align-items-center">
          <strong>Демо-колтюбинг</strong>
        </a>
      </div>
    </div>
    <br />
    <div class="d-none d-sm-none d-md-none d-lg-block">
      <br />
      <br />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-lg-6">
          <div class="row">
            <div class="col-10">
              <CoilImage :move="move" />
            </div>
            <div class="col-2">
              <TubeImage ref="tubeImage" />
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-lg-6">
          <Panel :move="move" @changeMove="changeMove" />
        </div>
      </div>
    </div>
    <div class="container">
      <br/>
    <p>P.S. Данная пример является примитивной моделью расчета выработки трубы для колтюбинга. 
      Кнопками Поднимать/Опускать трубу или клавишами на клавиатуре стрелка вверх/вниз можно 
      моделировать подъем/опукание трубы. Во время движения труба испытывает 
      повреждения при изгибах. Данная модель визуализирует какой участок трубы испытывает 
      наибольшие повреждения.</p>
      <p>Зеленая полоска отображает состояния участков трубы. При движение трубы каждый участок 
        теряет прочность, при этом цвет в этом месте будет постепенно изменяться на красный. При
        достижении минимального порога, будет выведено сообщение о вероятной поломке.
      </p>
      <p>Данная модель учитывает только повреждения за счет перелома верхнего блока. В дальнейшем
        планируется использовать все возможные факторы износа трубы, такие как: масса опускаемой трубы, 
        мощности опускания и подъема трубы, диаметр барабана и блоков, изгибы в скважине и т.д.
      </p>
    </div>
  </div>
</template>

<script>
import CoilImage from "./components/image";
import TubeImage from "./components/tubeImage";
import Panel from "./components/panel";

export default {
  components: {
    CoilImage,
    TubeImage,
    Panel
  },
  data() {
    return {
      move: 0
    };
  },
  methods: {
    test() {
      console.log(this.$store.state.tubeStore.tubePoints);
    },
    changeMove: function(val) {
      this.move = val;
    }
  },
  beforeMount() {
    for (let i = 0; i < 100; i++)
      this.$store.state.tubeStore.tubePoints.push(100);
  }
};
</script>

<style>
</style>
