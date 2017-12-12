<template>
  <Dashboard :id="id" :profile="myProfile" />
</template>
<script>
import { mapGetters } from 'vuex';
import Dashboard from './Dashboard';

export default {
  components: { Dashboard },
  name: 'dashboard-view',
  computed: { ...mapGetters(['id', 'myProfile']) },
};
</script>

