<template>
  <div 
  class=" w-screen h-screen register-container flex flex-col justify-center items-center"
  >
    <div 
    class=" h-1/2 w-1/2 flex flex-col items-center justify-center relative rounded-2xl border border-gray-200 shadow-lg"
    >
      <el-form 
      ref="formRef"
      class="w-[30vw] max-w-[90vw]" 
      label-position="right" 
      label-width="auto"
      :model="user"
      status-icon
      :rules="rules"
      >
        <el-form-item 
        label="用户名："
        prop="userName"
        >
          <el-input
          v-model="user.userName"
          type="text"
          size="large"
          />
        </el-form-item>
        <el-form-item 
        label="密码："
        prop="passWord"
        >
          <el-input 
          v-model="user.passWord"
          type="password"
          size="large"
          />
        </el-form-item>
        <el-form-item 
        class="submit-item" 
        label-width="0"
        >
          <MainButton 
          text="登录"
          @click="handleSubmit"
          />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>


definePageMeta({
  layout: false
})


const user=ref({
  userName:'',
  passWord:''
})
const { login }=useUserStore()
const handleSubmit=async()=>{
  const isVerifyPass = await formRef.value.validate()
    if(isVerifyPass){
      const result=await login(user.value)
      console.log(result)
    }
}
const rules=ref({
userName:[{required:true  , max:10 , message:'用户名长度在1-10之间' , trigger:'blur'}],
passWord:[{required:true , message:'请输入密码' , trigger:'blur'}]
})
const formRef=ref(null)

</script>

<style lang="scss" scoped>
.register-container{
  :deep(.el-form-item){
    margin-top: 60px;
  }
  :deep(.el-form-item__label) {
    font-size: 20px;
  }
  :deep(.submit-item .el-form-item__content) {
  justify-content: center;

  }
  :deep(.el-input__inner){
    font-size:18px ;
  }
  :deep(.submit-button) {
  width: 120px;
  height: 50px;
  }
}

</style>


