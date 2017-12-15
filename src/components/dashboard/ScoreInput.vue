<template>
    <b-field
        :type="hasError()">
        <b-input type="number" maxlenght="3" min="0" max="999" v-model="score" size="is-large" :readonly="!isAdmin"
            @input="validate()">
        </b-input>
    </b-field>
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
    hasError() {
      return !this.isValid ? 'is-warning' : '';
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
