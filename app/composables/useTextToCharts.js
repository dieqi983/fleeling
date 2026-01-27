export function useTextToChars(texts){
  const charts=computed(()=>{
    return texts.value.split('')
  })
  return charts
}