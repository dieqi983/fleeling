export const useMusicStore = defineStore('music', () => {
  const songsById = ref({})
  const queue = ref([])
  const currentMusicId = ref(null)
  const isPlaying=ref(false)
  const curMusicList = computed(() => {
    return queue.value
      .map((id) => songsById.value[id])
      .filter(Boolean)
  })

  const curPlayIndex = computed(() => {
    if (currentMusicId.value === null) {
      return -1
    }

    return queue.value.findIndex((id) => id === currentMusicId.value)
  })

  const curPlayMusic = computed(() => {
    if (currentMusicId.value === null) {
      return undefined
    }

    return songsById.value[currentMusicId.value]
  })
  const pausePlay=()=>{
    isPlaying.value=false
  }
  const play=()=>{
    isPlaying.value=true
  }
  const registerMusic = (music) => {
    if (!music || music.id === undefined || music.id === null) {
      return null
    }

    songsById.value[music.id] = {
      ...(songsById.value[music.id] || {}),
      ...music,
    }

    return music.id
  }

  const ensureCurrentMusic = (preferredIndex = 0) => {
    if (!queue.value.length) {
      currentMusicId.value = null
      return
    }

    if (!queue.value.includes(currentMusicId.value)) {
      const safeIndex = Math.min(
        Math.max(preferredIndex, 0),
        queue.value.length - 1
      )
      currentMusicId.value = queue.value[safeIndex]
    }
  }

  const changePlayMusic = (needPlayMusic) => {
    const musicId = registerMusic(needPlayMusic)
    if (musicId === null || currentMusicId.value === musicId) {
      return
    }

    const index = queue.value.findIndex((id) => id === musicId)

    if (index === -1) {
      if (!queue.value.length || curPlayIndex.value === -1) {
        queue.value.push(musicId)
      } else {
        queue.value.splice(curPlayIndex.value, 0, musicId)
      }
    }

    currentMusicId.value = musicId
    play()
  }

  const addNextToPlay = (music) => {
    const musicId = registerMusic(music)
    if (musicId === null || currentMusicId.value === musicId) {
      return
    }

    if (!queue.value.length || curPlayIndex.value === -1) {
      queue.value.push(musicId)
      ensureCurrentMusic()
      return
    }

    const nextIndex = curPlayIndex.value + 1
    const existedIndex = queue.value.findIndex((id) => id === musicId)

    if (existedIndex === nextIndex) {
      return
    }

    let insertIndex = nextIndex
    if (existedIndex !== -1) {
      queue.value.splice(existedIndex, 1)
      if (existedIndex < nextIndex) {
        insertIndex -= 1
      }
    }

    queue.value.splice(insertIndex, 0, musicId)
  }

  const addMusicToList = (music) => {
    const musicId = registerMusic(music)
    if (musicId === null || queue.value.includes(musicId)) {
      return
    }

    queue.value.push(musicId)
    ensureCurrentMusic()
  }

  const deleteMusic = (musicArr = []) => {
    const deleteIdSet = new Set(
      musicArr
        .map((music) => music?.id)
        .filter((id) => id !== undefined && id !== null)
    )

    if (!deleteIdSet.size) {
      return
    }

    const fallbackIndex = curPlayIndex.value
    const isCurrentDeleted =
      currentMusicId.value !== null && deleteIdSet.has(currentMusicId.value)

    queue.value = queue.value.filter((id) => !deleteIdSet.has(id))

    if (isCurrentDeleted) {
      ensureCurrentMusic(fallbackIndex)
      return
    }

    ensureCurrentMusic()
  }

  const changePlayList=(list=[],startId)=>{
    songsById.value={}
    list.forEach(music => {
      registerMusic(music)
    });
    queue.value=list.map((music)=>{
      return music.id
    })  
    if(!startId){
      currentMusicId.value=queue.value[0]
    }
    else{
      currentMusicId.value=startId
    }
    ensureCurrentMusic()
  }
  return {
    songsById,
    queue,
    currentMusicId,
    isPlaying,
    curMusicList,
    curPlayIndex,
    curPlayMusic,
    pausePlay,
    play,
    changePlayMusic,
    addNextToPlay,
    addMusicToList,
    deleteMusic,
    changePlayList,
  }
})