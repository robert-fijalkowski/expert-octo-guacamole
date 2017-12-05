<template>
  <div class="notification">

  </div>
</template>
<script>
import * as R from 'ramda';
import { mapGetters } from 'vuex';

export default {
  props: ['game'],
  name: 'game-table',
  computed: {
    ...mapGetters(['id', 'isAdmin']),
  },
};
</script>
<style lang="scss">

</style>
