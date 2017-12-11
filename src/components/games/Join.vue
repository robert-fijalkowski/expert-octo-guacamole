<template>
  <div class="modal-card notification">
    <header class="modal-card-head">
      <p class="title is-centered">Join to game</p>
      <p class="subtitle"> {{game.name}}, {{game.location}} </p>
    </header>
    <section class="modal-card-body notification is-primary">
      <Search :has-deep-search="false" :selected="selected" simple :limit="21" />
    </section>
    <footer class="modal-card-foot">
      <button class="button is-danger" type="button" @click="$parent.close(false)">Abandon</button>
      <button class="button is-warning is-pulled-right" @click="join" v-if="club">
        <span>Join</span>
        <span class="is-hidden-mobile">&nbsp;as {{club.name}}</span>
      </button>
    </footer>
  </div>
</template> 

<script>
import { mapGetters } from 'vuex';
import Search from '@/components/clubs/Search';

export default {
  components: { Search },
  name: 'modal-join',
  props: ['gameId', 'fullGame'],
  data() {
    return { game: {}, club: null };
  },
  created() {
    if (this.fullGame) {
      this.game = this.fullGame;
    } else {
      this.$api('GET', `/games/${this.gameId}`)
        .then((game) => { this.game = game; });
    }
  },
  computed: { ...mapGetters({ uid: 'id' }) },
  methods: {
    join() {
      this.$api('POST', `games/${this.game.id}/competitors`, { uid: this.uid, club: this.club.id })
        .then((game) => {
          this.$emit('joined', game);
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
</style>
