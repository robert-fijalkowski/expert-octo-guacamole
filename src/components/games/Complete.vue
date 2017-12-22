<template>
  <div class="modal-card notification">
    <header class="modal-card-head">
      <p class="title is-centered">Completing a game</p>
      <p class="subtitle"> {{game.name}}, {{game.location}} </p>
    </header>
    <section class="modal-card-body  is-primary">
      <article>
        Completing a game is
        <span class="has-text-weight-bold">irrevertable</span> operataion!
      </article>
      <div class="columns is-multiline">
        <div class="column is-3">
          <b-field horizontal>
            <b-select placeholder="From">
              <option :value="a" v-for="a in game.competitorsSize" :key="a">{{a}}</option>
            </b-select>
          </b-field>
        </div>
        <div class=" column is-3 ">
          <b-field horizontal>
            <b-select placeholder="To">
              <option :value="a" v-for="a in game.competitorsSize" :key="a">{{a}}</option>
            </b-select>
          </b-field>
        </div>
        <div class="column is-6 ">Name</div>
        <div class="column is-3 "><input/></div>
        <div class="column is-3 ">To</div>
        <div class="column is-6 ">Name</div>
      </div>
    </section>
    <footer class="modal-card-foot ">
      <button class="button is-danger " type="button " @click="$parent.close(false) ">Abandon</button>
      <button class="button is-success is-pulled-right " @click="start ">Proceed starting
      </button>
    </footer>
  </div>
</template> 

<script>
export default {
  name: 'modal-complete',
  props: ['game'],
  data() {
    return { game: {} };
  },
  methods: {
    start() {
      this.$api('POST', `games/${this.game.id}/complete`)
        .then((game) => {
          this.$toast.open({ type: 'is-success', message: `Successfuly started a game ${game.name}` });
          this.$emit('started', game);
        })
        .catch((err) => {
          this.$toast.open({ type: 'is-danger', message: err.response.text });
        });
    },
    selected(club) {
      this.club = club;
    },
  },
};
</script>

<style lang="scss"  scoped>
@import "../../style/vars";
.modal-card-head {
  flex-direction: column;
}
.modal-card-body {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: $primary;
  color: $primary-invert;
  overflow-x: hidden;
  @media screen and (max-width: $tablet) {
    overflow: auto;
  }
}
</style>
