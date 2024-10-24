<template>
    <div class="search_wrapper">
        <header>
            <a href="#"><span @click="getCreatePlayList">创建的歌单</span></a>

            <a href="#"><span @click="getCollectPlayList">收藏的歌单</span></a>
        </header>
        <div class="search_content">
            <ErPlayList></ErPlayList>
        </div>
    </div>
</template>

<script setup>
import ErPlayList from './ErPlayList.vue';
import { getUserPlaylist, getSongsInPlaylist } from '@/api/cloude';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { onMounted, reactive } from 'vue';
const store = useStore()
const route = useRoute()
//获取用户歌单
let userPlaylist = reactive([])
//渲染创建歌单
const getCreatePlayList = () => {
    console.log(userPlaylist[2])
    store.commit('GETSONGPLAYLIST', userPlaylist.filter((item) => {
        return item.creator?.nickname == store.state.accountInfo.profile?.nickname
    }))
}
const getCollectPlayList = () => {
    store.commit('GETSONGPLAYLIST', userPlaylist.filter(item => item.creator?.nickname != store.state.accountInfo.profile?.nickname))
}
//向父组件发送是否展示歌单列表

onMounted(() => {
    getUserPlaylist(store.state.accountInfo.account?.id).then(({ data }) => {
        Object.assign(userPlaylist, data.playlist);
        getCreatePlayList()
    })
})
</script>

<style lang="less" scoped>
.search_wrapper {
    width: 100%;
    height: 100%;

    header {
        margin: 0 auto;
        height: 8%;
        width: 98%;
        color: white;
        display: flex;
        align-items: center;
        border-bottom: 1px solid gray;
        padding: 0 1% 0 1%;


        a {
            width: 15%;
            height: 60%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        span {
            font-size: 14px;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 1vh;
            cursor: pointer;

            &:hover {
                background-color: #606266;
            }
        }
    }

    .search_content {
        height: 92%;
    }
}
</style>