<template>
    <section>
        <el-row style="height: 100%;overflow: hidden;">
            <el-col style="height: 100%;" :span="12">
                <div id="left">
                    <div class="btn_close" @click="fn">
                        <el-icon :size="20">
                            <i-ep-ArrowDownBold />
                        </el-icon>
                    </div>
                    <div class="songImg">
                        <div class="img_wrap">
                            <img :style="{
                                animationPlayState: isPlay ? 'running' : 'paused'
                            }" :src="store.state.playList[currentPlay]?.al?.picUrl" alt="">
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col style="height: 100%;" :span="12">
                <div id="right">
                    <div class="songInfo">
                        <h2>{{ store.state.playList[currentPlay]?.name }}</h2>
                        <div>
                            <p>专辑: {{ store.state.playList[currentPlay]?.al?.name }}</p>
                            <p>歌手: {{ getSingers(currentPlay, store.state.playList) }}</p>
                        </div>
                    </div>
                    <div ref="lyrics_container" class="lyrics_container">
                        <p :ref="`lyricline`" :style="{
                            transform: isStress ? 'scale(1.1)' : '',
                        }" v-for="(item, key) in lyrics" :key="key">
                            {{ item }}
                        </p>
                    </div>
                </div>
            </el-col>
        </el-row>

    </section>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'
import getSingers from '@/hooks/useGetSingers';
import emitter from '@/utils/emitter';
import { getLyrics } from '@/api/cloude';
const store = useStore();
//是否展示歌词
const emit = defineEmits(['send-is-show-lyrics'])
const fn = () => {
    emit('send-is-show-lyrics', false)
}
//根据播放开关控制唱片
const isPlay = ref(false)
emitter.on('sendisPlay', (val) => {
    isPlay.value = val;
})
//歌词展示模块
//#region
//接口返回歌词样式转换
const lyrics = reactive({})
const transformLyrics = async (id) => {
    let { data: { lrc: { lyric } } } = await getLyrics(id)
    lyric = lyric.split("\n");
    let temp = {};
    lyric.forEach(item => {
        if (item.length > item.indexOf(']') + 1) {

            temp[item.slice(1, item.indexOf(']'))] = item.slice(item.indexOf(']') + 1)
        }
    });

    for (let key in lyrics) {
        delete lyrics[key]
    }
    Object.assign(lyrics, temp)
    timeList = Object.keys(lyrics).map(val => transformTimeIntoSecond(val))
}
//当歌曲变化
const lyrics_container = ref(null)
const currentPlay = computed(() => {
    return store.state.currentPlay
})
watch(currentPlay, (newVal) => {
    transformLyrics(store.state.playList[newVal]?.id)


})
//接收歌曲播放的时间
const nowTime = ref(0)
emitter.on('sendTime', (time) => {
    nowTime.value = time;

})
//歌词随播放滚动
let timeList = [];
//跟新歌词当前行
let nowLineIndex = ref(0)
watch(nowTime, () => {

    nowLineIndex.value = timeList.findIndex(item => nowTime.value < item) - 1;
    for (let i = 0; i < timeList.length; i++) {
        if (i != nowLineIndex.value) {
            lyrics_container.value.children[i].style.color = 'black'
        }
        else if (i == nowLineIndex.value) {
            lyrics_container.value.children[i].style.color = 'white'
        }
    }
    if (nowLineIndex.value < 0) {
        lyrics_container.value.children[timeList.length - 1].style.color = 'white'
    }
    // console.log(lyrics_container.value.scrollTop)
})
//歌词滚动平滑动画
let timer;
emitter.on('cleanInterval', () => {
    clearInterval(timer);
})
const smoothScroll = (el, walk, target) => {
    console.log('scrollTo', el.scrollTop)
    console.log('target', target)
    clearInterval(timer);
    if (target > 0) {
        let speed = Math.floor((target - el.scrollTop) / walk);

        if (speed > 0) {
            timer = setInterval(() => {
                if (el.scrollTop >= target || el.scrollTop + el.clientHeight >= el.scrollHeight) {
                    clearInterval(timer);
                }
                else {
                    console.log('timer')
                    el.scrollTop += speed;
                }
            }, 3)
        }
        else {
            timer = setInterval(() => {
                if (el.scrollTop <= target || el.scrollTop <= 0) {
                    clearInterval(timer);
                }
                else {
                    console.log('timer')
                    el.scrollTop += speed;
                }
            }, 3)
        }


    }
    else {
        el.scrollTop = 0
    }
}
watch(nowLineIndex, (newVal) => {
    if (newVal >= 0) {
        smoothScroll(lyrics_container.value, 80, lyrics_container.value.children[0].offsetHeight * newVal)
    }

})
//字符串分秒形式时间转秒  00:02.233
const transformTimeIntoSecond = (timeStr) => {
    return parseFloat(timeStr.slice(0, 2)) * 60 + parseFloat(timeStr.slice(3))
}
//#endregion
onMounted(() => {
    transformLyrics(store.state.playList[currentPlay.value]?.id)
})
</script>

<style lang="less" scoped>
section {
    width: 100%;
    height: 100%;
    backdrop-filter: blur(200px);

    #left {


        height: 100%;

        .songImg {
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            .img_wrap {
                width: 20vw;
                height: 20vw;
                border-radius: 50%;
                background-image: linear-gradient(to bottom right, black, rgb(78, 75, 75));
                display: flex;
                justify-content: center;
                align-items: center;


                img {
                    width: 70%;
                    border-radius: 50%;
                    animation: rotating 120s linear infinite forwards;
                }
            }

            .animate_pause {
                animation-play-state: paused;
            }
        }

        .btn_close {
            cursor: pointer;
            height: 1.8vw;
            width: 1.8vw;
            margin-left: 2%;
            transform: translateY(20%);
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(6, 6, 6, 0.4);


            &:active {
                transform: translateY(20%) scale(0.96);
            }
        }
    }

    #right {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;

        .songInfo {
            margin-top: 6vh;
            height: 13%;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;



            div {
                width: 60%;
                display: flex;
                font-size: 14px;
                justify-content: space-around;

            }
        }

        .lyrics_container {
            transition: all 0.5s;
            display: flex;
            flex-direction: column;
            overflow: auto;
            width: 100%;
            height: 60%;
            margin-top: 2vh;
            align-items: center;
            position: relative;
            justify-content: space-around;

            &::before {
                position: absolute;
                top: 0;
                left: 0;
                content: '';
                display: block;

                height: 4vh;
                width: 100%;
            }

            p {
                transform: translateY(1.3vh);
                font-size: 21px;
                padding-top: 2.2vh;
                color: #111;
            }
        }
    }
}

::-webkit-scrollbar {
    transform: translateX(10%)
}

@keyframes rotating {
    from {
        transform: rotate(0);
    }

    50% {
        transform: rotate(180deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>