<template>
  <div>
    <p class="title">{{title}}</p>
    <div v-for="(match,index) in relatedMatches" :key="match.id">
      <div class="columns notification results">
        <div class="edit button is-primary is-small" v-if="match.result">
          <b-icon icon="edit" />
        </div>
        <div class="edit button is-primary-2 is-small" v-else>
          <b-icon icon="plus" />
        </div>
        <div class="column is-5 has-text-centered">
          <div class="title">{{match.home.user.name}}</div>
          <div class="subtitle">{{match.home.club.name}}</div>
        </div>
        <div class="column is-2" v-if="match.result">
          <div class="columns">
            <div class="column is-4 is-size-3 has-text-weight-bold has-text-centered">{{match.result.home}}</div>
            <div class="column is-4  has-text-centered">
              vs
            </div>
            <div class="column is-4 is-size-3 has-text-weight-bold has-text-centered">{{match.result.visitor}}</div>
          </div>
        </div>
        <div class="column is-2 has-text-centered" v-else>
          <div class="title is-size-7">vs</div>
        </div>
        <div class="column is-5 has-text-centered">
          <div class="title">{{match.visitor.user.name}}</div>
          <div class="subtitle">{{match.visitor.club.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as R from 'ramda';

export default {
  props: {
    contests: {
      type: Array,
      default: () => [],
    },
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
          R.descend(R.pipe(R.prop('updated'), d => new Date(d).getTime()))]),
        R.take(this.size),
      )(this.contests);
    },
  },
  name: 'matches',
};
</script>
<style lang="scss" scoped>
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
.notification {
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}
.column {
  // outline: 1px dashed rgba(255, 255, 255, 0.2);
}
</style>

