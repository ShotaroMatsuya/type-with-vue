import { User } from "@/models/user";
import { Commit, createStore } from "vuex";

export default createStore({
  state: {
    user: new User(),
  },
  getters: {},
  mutations: {
    SET_USER: (state: { user: User }, user: User) => (state.user = user),
  },
  actions: {
    setUser: ({ commit }: { commit: Commit }, user: User) =>
      commit("SET_USER", user),
  },
  modules: {},
});
