<template>
  <div>
    <!-- 面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card class="box-card">

      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUsers">
            <el-button slot="append" icon="el-icon-search" @click="getUsers()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUserDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表-->
      <el-table :data="users" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态" prop="mg_state">
          <!-- 自定义插槽 -->
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="changeState(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
            <!-- 删除 -->
            <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
            <!-- 分配角色权限 -->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" size="mini" icon="el-icon-setting"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>

    <!-- 添加用户的Dialog -->
    <el-dialog title="添加用户" :visible.sync="addUserDialogVisible">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getUsers,
    changeUserState,
    searchUser
  } from '../../api/Api.js'

  export default {

    data() {
      return {
        users: [],
        total: 0,
        //获取用户列表参数
        queryInfo: {
          query: '',
          pagenum: 1,
          pagesize: 2
        },
        //控制添加用户对话框的显示和隐藏
        addUserDialogVisible: false,
        formLabelWidth: '70px',
        //添加用户的表单数据
        addForm: {
          name: '',
          password: '',
          email: '',
          phone: ''
        },
        //添加用户表单验证规则
        addFormRules: {
          name: [{
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 10,
              message: '长度在 3 到 10 个字符',
              trigger: 'blur'
            }
          ],
          password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 5,
              max: 10,
              message: '长度在 5 到 10 个字符',
              trigger: 'blur'
            }
          ],
          email: [{
              required: true,
              message: '请输入邮箱',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 10,
              message: '长度在 3 到 10 个字符',
              trigger: 'blur'
            }
          ],
          phone: [{
              required: true,
              message: '请输入手机号',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 10,
              message: '长度在 3 到 10 个字符',
              trigger: 'blur'
            }
          ],
        }
      }
    },
    methods: {
      async getUsers() {
        const data = await getUsers(this.queryInfo)
        this.users = data.data.users
        this.total = data.data.total
      },
      //监听pageSzie改变事件
      handleSizeChange(newSize) {
        this.queryInfo.pagesize = newSize
        this.getUsers()
      },
      //监听页码值改变事件
      handleCurrentChange(newPage) {
        this.queryInfo.pagenum = newPage
        this.getUsers()
      },
      //更改用户状态
      async changeState(userInfo) {
        console.log(userInfo);
        const data = await changeUserState(userInfo.id, userInfo.mg_state)
        if (data.meta.status === 200) {
          this.$message.success(data.meta.msg)
        } else {
          userInfo.mg_state = !userInfo.mg_state
        }
      },
      //根据ID查询用户
      searchUser() {
        searchUser(this.queryInfo.query)
      }

    },

    created() {
      this.getUsers()
    }
  }
</script>

<style>
</style>
