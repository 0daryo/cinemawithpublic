<template>
<div>
  <el-container class="body">
    <el-header class="headerDefault">
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <img class="humberger" src="~assets/images/humberger.png">
      </span>
      <span class="headerTitle">CinemaWith</span>
      <el-dropdown-menu size="medium" slot="dropdown">
        <el-dropdown-item>
          <i class="el-icon-menu">
            <router-link to="/">
            <a>映画
            </a>
            </router-link>
          </i>
        </el-dropdown-item>
        <el-dropdown-item>
          <i class="el-icon-menu">
            <router-link to="/friends">
            <a>友達
            </a>
            </router-link>
          </i>
        </el-dropdown-item>
        <el-dropdown-item>
          <i class="el-icon-menu">
            <router-link to="/mypage">
            <a>設定
            </a>
            </router-link>
          </i>
        </el-dropdown-item>
        <el-dropdown-item>
          <i class="el-icon-menu">
            <router-link to="/appInfo">
            <a>Info
            </a>
            </router-link>
            </i>
        </el-dropdown-item>
        <el-dropdown-item>
          <i class="el-icon-menu" @click="doLogout">
            <a href="#!">Logout
            </a>
            </i>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </el-header>
    <el-main>
      <br>
      <br>
      <br>
  <nuxt></nuxt>
  </el-main>
  </el-container>
  </div>
</template>
<style>
.el-dropdown-menu {
  left: 10px !important;
  width: auto;
  height: auto;
}

a {
  font-size: 25px;
}

.headerTitle {
  padding-left: 30px;
  font-size: 30px;
  color: #ffffff;
}

.humberger {
  margin-top: 20px;
  height: 30px;
  width: 30px;
}

.headerDefault {
  z-index: 999;
  margin-left: 0px;
  position: fixed; /* ヘッダーの固定 */
  top: 0px; /* 位置(上0px) */
  left: 0px; /* 位置(右0px) */
  width: 100%; /* 横幅100%　*/
  height: 50px;
  background-color: rgb(34, 33, 34);
}

.el-dropdown-link {
  left: 0px;
  font-size: 20px;
  cursor: pointer;
  color: #ffffff;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.el-icon-menu {
  font-size: 30%;
}

.body {
  background-color: rgb(34, 33, 34);
  font-family: "Courier New", Courier, monospace;
  color: rgb(207, 205, 205);
}

@media only screen and (max-device-width: 480px) {
}
</style>
<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["logout"]),

    doLogout() {
      this.logout()
        .then(() => {
          this.$router.push("/login");
        })
        .catch(err => console.log(err));
    }
  }
};
</script>