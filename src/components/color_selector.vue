<template>
    <div class="color">
        <input type="range" min="0" max="360" step="1" v-model="color" @input="updateColor" />
        <div :style="{ backgroundColor: `oklch(0.8 .1 ${color})`, color: `oklch(1 1 ${color})` }">{{ color }}</div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const color = ref(0);
const updateColor = () => {
    const themeColor = `oklch(0.8 .1 ${color.value})`;
    document.documentElement.style.setProperty("--theme-color", themeColor);
    localStorage.setItem("theme-color", color.value);
};

onMounted(() => {
    const localColor = localStorage.getItem("theme-color");
    if (localColor) {
        color.value = localColor;
        updateColor();
    }
});
</script>

<style lang="scss" scoped>
.color {
    padding: 6px;
    background-color: #fff;
    border-radius: 12px;
    display: flex;

    input[type="range"] {
        -webkit-appearance: none;
        width: 300px;
        height: 24px;
        padding: 4px;
        background: linear-gradient(
            to right,
            oklch(0.8 0.1 0),
            oklch(0.8 0.1 30),
            oklch(0.8 0.1 60),
            oklch(0.8 0.1 90),
            oklch(0.8 0.1 120),
            oklch(0.8 0.1 150),
            oklch(0.8 0.1 180),
            oklch(0.8 0.1 210),
            oklch(0.8 0.1 240),
            oklch(0.8 0.1 270),
            oklch(0.8 0.1 300),
            oklch(0.8 0.1 330),
            oklch(0.8 0.1 360)
        );
        border-radius: 5px;
        outline: none;
    }
    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 12px;
        height: 24px;
        background-color: #fff;
        opacity: 0.5;
        border-radius: 4px;
        cursor: pointer;
    }
    input[type="range"]::-webkit-slider-thumb:hover {
        opacity: 0.8;
    }
    div {
        width: auto;
        height: 32px;
        padding: 0 12px;
        margin-left: 12px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        opacity: 0.5;
        text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.6);
    }
}
</style>
