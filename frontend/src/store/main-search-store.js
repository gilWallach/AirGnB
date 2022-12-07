//SNIPPTE FOR STORE MODULES (NOT MAIN STORE, LIKE STORE INDEX.JS)
export const mainSearchStore = {
    state: {
        isGuestsSelected: false,
        isWhereSelected: false,
        isCheckInSelected: false,
        isCheckOutSelected: false
    },
    getters: {
        isElementSelected({ isGuestsSelected, isCheckInSelected, isCheckOutSelected, isWhereSelected }) {
            return (isGuestsSelected || isWhereSelected || isCheckInSelected ||
                isCheckOutSelected)
        },
        isGuestsSelected({ isGuestsSelected }) {
            return isGuestsSelected
        },
        isCheckInSelected({ isCheckInSelected }) {
            return isCheckInSelected
        },
        isCheckOutSelected({ isCheckOutSelected }) {
            return isCheckOutSelected
        },
        isWhereSelected({ isWhereSelected }) {
            return isWhereSelected
        },
    },
    mutations: {
        toggleElement(state, { select }) {
            state[select] = !state[select]
        },
        selectElement(state, { select }) {
            state[select] = true
        },
        unSelectElement(state, { select }) {
            state[select] = false
        },
        unSelectElements(state) {
            state.isGuestsSelected = false
            state.isWhereSelected = false
            state.isCheckOutSelected = false
            state.isCheckInSelected = false
        }
    },
}