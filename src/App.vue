<template>
  <router-view></router-view>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex';
import getSongInfo from './hooks/useIdGetSongInfo';
const store = useStore()
console.log(store.state.playList.length != 0 && store.state.playList[store.state.currentPlay])
let currentPlay = computed(() => {
  return store.state.currentPlay
})
let playList = computed(() => {
  return store.state.playList
})
if (store.state.playList.length == 0) {
  store.commit('BEGINED');
}
watch(currentPlay, () => {
  localStorage.setItem('currentPlay', currentPlay.value);
  store.dispatch('updateCurrentMusicUrl')
})
watch(playList, () => {
  localStorage.setItem('playList', JSON.stringify(playList.value));
}, {
  deep: true
})
onMounted(() => {
  store.dispatch('getAccountInfo');
  store.dispatch('requestLikeList');
})
</script>

<style lang="less" scoped>
#app {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

}
</style>