import { ref, computed, onMounted, onBeforeMount, reactive, watch, WritableComputedRef, ComputedRef } from "vue";


export function isMobile() {
    return window.innerHeight > window.innerWidth;
}


export function computeSizes(sectionHeight: number, nRows?: number) {
    nRows = nRows? nRows: 10;
    const singleRowHeight = sectionHeight / nRows;

    return {
        h2: Math.floor(singleRowHeight / 2) + 'px',
        p: Math.floor(singleRowHeight / 3.5) + 'px',
        lineHeight: Math.floor(100 / nRows) + "%"
    }
}