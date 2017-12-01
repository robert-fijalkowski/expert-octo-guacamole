<template>
  <div>
    <p class="title">Form</p>
    <h2>{{doneMatches.length}}</h2>
    <div v-for="(match,index) in doneMatches" :key="match.id">
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
    size: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    doneMatches() {
      return R.filter(R.propEq('status', 'SCHEDULED'))(this.contests);
    },
  },
  name: 'game-form',
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

