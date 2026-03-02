
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('click-outside',{
    mounted(el,binding){
      el.clickOutsideHandler=(e)=>{
        if(!el.contains(e.target)){
          binding.value(e)
        }
      }
      document.addEventListener('click',el.clickOutsideHandler)
    },
    unmounted(el){
      if(el.clickOutsideHandler){
        document.removeEventListener('click',el.clickOutsideHandler)
        delete el._clickOutsideHandler
      }
    }
  })
})