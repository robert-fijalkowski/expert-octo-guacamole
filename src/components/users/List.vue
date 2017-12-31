<template>
  <div class="root">
    <div class="columns is-multiline">
      <div class="column is-6" v-for="{id, access, meta} in users" :key="id">
        <div class="tile is-child notification is-black">
          <div class="columns">
            <div class="column is-narrow">
              <router-link :to="`/users/${id}`" class="is-center center-avatar">
                <div class="avatar"> <img :src="meta.avatar_url" :alt="id + meta.name" /> </div>
              </router-link>
              <b-taglist attached class="is-centered">
                <b-tag :type="accessToClass(access)" class="is-marginless">{{access}}</b-tag>
                <b-tag type="is-dark" class="is-marginless">{{id}}</b-tag>
              </b-taglist>
            </div>
            <div class="column ">
              <p class="title">
                <router-link :to="`/users/${id}`">{{meta.name}}</router-link>
              </p>
              <div class="level" v-if="isAdmin && myId!==id">
                <button @click="promote(id)" class="button is-size-7-mobile" :class="accessToClass(nextLevel(access))" v-if="access !== 'ADMIN'">
                  <b-icon icon="arrow-up"></b-icon>
                  <span>{{nextLevel(access)}}</span>
                </button>
                <button @click="demote(id)" class="button is-size-7-mobile" :class="accessToClass(previousLevel(access))" v-if="access !== 'NONE'">
                  <b-icon icon="arrow-down"></b-icon>
                  <span>{{previousLevel(access)}}</span>
                </button>
              </div>
              <div v-else-if="isAdmin">
                You cannot modify yourself access level.
              </div>
              <div v-else>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as R from 'ramda';
import { mapGetters } from 'vuex';

const levels = ['NONE', 'USER', 'ADMIN'];
const findLevels = {
  nextLevel: lookupedLevel => levels[levels.indexOf(lookupedLevel) + 1],
  previousLevel: lookupedLevel => levels[levels.indexOf(lookupedLevel) - 1],
};
export default {
  name: 'users-list',
  data() {
    return {
      users: [],
    };
  },
  computed: {
    ...mapGetters(['isAdmin', 'id', 'event']),
    myId() { return this.id; },
  },
  methods: {
    ...findLevels,
    makeUserLevel(uid, modifier = R.identity) {
      return R.pipe(R.find(R.propEq('id', uid)), R.prop('access'), modifier)(this.users);
    },
    setLevel(uid, level) {
      return this.$api('PUT', `/users/${uid}`, { access: level })
        .then(this.updateUser)
        .then(() => {
          this.$toast.open({ type: this.accessToClass(level), message: `${uid} has now ${level}` });
        });
    },
    promote(uid) {
      const toLevel = this.makeUserLevel(uid, findLevels.nextLevel);
      this.setLevel(uid, toLevel);
    },
    demote(uid) {
      const toLevel = this.makeUserLevel(uid, findLevels.previousLevel);
      this.setLevel(uid, toLevel);
    },
    updateUser(data) {
      const index = R.findIndex(R.propEq('id', data.id))(this.users);
      if (index !== -1) {
        this.users = R.values(R.assoc(index, data, this.users));
      }
    },
    accessToClass(access) {
      switch (access) {
        case 'ADMIN': return 'is-danger';
        case 'USER': return 'is-info';
        case 'NONE': return 'is-warning';
        default: return 'is-black';
      }
    },
    refreshUsers() {
      this.$api('GET', '/users').then((users) => { this.users = users; });
    },
  },
  mounted() {
    this.refreshUsers();
  },
  watch: {
    event({ type }) {
      if (type === 'users') {
        this.refreshUsers();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.center-avatar {
  justify-content: center;
  display: flex;
}
.avatar {
  display: flex;
  overflow: hidden;
  height: 120px;
  width: 100px;
  img {
    border-radius: 50%;
    align-self: center;
  }
}
</style>

