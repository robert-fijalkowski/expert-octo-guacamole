<template>
  <div>
    You are not logged in.
    <router-link :to="`/login?where=${redirect}`">
      <button>now with github </button>
    </router-link>
  </div>
</template> 
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'not-logged',
  computed: {
    ...mapGetters(['isLogged']),
    redirect() {
      return this.$route.query.redirect;
    },
  },
  methods: {
    redirectIfNeeded(newValue) {
      if ((newValue || this.isLogged) && this.redirect) {
        this.$router.push(this.redirect);
      }
    },
  },
  created() {
    this.redirectIfNeeded();
  },
  watch: {
    isLogged(isLoggedNow) {
      this.redirectIfNeeded(isLoggedNow);
    },
  },
};
</script>
