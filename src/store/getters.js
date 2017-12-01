export default {
  isLogged: state => state.loggedIn,
  profile: state => state.profile,
  avatar: state => state.profile.avatar_url,
  id: state => state.id,
  myProfile: state => state.myProfile,
  username: (state, getters) => {
    const { profile } = getters;
    return profile.display_name || profile.name || profile.email;
  },
};
