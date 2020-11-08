import Vue from "vue"
import Vuex from "vuex"
import { createCSS, rgbToHex } from "@/util"

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        colors: [
            {
                id: 0,
                hex: "00eeff",
                rgba: {
                    red: 0,
                    green: 238,
                    blue: 255,
                    alpha: 1.0,
                },
                percent: 0,
            },
            {
                id: 1,
                hex: "0000ff",
                rgba: {
                    red: 0,
                    green: 0,
                    blue: 255,
                    alpha: 1.0,
                },
                percent: 100,
            },
        ],
        lastId: 1,
        current: 0,
        type: "linear",
        repeating: false,
        linear: {
            deg: 0,
        },
        radial: {
            shape: "circle",
            size: "farthest-corner",
            position: {
                left: 50,
                top: 50,
            },
        },
    },
    getters: {
        css: state => createCSS(state),
    },
    mutations: {
        setCurrent(state, id) {
            state.current = id
        },
        addColor(state, { rgba, percent }) {
            const hex = rgbToHex(rgba)
            const id = state.lastId + 1

            state.colors.push({ id, hex, rgba, percent })
            state.colors.sort((a, b) => a.percent - b.percent)
            state.lastId = id
        },
        setColorPercent(state, { id, percent }) {
            const index = state.colors.findIndex(c => c.id === id)
            const color = state.colors[index]
            
            state.colors.splice(index, 1, { ...color, percent })
            state.colors.sort((a, b) => a.percent - b.percent)
        },
    },
})

export default store