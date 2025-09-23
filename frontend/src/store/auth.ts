import type { Module } from 'vuex'

export interface AuthState {
  token: string | null
}

export interface RootState {
  // Misalnya nanti ada module lain
}

const state: AuthState = {
  token: null
}

const auth: Module<AuthState, RootState> = {
  namespaced: true,
  state,
  mutations: {
    setToken(state: AuthState, token: string) {
      state.token = token
    }
  },
  actions: {
    login({ commit }: any, token: string) {
      commit('setToken', token)
    }
  },
  getters: {
    isAuthenticated: (state: AuthState): boolean => !!state.token
  }
}

export default auth