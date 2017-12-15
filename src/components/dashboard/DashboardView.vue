<template>
  <Dashboard :id="id" :profile="myProfile" view="dashboard" @refresh="refreshProfile()" />
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Dashboard from './Dashboard';

export default {
  components: { Dashboard },
  name: 'dashboard-view',
  computed: { ...mapGetters(['id', 'myProfile']) },
  methods: { ...mapActions(['refreshProfile']) },
};
</script>

