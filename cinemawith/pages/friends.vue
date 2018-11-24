<template>
  <div>
    <div v-for='user in users' :key = user.uid>
      <el-col :span="24" class="column">
        <el-card shadow="always" class="cardBody" v-if="!user.isDeleted">
      <span class="userName" @click="seeInfo(user)" style="cursor: pointer">
        {{user.nickName}}
      </span>
      <span class="messageRight">
      <span v-if="user.unRead">
        <el-badge value="new" class="item">
        <el-button type="primary" plain @click="openModal(user)">メッセージ</el-button>
        </el-badge>
      </span>
      <span v-else>
        <el-button type="primary" plain @click="openModal(user)">メッセージ</el-button>
      </span>
      </span>
      <span style="clear:both;"></span>
    </el-card>
    </el-col>
    </div>
    <Profile v-if="showInfo" :showFollow="false" @close="showInfo = false"/>
  </div>
</template>
<script>
import firebase from "../plugins/firebase";
import Profile from "../components/Profile.vue";
export default {
  layout: "sideMenu",

  async fetch({ store, redirect }) {
    const loginUser = await store.getters.getLoginUser;
    store.commit("setErrorMessage", null);
    store.commit("setInfoMessage", null);
    if (!loginUser) {
      return redirect("/login");
    }
    store.dispatch("initFriends", loginUser);
  },

  data: () => {
    return {
      showModal: false,
      showInfo: false
    };
  },
  components: {
    Profile
  },

  computed: {
    users: function() {
      const users = this.$store.state.friends;
      console.log(users);
      if (!users) {
        return [];
      }
      return users.sort(compareTime);
    }
  },

  methods: {
    openModal: function(user) {
      this.$store.commit("setFriend", user);
      this.$store.dispatch("startChat", user);
      this.$router.push("chat");
    },

    seeInfo: function(user) {
      this.$store.dispatch("seeUserInfo", user);
      this.showInfo = true;
    },

    block: function(user) {
      this.$store.dispatch("blockUser", user);
    }
  }
};

function compareTime(a, b) {
  return b.currentTime - a.currentTime;
}
</script>

<style scoped>
.cardBody {
  overflow: hidden;
}

.messageRight {
  float: right;
}

.column {
  margin: 5px;
}

.userName {
  padding: 0.5em; /*文字周りの余白*/
  color: #494949; /*文字色*/
}

.personal-avatar {
  vertical-align: middle;
  width: 10em;
  height: 10em;
  border-style: ridge;
}
html,
body,
.trigger {
  margin: 0;
  width: 100%;
  height: 100%;
  position: relative;
}

.trigger > p {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font: bold 40px/1 sans-serif;
  opacity: 0.1;
  width: 600px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: rgba(0, 0, 0, 0.7);
  transform: translate3d(0, 0, 0);
}
/* 往路のアニメーション全体に対して設定をするためのクラス */
.modal-enter-active {
  transition: opacity 0.2s;
}
/* 往路の開始状態を設定するためのクラス */
.modal-enter {
  opacity: 0;
}
/* 往路の終了状態を設定するためのクラス */
.modal-enter-to {
  opacity: 1;
}
/* 復路のアニメーション全体に対して設定をするためのクラス */
.modal-leave-active {
  transition: opacity 0.6s;
}
/* 復路の開始状態を設定するためのクラス */
.modal-leave {
  opacity: 1;
}
/* 復路の終了状態を設定するためのクラス */
.modal-leave-to {
  opacity: 0;
}

.modal__content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.modal__content > p {
  margin: 0;
  width: 600px;
  vertical-align: middle;
  text-align: center;
  font: bold 12px/100px sans-serif;
  letter-spacing: 0.1em;
  color: #aaa;
  background: #fff;
}
</style>