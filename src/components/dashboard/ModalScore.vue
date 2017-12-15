<template>
  <div class="modal-card notification">
    <header class="modal-card-head">
      <p class="title is-centered">Score</p>
    </header>
    <section class="modal-card-body is-primary">
      <div class="columns">
        <div class="column has-text-centered score-input">
          <div class="title is-size-5 has-text-centered">{{match.home.user.name}}</div>
          <div class="subtitle is-size-6">{{match.home.club.name}}</div>
          <ScoreInput :initScore="score.home" @score="v => {score.home=v}" @isValid="v=> {valid.home = v}" />
        </div>
        <div class="column is-1 is-size-1 has-text-weight-bold has-text-centered score-separator">
          :
        </div>
        <div class="column has-text-centered score-input">
          <div class="title is-size-5 has-text-centered">{{match.visitor.user.name}}</div>
          <div class="subtitle is-size-6">{{match.visitor.club.name}}</div>
          <ScoreInput :initScore="score.visitor" @score="v => {score.visitor=v}" @isValid="v=> {valid.visitor = v}" />
        </div>
      </div>
      <p class="help is-warning has-text-centered" v-if="!isValid">How many goals you shot?</p>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-danger" @click="$parent.close(false)">Close</button>
      <button class="button is-success is-pulled-right" v-if="isChangeable && isValid" @click="submitScore()">Submit</button>
    </footer>
  </div>
</template> 

<script>
import * as R from 'ramda';
import { mapGetters } from 'vuex';
import ScoreInput from './ScoreInput';

export default {
  components: { ScoreInput },
  name: 'modal-score',
  props: {
    match: { type: Object },
  },
  data() {
    const result = R.path(['match', 'result'], this) || {};
    return {
      score: {
        home: result.home || 0,
        visitor: result.visitor || 0,
      },
      valid: {
        home: true,
        visitor: true,
      },
    };
  },
  computed: {
    ...mapGetters(['isAdmin']),
    isValid() {
      return this.valid.home && this.valid.visitor;
    },
    isChangeable() {
      return this.match.status !== 'PLAYED' || this.isAdmin;
    },
  },
  methods: {
    submitScore() {
      this.$api('POST', `games/${this.match.gid.id}/schedule/${this.match.id}`, { result: this.score, status: 'PLAYED' })
        .then((match) => {
          this.$toast.open({ type: 'is-success', message: `Successfuly submited to ${match.name}` });
          this.$emit('submitted');
        })
        .catch((err) => {
          this.$toast.open({ type: 'is-danger', message: err.response.text });
        });
    },
  },
};
</script>

<style lang="scss">
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
.score-separator {
  line-height: 2.5rem;
}
.score-input {
  .field {
    width: 100px;
    display: inline-block;
    .control {
      input {
        border: 0 none;
        background: $primary;
        color: $primary-invert;
        margin-right: 2.25rem;
        padding-right: $control-padding-horizontal;
        text-align: center;
      }
      .icon {
        right: -2.25rem;
      }
    }
  }
}
</style>
