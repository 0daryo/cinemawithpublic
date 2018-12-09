<template>
<div>
  <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <div v-if="profile">
            <Message/>
          <h4 class="userName" >{{profile.nickName}}</h4>
          <div v-if="imageUrl">
            <img :src="imageUrl" alt="image" style="margin-bottom:50px"/>
          </div>
          <div v-if="profile.age">
            <h3>{{profile.age}}歳</h3>
          </div>
          <div v-if="profile.genre">
            <h3>好きなジャンル:{{profile.genre}}</h3>
          </div>
          <div v-if="profile.favorite">
          <h3>お気に入り:{{profile.favorite}}</h3>
          </div>
          <hr>
          <div v-if="profile.pr">
          <h3>{{profile.pr}}</h3>
          </div>
            <el-button type="primary" plain  class="waves-effect waves-light btn blue" @click="block(profile)">友達解除</el-button>
         </div>
         </div>
         </div>
         </div>
        </div>
</template>
<script scoped>
import Message from "../components/Message.vue";
export default {
  name: "Profile",
  props: ["showFollow"],
  data: () => {
    return {};
  },

  components: {
    Message
  },

  async fetch({ store }) {
    store.commit("setErrorMessage", null);
    store.commit("setInfoMessage", null);
  },

  computed: {
    profile: function() {
      return this.$store.getters.getProfile;
    },
    imageUrl: function() {
      return this.$store.state.friendUrl;
    }
  },
  methods: {
    follow: function(profile) {
      this.$store.dispatch("follow", profile);
    },
    block: function(user) {
      this.$store.dispatch("blockUser", user);
    }
  }
};
</script>

<style scoped>
img {
  height: 70%;
  width: 70%;
}

.userName {
  padding: 0.5em; /*文字周りの余白*/
  color: #494949; /*文字色*/
  background: #dbddf1; /*背景色*/
  border-left: solid 5px #8ac1f5; /*左線（実線 太さ 色）*/
  padding: 20px;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 85%;
  height: 85%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: "Courier New", Courier, monospace;
  color: rgb(2, 2, 2);
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>