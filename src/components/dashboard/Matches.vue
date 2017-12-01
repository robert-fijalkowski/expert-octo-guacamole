<template>
  <div>
    <p class="title">{{title}}</p>
    <h2>{{relatedMatches.length}}</h2>
    <div v-for="(match,index) in relatedMatches" :key="match.id">
      {{match.home}} vs {{match.visitor}}
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
    completed: {
      type: Boolean,
      default: false,
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    relatedMatches() {
      const filterBy = this.completed ? R.filter : R.reject;
      return filterBy(R.propEq('status', 'SCHEDULED'))(this.contests);
    },
  },
  name: 'matches',
};
</script>
<style lang="scss" scoped>
.win {
  background-color: #3a3;
}
.draw {
  background-color: #ec3;
}
.lose {
  background-color: #e33;
}
.fill {
  background-color: #aaa;
}
</style>

