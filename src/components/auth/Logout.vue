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
    this.isLoading = false;
    this.$router.push('/about');
    this.logout(event.data.jwt);
  },
  data() {
    return {
    };
  },
};
</script>
<style lang="scss" scoped>
iframe {
  width: 100%;
  border: 1px solid red;
}
</style>
