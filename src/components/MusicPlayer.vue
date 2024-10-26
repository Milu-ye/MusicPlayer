<template>
    <div class="player">
        <div class="left">
            <img @click="changeShowLyric"
                :src="(store.state.playList.length != 0 && store.state.playList[store.state.currentPlay].al.picUrl) || 'https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg'"
                alt="">

            <div class="songinfo">
                <h5>{{ (store.state.playList.length != 0 && store.state.playList[store.state.currentPlay].name) || '无音乐'
                    }}</h5>
                <p>{{ store.state.playList.length != 0 && getSingers(store.state.currentPlay, store.state.playList) ||
                    ''

                    }}
                </p>
            </div>

        </div>
        <div class="center">
            <div class="control">
                <svg @click="likeMusic(true)" v-if="!isLikeSong(store.state.playList[store.state.currentPlay]?.id)"
                    xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-heart"
                    viewBox="0 0 16 16">
                    <path
                        d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg>
                <svg @click="likeMusic(false)" v-if="isLikeSong(store.state.playList[store.state.currentPlay]?.id)"
                    xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                    class="bi bi-heart-fill" viewBox="0 0 16 16" style="margin-left:6px;color: red; cursor: pointer;">
                    <path fill-rule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                </svg>
                <svg id="pre" @click="prePlay" xmlns="http://www.w3.org/2000/svg" width="30" height="40"
                    fill="currentColor" class="bi bi-skip-start-fill" viewBox="0 0 16 16" style="color: white;;">
                    <path
                        d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.54-.313 1.232.066 1.232.696v7.384c0 .63-.692 1.01-1.232.697L5 8.753V12a.5.5 0 0 1-1 0V4z" />
                </svg>
                <svg @click="play_pause" id="play" v-if="!isPlay" xmlns="http://www.w3.org/2000/svg" width="40"
                    height="40" fill="currentColor" class="bi bi-play-circle-fill" viewBox="0 0 16 16"
                    style="color: white;">
                    <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                </svg>
                <svg id="paly" @click="play_pause" v-if="isPlay" xmlns="http://www.w3.org/2000/svg" width="40"
                    height="40" fill="currentColor" class="bi bi-pause-circle-fill" viewBox="0 0 16 16"
                    style="color: white;">
                    <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z" />
                </svg>
                <svg id="next" @click="nextPlay" xmlns="http://www.w3.org/2000/svg" width="30" height="40"
                    fill="currentColor" class="bi bi-skip-end-fill" viewBox="0 0 16 16" style="color: white;">
                    <path
                        d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.693 3.3 4 3.678 4 4.308v7.384c0 .63.692 1.01 1.233.697L11.5 8.753V12a.5.5 0 0 0 1 0V4z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" @click="store.commit('CHANGESHOWPLAYLIST')" width="20"
                    height="20" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
            </div>
            <div class="progress">
                <span class="progresstime pass">
                    {{ currentTime_str }}
                </span>
                <div class="progressbar" ref="progressbar" @click="skipTime" @mouseover="selectBar">
                    <div class="passbar" :style="{ width: `${currentTime * 100 / duration}%` }">

                    </div>
                </div>
                <span class="progresstime end">
                    {{ duration_str }}
                </span>
            </div>
        </div>
        <div class="right">
            <div class="soundcontrol">
                <div ref="volume" class="volume" @mousedown="adjustVol" @mouseover="volumeAppear"
                    @mouseout="volumeDisappear" :style="{ visibility: isShowVolume ? 'visible' : 'hidden' }">
                    <div ref="currentVol" class="currentvol">

                    </div>
                </div>
                <svg v-if="hasSound" @mouseenter="volumeAppear" @mouseleave="volumeDisappear" @click="soundBtn"
                    xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                    class="bi bi-volume-down-fill" viewBox="0 0 16 16">
                    <path
                        d="M9 4a.5.5 0 0 0-.812-.39L5.825 5.5H3.5A.5.5 0 0 0 3 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 9 12V4zm3.025 4a4.486 4.486 0 0 1-1.318 3.182L10 10.475A3.489 3.489 0 0 0 11.025 8 3.49 3.49 0 0 0 10 5.525l.707-.707A4.486 4.486 0 0 1 12.025 8z" />
                </svg>
                <svg v-if="!hasSound" @mouseenter="volumeAppear" @mouseleave="volumeDisappear" @click="soundBtn"
                    xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                    class="bi bi-volume-mute-fill" viewBox="0 0 16 16">
                    <path
                        d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z" />
                </svg>
            </div>
            <div id="playmode">
                <svg @click="changeMode" v-if="mode == 0" xmlns="http://www.w3.org/2000/svg" width="18" height="25"
                    fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
                    <path
                        d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                </svg>
                <svg @click="changeMode" v-if="mode == 1" xmlns="http://www.w3.org/2000/svg" width="18" height="25"
                    fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                    <path
                        d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                    <path fill-rule="evenodd"
                        d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
                </svg>
                <svg @click="changeMode" v-if="mode == 2" xmlns="http://www.w3.org/2000/svg" width="18" height="25"
                    fill="currentColor" class="bi bi-shuffle" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z" />
                    <path
                        d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z" />
                </svg>
            </div>
            <div id="btn_ly">
                <svg @click="changeShowLyric" v-if="isShowLyrics" xmlns="http://www.w3.org/2000/svg" width="19"
                    height="25" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
                    <path
                        d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                </svg>
                <svg @click="changeShowLyric" v-if="!isShowLyrics" xmlns="http://www.w3.org/2000/svg" width="19"
                    height="25" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                    <path
                        d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
            </div>
        </div>
        <audio @seeking="seeking" @volumechange="volumechange" @ended="playMode" @loadeddata="init_music"
            @timeupdate="updateTime" ref="hidden_player" :src="currentMusicUrl"></audio>
    </div>

</template>

<script setup>
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue';
import { useStore } from 'vuex';
import transformTimeStamp from '@/hooks/useTransformTimeStamp';
import getSingers from '@/hooks/useGetSingers';
import emitter from '@/utils/emitter';
import isLikeSong from '@/hooks/isLikeSong';
import { likeSong, getLikeList } from '@/api/cloude'
//当播放位置开始跳转
const seeking = () => {
    emitter.emit('cleanInterval');
}
//音乐控制组件
const store = useStore()
let isPlay = ref(false)
const hidden_player = ref(null)
const progressbar = ref(null)
const duration = ref(null)
const duration_str = ref(null)
let currentTime = ref(null)
let currentTime_str = ref("00:00")
const emit = defineEmits(['send-is-show-lyrics'])

//监视currenMusicUrl的变化以便音乐更新时自动播放
let currentMusicUrl = computed(() => {
    return store.state.currentMusicUrl
})
watch(currentMusicUrl, () => {
    if (store.state.isBegin) {
        store.commit('BEGINED');
    }
    else {
        nextTick(() => {
            hidden_player.value.play();
            isPlay.value = true;
        })
    }
})
watch(isPlay, (newVal) => {
    emitter.emit('sendisPlay', newVal);
})
//音乐加载完成的初始化
const init_music = () => {
    duration_str.value = transformTimeStamp(hidden_player.value.duration)
    duration.value = hidden_player.value.duration
    hidden_player.value.volume = localStorage.getItem('volume')
}
//得到播放时
const updateTime = () => {
    getpasstime()
    emitter.emit('sendTime', currentTime.value)
}
const getpasstime = () => {
    currentTime_str.value = transformTimeStamp(hidden_player.value.currentTime)
    currentTime.value = hidden_player.value.currentTime;
}
//将经过的时间发送给歌词组件

//播放开关
const play_pause = () => {
    if (!isPlay.value) {
        hidden_player.value.play();
    }
    else {
        hidden_player.value.pause()
    }
    isPlay.value = !isPlay.value
}
emitter.on('play_pause', play_pause)
//喜欢音乐模块
const likeMusic = (isLike) => {
    likeSong(store.state.playList[store.state.currentPlay].id, isLike)
    getLikeList().then(({ data: { ids } }) => store.commit('GETLIKELIST', ids))


}
//跳过时间
const skipTime = (e) => {

    hidden_player.value.currentTime = (e.offsetX / progressbar.value.offsetWidth) * duration.value

    if (!isPlay.value) {
        hidden_player.value.play();
        isPlay.value = !isPlay.value
    }
}
//声音开关
const hasSound = ref(true)
const soundBtn = () => {
    hidden_player.value.volume = hasSound.value ? 0 : localStorage.getItem('volume');
    hasSound.value = !hasSound.value
}
//音量调节
const isShowVolume = ref(false)
const volume = ref(null)
const currentVol = ref(null)
const adjustVol = (e) => {
    hidden_player.value.volume = Math.floor(e.target.offsetHeight - e.offsetY) / volume.value.offsetHeight
    localStorage.setItem('volume', Math.floor(e.target.offsetHeight - e.offsetY) / volume.value.offsetHeight);
}
const volumeAppear = () => {
    isShowVolume.value = true
}
const volumeDisappear = () => {
    isShowVolume.value = false
}
const volumechange = () => {

    currentVol.value.style.height = `${hidden_player.value.volume * volume.value.offsetHeight}%`
}
//播放上一首音乐
const prePlay = () => {
    store.commit("PREPLAY");
}
//播放下一首音乐
const nextPlay = () => {
    store.commit('NEXTPLAY');
}
//播放模式
let mode = ref(0); //0:单曲循环,1:列表循环,2:随机播放
const changeMode = () => {
    mode.value++;
    if (mode.value == 3) {
        mode.value = 0;
    }
    localStorage.setItem('mode', mode.value);
}
const playMode = () => {
    if (mode.value == 0) {
        hidden_player.value.currentTime = 0;
        hidden_player.value.play();

    }
    else if (mode.value == 1) {
        nextPlay()

    }
    else {
        store.commit('UPDATECURRENTPLAY', Math.floor(Math.random() * (store.state.playList.length)))

    }
}
//歌词展示
const isShowLyrics = defineModel('isShowLyrics');
const changeShowLyric = () => {
    isShowLyrics.value = !isShowLyrics.value
}
onMounted(() => {
    currentVol.value.style.height = `${localStorage.getItem('volume') * 100}%`
    //组件加载时自动更新上次播放音乐
    store.dispatch('updateCurrentMusicUrl')
    mode.value = localStorage.getItem('mode') || 0

})


</script>

<style lang="less" scoped>
.player {
    width: 100%;
    height: 100%;
    background-color: rgba(6, 6, 6, 0.6);
    display: flex;
    justify-content: space-between;

    .right {
        width: 28%;
        height: 100%;
        padding-top: 2%;
        display: flex;
        align-items: center;

        svg {
            color: white;
            cursor: pointer;
        }

        svg:active {
            transition: all 0.1s;
            transform: scale(0.95);
        }

        .soundcontrol {

            height: 100%;
            position: relative;
            cursor: pointer;

            .volume {
                transition: all 0.1s;
                cursor: pointer;
                box-sizing: content-box;

                position: absolute;
                z-index: 100;
                top: -230%;
                left: 50%;
                transform: translate(-50%, 8%);
                height: 200%;
                width: 120%;
                background-color: rgba(233, 234, 236, 0.3);
                display: flex;

                flex-direction: column;
                justify-content: flex-end;
                align-items: center;
                border-radius: 3px;
                box-shadow: 0 0 3px;

                .currentvol {
                    content: '';
                    display: block;
                    width: 100%;
                    height: 50%;
                    background-color: white;
                    border-radius: 3px;
                }

                &::after {
                    content: '';
                    cursor: default;
                    display: block;
                    background-color: transparent;
                    height: 1.2vh;
                    width: 100%;
                    position: absolute;
                    bottom: 0;
                    transform: translateY(100%);
                    box-sizing: content-box;
                    border: 2px solid transparent;

                }
            }

            svg {
                color: white;
            }
        }

        #btn_ly {
            display: flex;
            align-items: start;
            height: 100%;
            transform: translateX(10%);

        }

        #playmode {
            display: flex;
            align-items: start;
            height: 100%;


            svg {
                color: white;
                cursor: pointer;
            }
        }

    }

    .left {
        padding-left: 2%;
        width: 26%;
        height: 100%;
        display: flex;
        align-items: center;
        color: white;

        img {
            width: 15%;
            border-radius: 5px;
            cursor: pointer;
        }

        .songinfo {
            width: 100%;
            height: 100%;
            display: flex;
            margin-left: 7%;
            justify-content: center;
            flex-direction: column;

            h5 {
                font-size: 15px;
            }

            p {
                font-size: 11px;
                margin-top: 2%;
            }
        }
    }

    .center {
        width: 45%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .control {
            padding-top: 5px;
            height: 50%;
            width: 50%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            transform: translateY(-25%);
            user-select: none;

            svg {
                cursor: pointer;
                transition: all 0.1s;
                color: white;

                &:active {
                    transform: scale(0.95);
                }
            }


        }

        .progress {
            user-select: none;
            width: 65%;
            height: 10%;
            transform: translateY(60%);
            display: flex;
            justify-items: center;
            align-items: center;

            .progresstime {
                font-size: 10px;
                color: aliceblue;
                margin: 0 5px 0 5px;
            }

            .progressbar {

                width: 100%;
                height: 70%;
                background-color: gray;
                border-radius: 10px;
                cursor: pointer;

                &:hover {
                    .passbar {
                        background-color: #fff;

                        &::after {
                            display: block;
                            border-radius: 50%;
                            content: '';
                            background-color: #fff;
                            width: 8px;
                            height: 8px;
                            box-shadow: 0 0 2px;
                            float: right;
                            transform: translate(50%, -20%);
                        }
                    }
                }

                .passbar {
                    width: 0;
                    border-radius: 10px;
                    height: 100%;
                    background-color: #ffffffa0;

                }
            }
        }
    }
}
</style>