<template>
  <div class="notification is-primary">
    <p class="title">Create game</p>
    <section style="width: 80%">
      <b-field horizontal label="Name">
        <b-input v-model="newGame.name" expanded minlength="10"></b-input>
      </b-field>

      <b-field horizontal label="Location">
        <b-select v-model="newGame.location" placeholder="Select a location">
          <option value="Gdańsk" selected="true">Gdańsk</option>
          <option value="Kraków">Kraków</option>
          <option value="Stockholm">Stockholm</option>
        </b-select>
      </b-field>

      <b-field horizontal label="Description">
        <b-input v-model="description" type="textarea"></b-input>
      </b-field>

      <b-field horizontal label="">
        <b-checkbox v-model="newGame.ranked" type="textarea">
          <span>Ranked game</span>
        </b-checkbox>
      </b-field>
      <b-field horizontal>
        <p class="control">
          <button @click="create" class="button is-primary-2">
            Create
          </button>
        </p>
      </b-field>
      <p>&nbsp;</p>
    </section>
  </div>
</template>
<script>
export default {
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
    create() {
      this.$api('POST', '/games', this.newGame)
        .then((game) => {
          this.$toast.open({ type: 'is-success', message: `created game with id ${game.id}` });
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

