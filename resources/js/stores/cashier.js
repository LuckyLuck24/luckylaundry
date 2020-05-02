import $axios from '../api.js'

const state = () => ({
    cashiers: [],
    page: 1,
    id: ''
})

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.cashiers = payload
    },
    SET_PAGE(state, payload) {
        state.page = payload
    },
    SET_ID_UPDATE(state, payload) {
        state.id = payload
    }
}

const actions = {
    getCashiers({ commit, state }, payload) {
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            $axios.get(`/cashiers?page=${state.page}&q=${search}`)
            .then((response) => {
                commit('ASSIGN_DATA', response.data)
                resolve(response.data)
            })
        })
    },
    submitCashier({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.post(`/cashiers`, payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                dispatch('getCashiers').then(() => {
                    resolve(response.data)
                })
            })
            .catch((error) => {
                if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                }
            })
        })
    },
    editCashier({ commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.get(`/cashiers/${payload}/edit`)
            .then((response) => {
                resolve(response.data)
            })
        })
    },
    updateCashier({ state }, payload) {
        return new Promise((resolve, reject) => {
            $axios.post(`/cashiers/${state.id}`, payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                resolve(response.data)
            })
        })
    } ,
    removeCashier({ dispatch }, payload) {
        return new Promise((resolve, reject) => {
            $axios.delete(`/cashiers/${payload}`)
            .then((response) => {
                dispatch('getCashiers').then(() => resolve(response.data))
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}