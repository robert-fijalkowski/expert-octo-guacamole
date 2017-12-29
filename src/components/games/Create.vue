<template>
  <div class="notification is-primary">
    <Properties @submit="create" />
  </div>
</template>
<script>
import Properties from './Properties';

export default {
  components: { Properties },
  name: 'create-game',
  data() {
    return {
      newGame: {
        name: '',
        location: 'Gdańsk',
        ranked: false,
        description: '',
      },
      response: '',
    };
  },
  methods: {
    create(newGame) {
      this.$api('POST', '/games', newGame)
        .then((game) => {
          this.$toast.open({ type: 'is-success', message: `created game with id ${game.id}` });
          this.$router.push(`/games/${game.id}`);
        }).catch((err) => {
          this.$toast.open({ type: 'is-danger', message: err.response.text });
        });
      this.response = 'faled';
    },
  },
};
</script>
<style lang="scss">
@import "../../style/vars.scss";
.label {
  color: $primary-invert;
}
</style>

