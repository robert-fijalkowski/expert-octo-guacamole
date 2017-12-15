<template>
  <div class="columns is-flex">
    <div class="column is-narrow">
      <button :disabled="score <= 0" @click="modify(-1)" class="button is-primary-2 is-large">
        <b-icon icon="minus"></b-icon>
      </button>
    </div>
    <div class="column">
      <b-field :type="hasError()">
        <b-input type="number" v-model="score" size="is-large" :readonly="!isAdmin" @input="validate()">
        </b-input>
      </b-field>
    </div>
    <div class="column is-narrow">
      <button :disabled="score >= 999" @click="modify(+1)" class="button is-primary-2 is-large">
        <b-icon icon="plus"></b-icon>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'score-input',
  props: ['initScore'],
  data() {
    return {
      score: this.initScore || 0,
      isValid: true,
    };
  },
  computed: {
    ...mapGetters(['isAdmin']),
  },
  methods: {
    validate() {
      this.isValid = /^\d+/.test(this.score);
      this.$emit('isValid', this.isValid);
      if (this.isValid) {
        this.$emit('score', Number(this.score));
      }
    },
    modify(by) {
      this.score = Number(this.score) + by;
      this.validate();
    },
    hasError() {
      return !this.isValid ? 'is-warning' : '';
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
