<template>
  <div>
    <b-field grouped>
      <b-input expanded v-model="phrase" placeholder="Search..." type="search" icon-pack="fa" icon="search">
      </b-input>
      <b-switch v-if="hasDeepSearch" v-model="deep" type="is-gray">
        Deep search
      </b-switch>
    </b-field>
    <div v-if="done && data.length !== 0">
      <p class="columns is-multiline" v-if="simple">
        <Simple :select="select" :selected.sync="selectedGame" class="column is-12" :club="club" v-for="club in data" :key="club.id" />
      </p>
      <p class="columns is-multiline" v-else>
        <Complex :select="select" :selected.sync="selectedGame" class="column is-4" :club="club" v-for="club in data" :key="club.id" />
      </p>
    </div>
    <div class=" has-text-centered " v-else-if="done && phrase && data.length===0 ">
      There is no results for your
      <span class="is-bold ">{{phrase}}</span>
    </div>
    <div class="has-text-centered " v-else-if="phrase && !done">
      Your search is now handling.
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';

import Simple from './Simple';
import Complex from './Complex';

export default {
  name: 'clubs-search',
  props: {
    'has-deep-search': { type: Boolean, default: true },
    simple: { type: Boolean, default: false },
    limit: { type: Number, default: 21 },
    preselect: { type: String, default: null },
    predata: { type: Array, default: () => [] },
  },
  data() {
    return {
      phrase: '',
      data: this.predata || [],
      deep: false,
      done: true,
      selectedGame: this.preselect || null,
    };
  },
  components: { Simple, Complex },
  methods: {
    select(game) {
      if (this.selectedGame === game.id) {
        this.selectedGame = null;
        this.$emit('selected', null);
      } else {
        this.selectedGame = game.id;
        this.$emit('selected', game);
      }
    },
    search: debounce(function debouncedSearch() {
      if (!this.phrase) {
        return false;
      }
      return this.$api('GET', `/clubs?search=${this.phrase}${this.deep ? '&atLeast=fair' : ''}&limit=${this.limit}`)
        .then((data) => { this.data = data; })
        .then(() => { this.done = true; })
        .catch(() => { this.done = true; });
    }, 500),
    doSearch() {
      this.done = false;
      this.data = [];
      this.search();
    },
  },
  watch: {
    phrase() {
      this.doSearch();
    },
    deep() {
      this.doSearch();
    },
  },
  mounted() {
    this.search();
  },
};
</script>
<style lang="scss" scoped>
.club-tags {
  > * {
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>
