<template>
  <div>
    <div class="level">
      <b-field class="has-text-centered level-item">
        <b-checkbox-button v-model="checkboxGroup" native-value="SCHEDULED" type="is-primary-2">
          <b-icon icon="calendar-o"></b-icon>
          <span>Scheduled</span>
        </b-checkbox-button>
        <b-checkbox-button v-model="checkboxGroup" native-value="PLAYED" type="is-success">
          <b-icon icon="futbol-o"></b-icon>
          <span>Played</span>
        </b-checkbox-button>
        <b-checkbox-button v-model="checkboxGroup" native-value="WALKOVER" type="is-danger">
          <b-icon icon="fire"></b-icon>
          <span>Walkover</span>
        </b-checkbox-button>
      </b-field>
      <div class="level-item" v-if="isCompetitor">
        <b-checkbox v-model="onlyMy">
          <b-icon icon="user"></b-icon>
          <span>Only My Matches</span>
        </b-checkbox>
      </div>
    </div>
    <div>
      <div v-for="match in filteredSchedule " :key="match.id">
        <div class="columns notification results is-primary ">
          <div class="edit button is-primary is-small " v-if="match.result ">
            <b-icon icon="edit " />
          </div>
          <div class="edit button is-primary-2 is-small " v-else>
            <b-icon icon="plus" />
          </div>
          <div class="column is-5 has-text-centered ">
            <div class="title ">{{user(match.home).name}}</div>
            <div class="subtitle ">{{club(match.home).name}}</div>
          </div>
          <div class="column is-2 " v-if="match.result ">
            {{match.result.home}}
            <div class="column is-4 has-text-centered ">
              vs
            </div>
            <div class="column is-4 is-size-3 has-text-weight-bold has-text-centered ">{{match.result.visitor}}</div>
          </div>
          <div class="column is-2 has-text-centered " v-else>
            <div class="title is-size-7 ">vs</div>
          </div>
          <div class="column is-5 has-text-centered ">
            <div class="title ">{{user(match.visitor).name}}</div>
            <div class="subtitle ">{{club(match.visitor).name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as R from 'ramda';
import { mapGetters } from 'vuex';

export default {
  name: 'game-schedule',
  props: { game: { type: Object, required: true } },
  data() {
    return { checkboxGroup: ['SCHEDULED'], onlyMy: false };
  },
  methods: {
    club(uid) {
      return this.game.competitors[uid].club;
    },
    user(uid) {
      return this.game.competitors[uid].user;
    },
  },
  computed: {
    ...mapGetters(['id']),
    isCompetitor() {
      return R.contains(this.id, R.keys(this.game.competitors));
    },
    filteredSchedule() {
      const isContainedInGroup = R.flip(R.contains)(this.checkboxGroup);
      const isMyMatch = ({ home, visitor }) => !this.onlyMy || R.contains(this.id, [home, visitor]);
      return R.pipe(
        R.filter(R.pipe(R.prop('status'), isContainedInGroup)),
        R.filter(isMyMatch),
        R.values,
        R.sortWith([
          R.descend(R.pipe(R.prop('updated'), d => new Date(d).getTime())),
          R.ascend(R.prop('id')),
        ]),
      )(this.game.schedule);
    },
  },
};
</script>
<style lang="scss" scoped>
.level-item {
  justify-content: center;
}
.results {
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  font-family: "Montserrat";
  letter-spacing: -1px;
  position: relative;
  .edit {
    position: absolute;
    right: 0.25rem;
    top: 0.25rem;
  }
}
</style>
