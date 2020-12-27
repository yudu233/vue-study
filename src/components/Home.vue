<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header>
      <el-image :src="logo"></el-image>
      <span>鱼而已的后台</span>
      <el-button type="info" @click='logout'>退出</el-button>
    </el-header>
    <!-- 内容主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#ffd04b" router>
          <el-submenu :index="'/' +item.path" v-for="item in menuData" :key="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="subItem.path + ''" v-for="subItem in item.children" :key="subItem.id">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <!-- 右侧内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import {
    getMenuData
  } from '../api/Api.js'

  export default {
    data() {
      return {
        logo: require('@/assets/logo.png'),
        menuData: []
      }
    },
    methods: {
      logout() {
        window.sessionStorage.clear()
        this.$router.push('/login')
      }
    },
    async created() {
      const data = await getMenuData()
      this.menuData = data.data
    }
  }
</script>

<style scoped="scoped">
  .el-container {
    height: 100%;
  }

  .el-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #373D41;
  }

  .el-aside {
    background-color: #333744;
  }

  .el-main {
    background-color: #EAEDF1;
  }

  .el-image {
    background-color: #FFFFFF;
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }

  .el-header span {
    margin-left: 20px;
    color: #FFFFFF;
  }

  .el-header .el-button {
    margin-left: auto;
  }
</style>
