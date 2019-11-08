var app = new Vue({
  el: '#app',
  data: {
    tablero: nuevoTablero(4),
    puntos: 0
  },

  mounted() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  },

  methods: {
    handleKeyDown(event) {
      if (event.keyCode >= 37 && event.keyCode <= 40) {
        event.preventDefault();
        var direccion = event.keyCode - 37;
        mover(this.tablero, direccion);
      }else if(event.key === 'r'){
        this.reiniciar();
      }
    },

    getClass : function(ficha){
      return `celda llena f${ficha.f} c${ficha.c} v${ficha.v}`
    },

    reiniciar: function(){
      this.tablero = nuevoTablero(4);
    }
  },

  computed: {
    fichas: function(){
      return this.tablero.fichas.flat().filter(e => e.v > 0);
    },
    puntosAnim: function(){
      return this.puntos.toFixed(0)
    }
  },

  watch: {
    'tablero.puntos': function(valorNuevo){
      TweenLite.to(this.$data, 0.5, { puntos: valorNuevo});
    }
  }
})