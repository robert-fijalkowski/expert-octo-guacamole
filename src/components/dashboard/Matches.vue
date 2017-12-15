<template>
  <div class="root">
    <p class="title">{{title}}</p>
    <div v-for="(match,index) in relatedMatches" :key="match.id">
      <div class="columns notification results">
        <div class="column is-5 has-text-centered">
          <div class="title">{{match.home.user.name}}</div>
          <div class="subtitle is-size-6">{{match.home.club.name}}</div>
        </div>
        <div class="column is-2" v-if="match.result">
          <div class="is-size-4 has-text-weight-bold has-text-centered" @click="modalScore(match)">
            {{match.result.home}}&nbsp;:&nbsp;{{match.result.visitor}}
          </div>
        </div>
        <div class="column is-2 has-text-centered" v-else>
          <div class="button is-primary-2 is-small" @click="modalScore(match)">
            <b-icon icon="plus" />
          </div>
          <div class="title is-size-7 versus">vs</div>
        </div>
        <div class="column is-5 has-text-centered">
          <div class="title">{{match.visitor.user.name}}</div>
          <div class="subtitle is-size-6">{{match.visitor.club.name}}</div>
        </div>
      </div>
    </div>
    <b-modal :active.sync="isSubmitActive" has-modal-card :canCancel="true">
      <ModalScore :match="selectedMatch" @submitted="(d) => handle('submitted')" />
    </b-modal>
  </div>
</template>

<script>
import * as R from 'ramda';
import ModalScore from './ModalScore';

export default {
  components: { ModalScore },
  data() {
    return {
      game: null,
      selectedMatch: null,
      isSubmitActive: false,
    };
  },
  props: {
    contests: {
      type: Array,
      default: () => [],
    },
    gameId: String,
    userId: String,
    title: String,
    completed: { type: Boolean, default: false },
    searchable: { type: Boolean, default: false },
    size: { type: Number, default: 5 },
  },
  computed: {
    relatedMatches() {
      const filterBy = this.completed ? R.reject : R.filter;
      return R.pipe(
        filterBy(R.propEq('status', 'SCHEDULED')),
        R.sortWith([
          R.descend(R.pipe(R.prop('updated'), d => new Date(d).getTime())),
        ]),
        R.take(this.size),
      )(this.contests);
    },
  },
  name: 'matches',
  methods: {
    modalScore(data) {
      this.selectedMatch = { ...data };
      this.isSubmitActive = true;
    },
    handle(action) {
      switch (action) {
        case 'submitted':
          this.isSubmitActive = false;
          // refresh profile
          return true;
        default:
          console.log('action', action);
          return true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.root {
  font-size: 80%;
}
.results {
  font-family: "Montserrat";
  letter-spacing: -1px;
  position: relative;
  .edit {
    position: absolute;
    right: 0.25rem;
    top: 0.25rem;
  }
}
.versus {
  margin-top: 0.25rem;
}
.notification {
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}
.column {
  // outline: 1px dashed rgba(255, 255, 255, 0.2);
  padding: 0.25rem;
}
</style>

