<template>
    <section v-loading="store.state.loading" ref="tableContainer">
        <el-table v-if="!store.state.loading" @row-dblclick="jumpToMusicList" v-scroll :scrollbar-always-on="true"
            :data="songPlayList.slice(0, over)" :height="tableHeight" :style="tableStyle.elTableStyle" max-height="610"
            :fit="false" :row-style="tableStyle.rowStyle" :cell-style="tableStyle.cellStyle"
            :header-cell-style="tableStyle.headerCellStyle" :header-row-style="tableStyle.headerRowStyle">

            <el-table-column label="#" :width="tableWidth[0]">
                <template #default="{ $index }">
                    <div style="font-size: 12px;font-weight: 600;">
                        {{ $index + 1 }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column :width="tableWidth[1]" label=" 标题">
                <template #default="{ $index }">
                    <div class="listItem">

                        <img :src="songPlayList[$index]?.coverImgUrl" alt="">
                        <p>{{ songPlayList[$index]?.name }}</p>

                    </div>
                </template>
            </el-table-column>
            <el-table-column :width="tableWidth[2]" :label="songPlayList[0]?.trackCount ? '歌曲数' : ''">
                <template #default="{ $index }">
                    <div class="small">
                        <p>{{ songPlayList[$index]?.trackCount }}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="创建者" :width="tableWidth[3]">
                <template #default="{ $index }">
                    <div class="small">
                        <p>{{ songPlayList[$index]?.creator?.nickname }}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :width="tableWidth[4]" :label="songPlayList[0]?.playCount ? '播放量' : ''">
                <template #default="{ $index }">
                    <div class="small">
                        <p>{{ songPlayList[$index]?.playCount ? transformPlayCount(songPlayList[$index]?.playCount) : ''
                            }}
                        </p>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </section>
</template>

<script setup>
import { ref, reactive, onMounted, compile, computed } from 'vue'
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import * as tableStyle from '@/utils/el-table_style'
import { getSongsInPlaylist } from '../api/cloude'
const route = useRoute()
const router = useRouter()
const store = useStore();
const songPlayList = computed(() => {
    return store.state.songPlayList
})
//跳转到音乐列表
const jumpToMusicList = async (row) => {
    router.push({
        name: 'detailplaylist'
    })
    const { data: { songs } } = await getSongsInPlaylist(row.id);
    store.commit('GETMUSICLIST', songs);
}
//table表格自适应高度
const tableContainer = ref(null)
const tableHeight = ref(0)
const tableWidth = reactive([0, 0, 0, 0, 0])
const updateTableSize = () => {
    if (tableContainer.value) {
        let size = tableContainer.value.getBoundingClientRect()
        tableHeight.value = size.height;
        tableWidth[0] = 0.0424 * size.width;
        tableWidth[1] = 0.504 * size.width;
        tableWidth[2] = 0.13525 * size.width;
        tableWidth[3] = 0.2164 * size.width;
        tableWidth[4] = 0.1001 * size.width;
    }
}
//滚动加载
//#region
const over = ref(store.state.initSongNum)
const vScroll = {
    mounted(el) {
        const target = el.querySelector('.el-scrollbar__wrap');


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

    },
}
//播放量单位转化
const transformPlayCount = (num) => {
    if (num < 100000) {
        return num
    }
    else if (num < 100000000) {
        return Math.round(num / 10000) + '万'
    }
    else {
        return Math.round(num / 100000000) + '亿'
    }
}
//#endregion
onMounted(() => {
    updateTableSize()
})
</script>

<style lang="less" scoped>
:deep(.el-table__row) {

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
    ;
}

.listItem {
    display: flex;
    align-items: center;
    font-weight: 500;

    img {
        width: 2.5vw;
        border-radius: 5px;
    }

    p {
        margin-left: 7px;
    }
}
</style>