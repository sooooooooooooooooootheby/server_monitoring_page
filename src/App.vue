<template>
    <setting />

    <div style="display: flex">
        <div class="sideImage">
            <img src="/sideImage.webp" alt="sideImage">
        </div>
        <div class="main">
            <ul class="list">
                <li :class="{item: true, active: selectServer === item.url}" v-for="item in serverList" :key="item" @click="selectServer = item.url">
                    {{ item.name }}
                </li>
            </ul>
            <div class="server">
                <server :serverUrl="selectServer" :key="selectServer" v-if="selectServer" />
            </div>
        </div>
    </div>
</template>

<script setup>
import server from "@/components/server.vue";
import setting from "@/components/setting.vue";
import { ref, onMounted } from "vue";

const selectServer = ref(null);

const serverList = ref([]);
</script>

<style lang="scss" scoped>
@import url(@/assets/App.scss);
</style>
