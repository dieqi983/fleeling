export const useMusicStore=defineStore('music',()=>{
  const curMusicList=ref([])
  const curPlayMusic=computed(()=>{
    return curMusicList.value[0]
  })
  const toNext=(musicId)=>{
    //先根据id找到音乐需要置顶的音乐对象的位置
    const needMoveIndex=curMusicList.value.findIndex((music)=>{
      return music.id===musicId
    })
    //如果是正在播放的或是已经就是第二首音乐或不存在就直接返回false
    if(needMoveIndex===0 || needMoveIndex===1 ||needMoveIndex===-1){
      return
    }
    //获取需要移动的音乐对象
    const needMoveMusic = curMusicList.value[needMoveIndex]
    //删除原位置需要移动的音乐元素
    curMusicList.value.splice(needMoveIndex, 1)
    //在第二个位置插入需要移动的元素
    curMusicList.value.splice(1,0,needMoveMusic)
  }
  const switchList=(musicList)=>{
    curMusicList.value=musicList
  }
  const switchPlayMusic=(music)=>{
    curMusicList.value.unshift(music)
  }
  const deleteMusic=(musicId)=>{
    
  }
})