<template>
  <div class="club-emblem" :style="sizeStyle">
    <div :class="clubClass" />
  </div>
</template>

<script>
export default {
  name: 'club-emblem',
  props: ['club', 'size'],
  computed: {
    clubClass() {
      return `bg-club-${this.club}`;
    },
    sizeStyle() {
      return `width: ${this.size}px;height: ${this.size}px;`;
    },
  },
};
</script>
