<template>
  <div>
    <m-table v-model="indexDate">
      <i class="el-icon-plus"
         slot="header"
         @click="add"></i>
      <el-table-column prop="name"
                       label="姓名">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column prop="sex"
                       label="性别">
        <template slot-scope="scope">
          {{scope.row.sex===2?'男':'女'}}
        </template>
      </el-table-column>
      <el-table-column prop="phone"
                       label="手机号码">
        <template slot-scope="scope">
          {{scope.row.phone}}
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="handleEdit(scope.$index, scope.row)">重置密码</el-button>
          <el-button size="mini"
                     @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </m-table>
    <el-dialog :title="dialog.title"
               :visible.sync="dialog.dialogFormVisible">
      <el-form :model="dialog.form"
               ref="userValidateForm">
        <el-form-item label="姓名"
                      prop="name"
                      :rules="[{ required: true, message: '姓名不能为空'}]">
          <el-input v-model="dialog.form.name"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别"
                      prop="sex"
                      :rules="[{ required: true, message: '性别不能为空'}]">
          <el-radio v-model="dialog.form.sex"
                    :label="1">男</el-radio>
          <el-radio v-model="dialog.form.sex"
                    :label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="手机号码"
                      prop="phone"
                      :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' },
                               { pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/, message: '请输入正确的手机号码,目前仅支持中国大陆', trigger: ['blur', 'change'] }]">
          <el-input v-model="dialog.form.phone" type="number"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      prop="email"
                      :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
                               { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }]">
          <el-input v-model="dialog.form.email"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible(false)">取 消</el-button>
        <el-button type="primary"
                   @click="sure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss">
  @import './index.scss';
</style>
<script type="text/babel">
  import vm from './vm';
  export default vm;
</script>