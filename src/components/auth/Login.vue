<template>
  <div> </div>
</template>
<script>
import { mapActions } from 'vuex';

const { API_URL } = process.env;
export default {
  name: 'log-in',
  methods: {
    processMessage(event) {
      if (event.data.jwt) {
        this.loaded();
        const { where = '/dashboard' } = this.$route.query;
        this.$router.push(where);
        this.login(event.data.jwt);
      }
    },
    ...mapActions(['login', 'isLoading', 'loaded']),
  },
  created() {
    window.addEventListener('message', this.processMessage);
  },
  beforeDestroy() {
    window.removeEventListener('message', this.processMessage);
  },
  mounted() {
    this.isLoading();
    const w = window.open(this.iFrameSrc, 'Github Login');
    const send = () => {
      w.postMessage('ready?', '*');
      if (!w.closed) {
        setTimeout(send, 150);
      } else {
        this.loaded();
      }
    };
    send();
  },
  data() {
    return {
      API_URL,
    };
  },
  computed: {
    iFrameSrc() {
      return `${this.API_URL}/_github`;
    },
  },
};
</script>
<style lang="scss" scoped>
iframe {
  width: 100%;
  border: 1px solid red;
}
</style>
