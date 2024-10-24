import axios from 'axios'
import store from '../store/index'
import globalConfig from '@/global.config'
axios.defaults.withCredentials = true
const Cookie =
  'MUSIC_U=00F7D23C0D0D5423B9B9A82735EB10417224F5CA551051713268484FF0BA13C2FF29F8E0D8AE5785AE1026034D57CE234686BF0BC3BD76EF93E9662F1BC46A0256C665CD82B2EE37A62E7584DFC17FB47E9F87BE9CB204D85920D9647F036382F0EE7BB2A9E43E4911D5EF5C914876FFB67CE30895C7EDC14B1A1939A908B67AECF2460AA1D79C15F53C6DD3CE45EA96F22009B785FDE4CA23889C7D863EAD19E0264BF85DF866132D9347ADB7D7A17B2AFE565558886E56AA432CD9DA16C9BE80383D57054B2C17E27F495CE2AE81624D5E7A9DB8421DF9239E8404DB70FE3B7660A90CBCD05332D2BE6802D8AB70533BD2786223AF3B05654F0C0F05805100BC329AE2A79D238F566E76B891E1089EDBE812F4F47FF8A08C4EB5B77BAFCB969D2897EC0E2B2392F0CE0F3379200C19F9F1DDAF10052B3C96F7880B65F78D48E569B510B2C2111EE7370F6851221D3627'
export const cloudeRequest = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  params: {
    cookie: encodeURIComponent(Cookie)
  }
})
cloudeRequest.interceptors.request.use(
  (config) => {
    if (globalConfig.needLoadingWeb.indexOf(config.url) != -1) {
      store.commit('CHANGELOADING')
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
cloudeRequest.interceptors.response.use(
  (res) => {
    if (globalConfig.needLoadingWeb.indexOf(res.config?.url) != -1) {
      store.commit('CHANGELOADING')
    }
    return res
  },
  (err) => {
    return Promise.reject(err)
  }
)
export const showLoadingRequest = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  params: {
    cookie: encodeURIComponent(Cookie)
  }
})
showLoadingRequest.interceptors.request.use(
  (config) => {
    store.commit('CHANGELOADING')

    return config
  },
  (err) => {
    alert('发送失败')
    return Promise.reject(err)
  }
)
showLoadingRequest.interceptors.response.use(
  (res) => {
    store.commit('CHANGELOADING')

    return res
  },
  (err) => {
    alert('接收数据失败')
    return Promise.reject(err)
  }
)
