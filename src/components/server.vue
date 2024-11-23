<template>
    <div class="components">
        <div class="panel" v-if="isLoad">
            <div class="server">
                <span class="hostname">{{ server.os.hostname }}</span>
                <div class="distro">
                    <Icon class="icon" :icon="`fa6-brands:${server.os.platform.toLowerCase()}`" />{{ server.os.distro }}
                </div>
                <div class="performance">
                    <div class="time">{{ handleSystemTime(server.time.uptime) }}</div>
                    <div class="cpu">
                        <span>CPU使用率</span>
                        <progress :id="server.cpu" max="100" :value="parseFloat(server.cpu.replace('%', ''))"></progress>
                        <span>{{ server.cpu }} %</span>
                    </div>
                    <div class="memory">
                        <span>内存使用率</span>
                        <progress :id="server.memory" max="100" :value="parseFloat(server.memory.replace('%', ''))"></progress>
                        <span>{{ server.memory }} %</span>
                    </div>
                    <ul class="disk">
                        <li v-for="item in server.disk" :key="item.fs">
                            <span>{{ item.fs }}</span>
                            <span class="used">{{ item.used }} G</span>
                            <progress :id="item.fs" max="100" :value="parseFloat(item.percentage.replace('%', ''))"></progress>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="pm2" v-if="pm2.length > 0">
                <span class="name">服务</span>
                <div class="item" v-for="item in pm2" :key="item.pid">
                    <div class="title">
                        <div :class="{ spot: true, online: item.status === 'online' }"></div>
                        {{ item.name }} <span>{{ item.pid }}</span>
                    </div>
                    <div class="cpu">
                        <span>CPU</span>
                        <progress :id="item.cpu" max="100" :value="item.cpu"></progress>
                        <span>{{ item.cpu }} %</span>
                    </div>
                    <div class="memory">
                        <span>内存</span>
                        <progress :id="item.memory" max="2" :value="(item.memory / (1024 * 1024 * 1024)).toFixed(2)"></progress>
                        <span>{{ (item.memory / (1024 * 1024 * 1024)).toFixed(2) }} G</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="dot-spinner" v-else>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
        </div>
        <span class="error" v-if="errorCount > 0">{{ errorMessage }}({{ errorCount }})</span>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { io } from "socket.io-client";
import { Icon } from "@iconify/vue";
const props = defineProps(["serverUrl"]);

const server = ref({});
const pm2 = ref([]);
const isLoad = ref(false);
const errorCount = ref(0);
const errorMessage = ref("服务器连接失败, 正在重试");

const socket = io(props.serverUrl);
socket.on("server-status", (data) => {
    server.value = data.serverInfo;
    pm2.value = data.pm2Info;
    if (!isLoad.value) {
        isLoad.value = true;
    }
});
socket.on("connect_error", (error) => {
    errorCount.value++;
});

const handleSystemTime = (time) => {
    const days = Math.floor(time / (3600 * 24)); // 计算天数
    const hours = Math.floor((time % (3600 * 24)) / 3600); // 计算剩余小时
    const minutes = Math.floor((time % 3600) / 60); // 计算剩余分钟
    const seconds = Math.floor(time % 60); // 计算剩余秒数

    return `系统已运行: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};
</script>

<style lang="scss" scoped>
.components {
    width: calc(100% - 48px);
    height: calc(100% - 48px);
    margin-bottom: 12px;
    padding: 24px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 2;
}
.panel {
    width: 100%;
    .server {
        .hostname {
            font-size: 3rem;
            font-weight: bold;
        }
        .distro {
            font-size: 1.4rem;
            color: var(--font-color-tint);
            display: flex;
            align-items: center;
            .icon {
                margin-right: 8px;
            }
        }
        .performance {
            margin-top: 24px;

            .time {
                margin-bottom: 6px;
                color: var(--font-color-tint-2);
            }
            > div {
                display: flex;
                align-items: center;

                span {
                    flex-shrink: 0;
                }
                progress {
                    margin: 0 12px;
                }
            }
            .disk {
                margin-top: 6px;
                li {
                    width: 100%;
                    list-style: none;
                    margin-top: 4px;

                    .used {
                        width: 82px;
                        margin-left: 12px;
                    }
                }
            }
        }
    }
    .pm2 {
        margin-top: 24px;
        padding-top: 24px;
        border-top: 3px dashed var(--theme-color);
        .item {
            margin-bottom: 8px;
            .title {
                display: flex;
                align-items: baseline;
                font-size: 1.4rem;

                .spot {
                    width: 16px;
                    height: 16px;
                    margin-right: 6px;
                    background-color: #fcb3b7;
                    border-radius: 999px;
                }
                .online {
                    background-color: #aee1dd;
                }
                span {
                    margin-left: 6px;
                    font-size: 1rem;
                    color: var(--font-color-tint);
                }
            }
            .cpu,
            .memory {
                display: flex;
                align-items: center;
                span {
                    flex-shrink: 0;
                }
                progress {
                    margin: 0 12px;
                }
            }
        }
    }
    .name {
        font-size: 1.6rem;
        margin-bottom: 6px;
    }
}
/* From Uiverse.io by abrahamcalsin */
.dot-spinner {
    --uib-size: 2.8rem;
    --uib-speed: 0.9s;
    --uib-color: var(--theme-color);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: var(--uib-size);
    width: var(--uib-size);
}
.dot-spinner__dot {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    width: 100%;
}
.dot-spinner__dot::before {
    content: "";
    height: 20%;
    width: 20%;
    border-radius: 50%;
    background-color: var(--uib-color);
    transform: scale(0);
    opacity: 0.5;
    animation: pulse0112 calc(var(--uib-speed) * 1.111) ease-in-out infinite;
    box-shadow: 0 0 20px var(--theme-color);
}
.dot-spinner__dot:nth-child(2) {
    transform: rotate(45deg);
}
.dot-spinner__dot:nth-child(2)::before {
    animation-delay: calc(var(--uib-speed) * -0.875);
}
.dot-spinner__dot:nth-child(3) {
    transform: rotate(90deg);
}
.dot-spinner__dot:nth-child(3)::before {
    animation-delay: calc(var(--uib-speed) * -0.75);
}
.dot-spinner__dot:nth-child(4) {
    transform: rotate(135deg);
}
.dot-spinner__dot:nth-child(4)::before {
    animation-delay: calc(var(--uib-speed) * -0.625);
}
.dot-spinner__dot:nth-child(5) {
    transform: rotate(180deg);
}
.dot-spinner__dot:nth-child(5)::before {
    animation-delay: calc(var(--uib-speed) * -0.5);
}
.dot-spinner__dot:nth-child(6) {
    transform: rotate(225deg);
}
.dot-spinner__dot:nth-child(6)::before {
    animation-delay: calc(var(--uib-speed) * -0.375);
}
.dot-spinner__dot:nth-child(7) {
    transform: rotate(270deg);
}
.dot-spinner__dot:nth-child(7)::before {
    animation-delay: calc(var(--uib-speed) * -0.25);
}
.dot-spinner__dot:nth-child(8) {
    transform: rotate(315deg);
}
.dot-spinner__dot:nth-child(8)::before {
    animation-delay: calc(var(--uib-speed) * -0.125);
}
@keyframes pulse0112 {
    0%,
    100% {
        transform: scale(0);
        opacity: 0.5;
    }

    50% {
        transform: scale(1);
        opacity: 1;
    }
}

.error {
    margin-top: 24px;
}
</style>
