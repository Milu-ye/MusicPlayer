<template>
    <div class="container">
        <el-row style="height: 90%;">
            <el-col style="display: flex; justify-content: center;padding-top: 2vh;padding-bottom: 2vh;" :span="4">
                <ErAside></ErAside>
            </el-col>
            <el-col :span="20">
                <el-row style="height: 10%;">
                    <el-col :span="24">
                        <Erheader></Erheader>
                    </el-col>
                </el-row>
                <el-row style="height: 90%;">
                    <el-col :span="24">
                        <div class="mainContaint">
                            <router-view v-slot="{ Component }">
                                <keep-alive>
                                    <component :is="Component"></component>
                                </keep-alive>
                            </router-view>
                        </div>
                    </el-col>
                </el-row>

            </el-col>
        </el-row>
        <el-row style="height: 10%;">
            <el-col :span="24">
                <MusicPlayer></MusicPlayer>
            </el-col>
        </el-row>
        <div class="playList_container" :class="{ playList_hidden: !store.state.isShowPlayList }">
            <div class="exitPlayList" @click="store.commit('CHANGESHOWPLAYLIST')">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                    class="bi bi-chevron-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                </svg>
            </div>
            <div class="playList_content">
                <PlayList></PlayList>
            </div>
        </div>
    </div>

</template>

<script setup>
import PlayList from '@/components/PlayList.vue';
import Erheader from '@/components/ErHeadr.vue';
import ErAside from '@/components/ErAside.vue';
import MusicPlayer from '@/components/MusicPlayer.vue';
import { useStore } from 'vuex';
import { ref } from 'vue'
const loading = ref(true)
const store = useStore()
</script>

<style lang="less" scoped>
.container {
    user-select: none;
    position: relative;
    height: 71%;
    width: 65%;
    background-color: rgba(6, 6, 6 0.4);
    box-shadow: 0 0 20px;
    backdrop-filter: blur(10px);
    border-radius: 10px;
    overflow: hidden;

    .playList_container {
        position: absolute;
        transition: all 0.2s;
        background-color: #303133;
        border-radius: 10px;
        overflow: hidden;
        width: 22%;
        height: 90%;
        right: 0;
        top: 0;
        z-index: 100;
        display: flex;

        .exitPlayList {
            width: 6%;
            height: 100%;
            background-color: #909399;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            svg {
                color: white;

            }
        }

        .playList_content {
            width: 94%;
            height: 100%;
        }
    }

    .playList_hidden {

        transform: translateX(100%);
    }

    .el-row {
        width: 100%;
    }
}

.mainContaint {
    background-color: rgba(6, 6, 6, 0.3);
    height: 100%;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
}

:deep(.el-loading-mask) {
    background-color: transparent;
}

:deep(.el-loading-spinner .path) {
    stroke: gray;
}
</style>