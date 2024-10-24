import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/ErMain.vue'
import Login from '../views/ErLogin.vue'
import Home from '../views/ErHome.vue'
import MusicList from '../views/ErMusicList.vue'
import SearchList from '@/views/ErSearchList.vue'
import HistoryList from '@/views/ErHistoryList.vue'
import PlayList from '@/views/ErPlayList.vue'
import Myplaylist from '@/views/MyPlaylist.vue'
import ErPlayList from '@/views/ErPlayList.vue'
import SongLyrics from '@/components/SongLyrics.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'begin',
      component: Main,
      children: [
        {
          path: 'home',
          name: 'home',
          component: Home
        },
        {
          path: 'search',
          name: 'search',
          component: SearchList,
          children: [
            {
              path: 'music',
              name: 'searchmusic',
              component: MusicList
            },
            {
              path: 'singer',
              name: 'searchsinger'
            },
            {
              path: 'album',
              name: 'searchalbum'
            },
            {
              path: 'playlist',
              name: 'searchplaylist',
              component: PlayList
            },
            {
              path: 'user',
              name: 'searchuser'
            }
          ]
        },
        {
          path: 'likelist',
          name: 'likelist',
          component: MusicList
        },
        {
          path: 'history',
          name: 'history',
          component: HistoryList,
          children: [
            {
              path: 'music',
              name: 'historymusic',
              component: MusicList
            },
            {
              path: 'playlist',
              name: 'historyplaylist',
              component: PlayList
            },
            {
              path: 'album',
              name: 'historyalbum'
            }
          ]
        },
        {
          path: 'detailplaylist',
          name: 'detailplaylist',
          component: MusicList
        },
        {
          path: 'myplaylist',
          name: 'myplaylist',
          component: Myplaylist
          // children: [
          //   {
          //     path: 'create',
          //     name: 'create',
          //     component: ErPlayList
          //   },
          //   {
          //     path: 'collect',
          //     name: 'create',
          //     component: ErPlayList
          //   }
          // ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

export default router
