import store from '@/store/index'
export default (id) => {
  if (store.state.likeList_ids.indexOf(id) != -1) {
    return true
  }
  return false
}
