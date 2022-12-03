//SNIPPTE FOR STORE MODULES (NOT MAIN STORE, LIKE STORE INDEX.JS)
export const mainSearchStore = {
    state: {
        isGuestsSelected: false,
        isDateSelected: false,
        isWhereSelected: false,
    },
    getters: {
        isElementSelected({ isGuestsSelected, isDateSelected, isWhereSelected }) {
            return (isGuestsSelected || isDateSelected || isWhereSelected)
        },
        isGuestsSelected({ isGuestsSelected }) {
            return isGuestsSelected
        },
        isDateSelected({ isDateSelected }) {
            return isDateSelected
        },
        isWhereSelected({ isWhereSelected }) {
            return isWhereSelected
        },
    },
    mutations: {
        toggleElement(state, { select }) {
            state[select] = !state[select]
        },
        unSelectElements(state) {
            state.isGuestsSelected = false
            state.isDateSelected = false
            state.isWhereSelected = false
        }
    },
}