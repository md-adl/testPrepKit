import {writable} from 'svelte/store'
    export const current_ques = writable(0);
    // name="e"
    export const post = writable([])
    export const user_cheked = writable([])
    export const attempted = writable(0);
    export const reviewFooter = writable(false)
    export const chooseAns=writable([])
    