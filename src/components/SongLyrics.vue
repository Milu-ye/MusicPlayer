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
                            }" :src="store.state.playList[store.state.currentPlay]?.al?.picUrl" alt="">
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col style="height: 100%;" :span="12">
                <div id="right">
                    <div class="songInfo">
                        <h2>{{ store.state.playList[store.state.currentPlay]?.name }}</h2>
                        <div>
                            <p>专辑: {{ store.state.playList[store.state.currentPlay]?.al?.name }}</p>
                            <p>歌手: {{ getSingers(store.state.currentPlay, store.state.playList) }}</p>
                        </div>
                    </div>
                    <div class="lyrics_container">
                        <p :style="{
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
import { onMounted, reactive, ref } from 'vue'
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
        if (item.length > 11) {
            temp[item.slice(1, 10)] = item.slice(11)
        }
    });
    Object.assign(lyrics, temp)
    console.log(lyric)
    console.log(lyrics)
}
const isStress = ref(false)
//#endregion
onMounted(() => {
    transformLyrics(store.state.playList[store.state.currentPlay]?.id)
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
                    animation: rotating 60s linear infinite forwards;
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
            transition: all 0.1s;

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
            display: flex;
            flex-direction: column;
            overflow: auto;
            width: 100%;
            height: 60%;
            margin-top: 2vh;
            align-items: center;
            position: relative;

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
                font-size: 21px;
                margin-top: 2vh;
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