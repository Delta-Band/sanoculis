import reactor from "../reactor";

export const state = () => ({});

export const getters = {
  navigation: state => state.navigation
};

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    reactor.init();
    const navigation = await reactor.getPage("BYnmRg3UKC2LKLyLPfB5");
    const contact = await reactor.getPage("pVIXGZJstHCcy5y9lShf");
    const footer = await reactor.getPage("iBnQ41ARhlS6B8AKdhq0");
    commit("reactor", { navigation, contact, footer });
  }
};

export const mutations = {
  reactor: (state, payload) => {
    Object.assign(state, payload);
  }
};
