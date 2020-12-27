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
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表-->
      <el-table :data="users" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态" prop="ms_state">
          <!-- 自定义插槽 -->
          <template slot-scope="scope">
            <el-switch v-model="scope.row.ms_state"></el-switch>
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
  </div>
</template>

<script>
  import {
    getUsers
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
      }

    },

    created() {
      this.getUsers()
    }
  }
</script>

<style>
</style>
