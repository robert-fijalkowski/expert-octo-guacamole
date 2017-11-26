export default {
  isLogged: state => state.isLogged,
  profile: state => state.profile,
  avatar: state => state.profile.avatar_url,
  username: (state, getters) => {
    const profile = getters.profile;
    return profile.display_name || profile.name || profile.email;
  },
};
