<template>
    <section v-loading="store.state.loading" ref="tableContainer">
        <el-table v-if="!store.state.loading" v-scroll @row-dblclick="playMusic"
            :data="store.state.musicList.slice(0, over)" :height="tableHeight" :style="tableStyle.elTableStyle"
            max-height="610" :fit="false" :row-style="tableStyle.rowStyle" :cell-style="tableStyle.cellStyle"
            :header-cell-style="tableStyle.headerCellStyle" :header-row-style="tableStyle.headerRowStyle">

            <el-table-column label="#" :width="tableWidth[0]">
                <template #default="{ $index }">
                    <div id="row_header">
                        <span class="index" style="font-size: 12px;font-weight: 600;">
                            {{ $index + 1 }}
                        </span>
                        <svg v-if="(store.state.musicList?.[$index].id) != (store.state.playList.length != 0 && store.state.playList[store.state.currentPlay].id) || !isPlay"
                            @click="play(store.state.musicList[$index])" xmlns="http://www.w3.org/2000/svg" width="22"
                            height="22" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                            <path
                                d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                        </svg>
                        <svg @click="pause"
                            v-if="((store.state.musicList.length != 0 && store.state.musicList[$index].id) == (store.state.playList.length != 0 && store.state.playList[store.state.currentPlay].id)) && isPlay"
                            xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                            class="bi bi-pause-fill" viewBox="0 0 16 16">
                            <path
                                d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
                        </svg>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="歌曲" :width="tableWidth[1]">
                <template #header>

                    <div id="song">
                        <span>歌曲</span>
                        <button @click="playAll">播放全部</button>
                    </div>

                </template>
                <template #default="{ $index }">

                    <span class="listItem">
                        <img :src="`${store.state.musicList[$index].al.picUrl}?param=45y45`" alt="">
                        <p style="margin-left: 10%; font-weight: 600;">
                            {{ store.state.musicList[$index].name }}
                        </p>
                    </span>

                </template>
            </el-table-column>
            <el-table-column label="歌手" :width="tableWidth[2]">
                <template #default="{ $index }">
                    <div class="small">
                        {{ getSingers($index, store.state.musicList) }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="专辑" :width="tableWidth[3]">
                <template #default="{ $index }">
                    <div class="small">
                        {{ store.state.musicList[$index].al.name }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="喜欢" :width="tableWidth[4]">
                <template #default="{ $index }">
                    <svg v-if="!isLikeSong(store.state.musicList[$index].id)" xmlns="http://www.w3.org/2000/svg"
                        width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16"
                        style="margin-left:6px; cursor: pointer;">
                        <path
                            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>
                    <svg v-if="isLikeSong(store.state.musicList[$index].id)" xmlns="http://www.w3.org/2000/svg"
                        width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16"
                        style="margin-left:6px;color: red; cursor: pointer;">
                        <path fill-rule="evenodd"
                            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                    </svg>
                </template>
            </el-table-column>
            <el-table-column label="时长" :width="tableWidth[5]">
                <template #default="{ $index }">
                    {{ transformTime(store.state.musicList[$index].dt / 1000) }}
                </template>
            </el-table-column>




        </el-table>
        <!-- <section v-if="!isloadOk" id="scroll_load_tip">
            加载中...
        </section> -->
    </section>
</template>

<script setup>
import getSingers from '@/hooks/useGetSingers';
import { useRoute } from 'vue-router';
import { cloudeRequest } from '@/utils/request';
import transformTime from '../hooks/useTransformTimeStamp'
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import emitter from '@/utils/emitter';
import isLikeSong from '@/hooks/isLikeSong';
import * as tableStyle from '@/utils/el-table_style'
const route = useRoute()
const store = useStore()
const over = ref(store.state.initSongNum)
//table表格自适应高度
const tableContainer = ref(null)
const tableHeight = ref(0)
const tableWidth = reactive([0, 0, 0, 0, 0, 0])
const updateTableSize = () => {
    if (tableContainer.value) {
        let size = tableContainer.value.getBoundingClientRect()
        tableHeight.value = size.height;
        tableWidth[0] = 0.04 * size.width;
        tableWidth[1] = 0.235 * size.width;
        tableWidth[2] = 0.245 * size.width;
        tableWidth[3] = 0.245 * size.width;
        tableWidth[4] = 0.1275 * size.width;
        tableWidth[5] = 0.11 * size.width;
    }
}
//播放音乐列表全部歌曲
const playAll = () => {
    store.commit('CHANGEALLPLAYLIST', store.state.musicList);
    store.commit('UPDATECURRENTPLAY', 0);
}
//喜欢音乐列表滚动加载时避免重复更新
let isloadOk = ref(true)
emitter.on('loadOk', () => {
    isloadOk.value = true
})
const vScroll = {
    mounted(el) {
        const target = el.querySelector('.el-scrollbar__wrap');
        if (route.name == 'likelist') {
            target.addEventListener('scroll', () => {
                if (over.value >= store.state.likeList_ids?.length) {
                    return
                }
                else {
                    if (isloadOk.value) {
                        if (target.scrollTop + target.clientHeight >= target.scrollHeight - 5) {
                            isloadOk.value = false
                            over.value = over.value + 50;
                            emitter.emit('upLoadLikeList', over.value)
                        }
                    }
                }
            })
        }
        else {
            target.addEventListener('scroll', () => {
                if (over.value >= store.state.musicList?.length) {
                    return
                }
                else {
                    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 5) {
                        over.value = over.value + 50;
                    }
                }
            })
        }
    },
}
//喜欢音乐部分

//将选择的音乐加入playList播放列表并播放
const isPlay = ref(false)
emitter.on('sendisPlay', (state) => {
    isPlay.value = state
})
const playMusic = (song) => {
    isPlay.value = true
    store.commit('PUTINTOPLAYLIST', song)
    store.dispatch('updateCurrentMusicUrl')
}
//接受兄弟组件MusicPlayer传递的播放方法
const pause = () => {
    isPlay.value = false
    emitter.emit('play_pause');
}
const play = (song) => {
    isPlay.value = true
    if (song.id == (store.state.playList.length != 0 && store.state.playList[store.state.currentPlay].id)) {
        emitter.emit('play_pause');
    }
    else {
        playMusic(song);
    }
}
onMounted(() => {
    updateTableSize();
    window.addEventListener('resize', updateTableSize)
})
// onUnmounted(() => {
//     window.removeEventListener('resize', updateTableSize())
// })
</script>
<style lang='less'>
:deep(.el-table__inner-wrapper::before) {
    height: 0;
}

section {
    height: 100%;
    width: 100%;
}

#scroll_load_tip {
    position: absolute;
    z-index: 12;
    background-color: rgb(199.5, 201, 204);
    width: 10%;
    height: 10%;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateX(-50%);
    border-radius: 0.4vw;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;

}

#row_header {
    display: flex;

    svg {
        display: none;
        transform: translateX(-20%);
        cursor: pointer;
    }

}

.musictable {
    width: 100%;
    height: 100%;
}

.el-table {
    --el-table-row-hover-bg-color: rgba(6, 6, 6, 0.4)
}

.listItem {
    display: flex;
    align-items: center;

    img {
        width: 2.5vw;
        border-radius: 5px;
    }

    p {
        margin-left: 7px;
    }
}

.el-table__row {

    &:hover {

        #row_header {
            span {
                display: none;
            }

            svg {
                display: block;

            }
        }
    }
}


.small {
    font-size: 13px;
    font-weight: 500;
}

#song {
    display: flex;
    align-items: center;

    button {
        margin-left: 10%;
        width: 30%;
        cursor: pointer;
        font-size: 13px;
        font-weight: 200;
        border: 0;
        border-radius: 3px;
        background-color: gray;
        color: white;
    }
}
</style>
