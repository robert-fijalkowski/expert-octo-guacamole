<template>
  <div></div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'log-out',
  methods: {
    ...mapActions(['logout']),
  },
  mounted() {
    this.$router.push('/about');
    this.logout();
  },
};
</script>