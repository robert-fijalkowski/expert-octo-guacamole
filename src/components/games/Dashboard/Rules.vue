<template>
  <div>
    <p class="title">Rules</p>
    <div class="content" v-html="compiledRules"></div>
  </div>
</template>
<script>
import * as marked from 'marked';

export default {
  props: ['game'],
  name: 'game-rules',
  computed: {
    compiledRules() { return marked(this.game.rules); },
  },
};
</script>
