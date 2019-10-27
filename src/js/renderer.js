var app = new Vue({
  el: '#app',
  data: {
    tablero: nuevoTablero(4)
  },

  mounted() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  },

  methods: {
    handleKeyDown(event) {
      if (event.keyCode >= 37 && event.keyCode <= 40) {
        event.preventDefault();
        var direction = event.keyCode - 37;
        mover(this.tablero, direction);
      }
    },

    calcularClase : function(ficha){
      return `celda llena f${ficha.f} c${ficha.c} v${ficha.v}`
    }
  },

  computed: {
    fichasValidas: function(){
        return this.tablero.fichas.flat().filter(e => e.v > 0);
    }
  }
})