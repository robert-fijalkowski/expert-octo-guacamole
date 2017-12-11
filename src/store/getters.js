export default {
  isLogged: state => state.loggedIn,
  profile: state => state.profile,
  avatar: state => state.profile.avatar_url,
  id: state => state.id,
  access: state => state.access,
  isAdmin: state => state.access === 'ADMIN',
  isUser: (state, getters) => getters.isAdmin || state.access === 'USER',
  myProfile: state => state.myProfile,
  menuVisible: state => state.menuVisible,
  username: (state, getters) => {
    const { profile } = getters;
    return profile.display_name || profile.name || profile.email;
  },
};
