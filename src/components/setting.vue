<template>
    <div class="setting">
        <Icon class="button" icon="weui:setting-filled" @click="isShow = !isShow" />
        <div class="panel" v-if="isShow">
            <color />
        </div>
    </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import color from "@/components/color_selector.vue";
import { ref } from "vue";

const isShow = ref(false);
</script>

<style lang="scss" scoped>
.setting {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 32px;
    left: 32px;
    z-index: 3;

    .button {
        padding: 6px;
        font-size: 1.2rem;
        background-color: #ffffff;
        border-radius: 8px;
        transition: 0.3s;
        cursor: pointer;
    }
    .button:hover {
        box-shadow: 0 0 8px 4px rgba($color: #000000, $alpha: 0.4);
    }
    .panel {
        padding: 12px;
        position: absolute;
        top: 42px;
        left: 0;
        background-color: #ffffff;
        border-radius: 12px;
    }
}
</style>
