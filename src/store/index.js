import { createStore } from 'vuex'
import { cloudeRequest } from '@/utils/request'
import axios from 'axios'
import { getaccountInfo, getLikeList } from '../api/cloude'
export default createStore({
  state: {
    musicList: [], //渲染列表
    likeList_ids: [], //喜欢的音乐列表（ids）
    playList: JSON.parse(localStorage.getItem('playList')) || [], //播放列表
    currentMusicUrl: '', //
    currentPlay: localStorage.getItem('currentPlay') || 0,
    reload: true,
    loading: false,
    isShowPlayList: false,
    isBegin: true,
    accountInfo: {},
    initSongNum: 50, //滚动加载时的初始化数量
    songPlayList: [] //歌单列表
  },
  actions: {
    //更新音乐url
    async updateCurrentMusicUrl({ commit, state }) {
      const {
        data: { data }
      } = await cloudeRequest.get('/song/url', {
        params: {
          id: state.playList.length != 0 && state.playList[state.currentPlay].id
        }
      })
      commit('UPDATECURRENTMUSICURL', data[0].url)
    },
    //请求账户信息
    async getAccountInfo({ commit }) {
      const { data } = await getaccountInfo()
      commit('GETACCOUNTINFO', data)
    },
    //请求喜欢音乐列表
    async requestLikeList({ commit, state }) {
      const {
        data: { ids }
      } = await getLikeList()
      commit('GETLIKELIST', ids)
    }
  },
  mutations: {
    //存储喜欢音乐的列表
    GETLIKELIST(state, ids) {
      state.likeList_ids = ids
    },
    //获取账号信息
    GETACCOUNTINFO(state, info) {
      state.accountInfo = info
    },
    //更新音乐url
    UPDATECURRENTMUSICURL(state, url) {
      state.currentMusicUrl = url
    },
    //渲染音乐列表
    GETMUSICLIST(state, val) {
      state.musicList = val
    },
    //渲染歌单列表
    GETSONGPLAYLIST(state, val) {
      state.songPlayList = val
    },
    //设置loading加载动画
    CHANGELOADING(state) {
      state.loading = !state.loading
    },
    //插入播放列表
    PUTINTOPLAYLIST(state, val) {
      if (state.playList.length != 0) {
        const findindex = state.playList.findIndex((item) => item.id == val.id)
        if (findindex != -1) {
          state.playList.splice(findindex, 1)
        }
      }
      console.log(state.playList)
      state.playList.splice(state.currentPlay, 0, val)
    },
    //替换整个播放列表
    CHANGEALLPLAYLIST(state, list) {
      state.playList = list
    },
    //播放下一首
    NEXTPLAY(state) {
      state.currentPlay++
      //列表全部播放完，重新播放
      if (state.currentPlay == state.playList.length) {
        state.currentPlay = 0
      }
    },
    //播放上一首
    PREPLAY(state) {
      state.currentPlay--
      if (state.currentPlay == -1) {
        state.currentPlay = state.playList.length - 1
      }
    },
    //是否展示播放列表
    CHANGESHOWPLAYLIST(state) {
      state.isShowPlayList = !state.isShowPlayList
    },
    BEGINED(state) {
      state.isBegin = false
    },
    //改变当前播放音乐currentPlay
    UPDATECURRENTPLAY(state, cur) {
      state.currentPlay = cur
    },
    //删除播放列表中的音乐
    REMOVEMUSIC(state, index) {
      state.playList.splice(index, 1)
      if (index == state.playList.length - 1) {
        state.currentPlay = 0
      }
    },
    //清空播放列表所有音乐
    CLEARPALYLIST(state) {
      state.playList.splice(0, state.playList.length)
      state.currentPlay = 0
      state.currentMusicUrl = ''
    }
  }
})
