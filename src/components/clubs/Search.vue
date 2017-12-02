<template>
  <div class="notification is-primary">
    <div class="notification is-primary">
      <b-field>
        <b-input v-model="phrase" placeholder="Search..." type="search" icon-pack="fa" icon="search">
        </b-input>
      </b-field>
    </div>
    <div class="columns is-multiline" v-if="phrase && data.length !== 0">
      <div class="column is-4" v-for="club in data" :key="club.id">
        <div class="tile is-ancestor">
          <div class="tile is-parent is-vertical">
            <article class="notification">
              <div class="columns">
                <ClubEmblem :club="club.id" size="120" class="column is-2 is-hidden-touch" />
                <div class="column">
                  <div class="title has-text-centered">{{club.name}}</div>
                  <div class="subtitle is-size-6 has-text-centered">{{club.division}}, {{club.country}}</div>
                  <Stars :stars="club.stars" class="has-text-centered" />
                </div>
              </div>
              <div class="has-text-centered club-tags">
                <div class="is-inline-block">
                  <b-taglist attached>
                    <b-tag type="is-dark">match</b-tag>
                    <b-tag :type="qualityToColor(club.quality)">{{club.quality}}</b-tag>
                  </b-taglist>
                </div>
                <div class="is-inline-block">
                  <b-taglist attached>
                    <b-tag type="is-dark">score</b-tag>
                    <b-tag type="is-info">{{club.score}}</b-tag>
                  </b-taglist>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
    <div class=" has-text-centered " v-else-if="done && phrase && data.length===0 ">
      There is no results for your
      <span class="is-bold ">{{phrase}}</span>
    </div>
    <div class="has-text-centered " v-else-if="!done ">
      Your search is now handling.
    </div>
    <div class="level "></div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
import { cond, equals, always, T } from 'ramda';
import ClubEmblem from './ClubEmblem';
import Stars from './Stars';

export default {
  name: 'clubs-search',
  data() {
    return {
      phrase: 'czelsi',
      data: [],
      done: true,
    };
  },
  components: { ClubEmblem, Stars },
  methods: {
    search: debounce(function debouncedSearch() {
      this.$api('GET', `/clubs?search=${this.phrase}&atLeast=fair`)
        .then((data) => { this.data = data; })
        .then(() => { this.done = true; })
        .catch(() => { this.done = true; });
    }, 500),
    qualityToColor: cond([
      [equals('excellent'), always('is-success')],
      [equals('average'), always('is-average')],
      [equals('fair'), always('is-warning')],
      [T, always('is-black')],
    ]),
  },
  watch: {
    phrase() {
      this.done = false;
      this.data = [];
      this.search();
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
