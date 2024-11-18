<template>
    <div class="background"></div>
    <setting />
    <div class="serverList">
        <server v-for="item in serverList" :key="item" :serverUrl="item" />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import server from "@/components/server.vue";
import setting from "@/components/setting.vue";

const serverList = ref(["http://139.9.72.212:4567"]);

const background = ref(localStorage.getItem("background"));
onMounted(() => {
    if (background.value === null) {
        localStorage.setItem("background", "/background1.png");
    }
});
</script>

<style lang="scss" scoped>
.background {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    background: url(/background1.png) no-repeat;
    background-size: cover;
    filter: blur(20px);
}
.serverList {
    min-height: 100vh;
    // padding-top: 20vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
