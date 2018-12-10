<template>
  <div class="login-warp">
    <canvasView :width="1000"
                :height="1000"></canvasView>
    <el-form :model="numberValidateForm"
             ref="loginValidateForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item>
        <div>权限后台管理</div>
      </el-form-item>
      <el-form-item label="登录名"
                    prop="name"
                    :rules="[
      { required: true, message: '登录名不能为空'}
    ]">
        <el-input type="text"
                  v-model.number="numberValidateForm.name"
                  auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="password"
                    :rules="[
      { required: true, message: '密码不能为空'}
    ]">
        <el-input type="password"
                  v-model.number="numberValidateForm.password"
                  auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item class="center">
        <el-button type="primary"
                   @click="submitForm('loginValidateForm')">提 交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss">
  @import './index.scss';
</style>
<script type="text/babel">
  import vm from './vm';
  export default vm;
</script>