import { ref } from "vue"

export const useUserStore=defineStore('user',()=>{
  //当前用户
  const currentUser=ref(null)
  //是否已经登录（计算属性）
  const isLogin=computed(()=>{
    return currentUser.value !== null
  })
  //是否初始化
  const isInit=ref(false)
  //是否在等待
  const loading=ref(false)
  const cuurentUserId=computed(()=>{
    return currentUser.value?.id
  })
  const userMusicFavor=computed(()=>{
    return new Set(currentUser.value?.musicFavors)
  })
  const setCurrentUser=(newUser)=>{
    currentUser.value=newUser
  }
  const login=async ()=>{
    loading.value=true
    try {
      //请求登录接口，设置cookie
      //请求用户信息
      //设置初始化状态为true
    } catch (error) {
      //重置用户状态
      //设置初始化状态为true
      //抛出错误
    }finally{
      loading.value=false
    }
  }
})