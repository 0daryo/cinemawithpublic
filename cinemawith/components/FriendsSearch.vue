<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <Message/>
          <div v-for='user in users' :key = user.uid>
            <div v-if="user.uid!=$store.state.loginUser.uid && !user.isDeleted" class="friendsBox">
              <el-col :span="24" class="column">
              <el-card shadow="always" class="cardBody">
              <h3>{{user.nickName}}</h3>
                  <div v-if="user.age">
                    <h3>{{user.age}}歳</h3>
                  </div>
                  <div v-if="user.genre">
                    <h3>好きなジャンル:{{user.genre}}</h3>
                  </div>
                  <div v-if="user.favorite">
                    <h3>お気に入り:{{user.favorite}}</h3>
                  </div>
                  <hr>
                  <div v-if="user.pr">
                    <h3>{{user.pr}}</h3>
                  </div>
                  <span v-if="user.url">
                    <img :src="user.url" alt="image" style="margin-bottom:50px" class="floatLeft"/>
                  </span>
                  <span>
                    <i class="el-icon-circle-plus" v-on:click="follow(user)">友達追加</i>
                  </span>
              </el-card>
            </el-col>
            </div>
          </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import firebase from "../plugins/firebase";
import Message from "../components/Message.vue";
const db = firebase.database();
export default {
  name: "FriendsSearch",
  data: () => {
    return {
      users: []
    };
  },
  components: {
    Message
  },

  async fetch({ store, redirect }) {
    const key = this.$store.state.movieKey;
    store.dispatch("searchFriends", key);
  },

  created: function() {
    const key = this.$store.state.movieKey;
    this.$store.dispatch("searchFriends", key);
    this.$store.dispatch("setSelf");
    const friends = this.$store.state.users;
    const userArray = [];
    Object.keys(friends).forEach(function(value) {
      userArray.push(friends[value]);
    });
    this.users = shuffle(userArray);
  },
  methods: {
    follow: function(user) {
      this.$store.dispatch("follow", user);
    }
  }
};

function shuffle(array) {
  var n = array.length,
    t,
    i;

  while (n) {
    i = Math.floor(Math.random() * n--);
    t = array[n];
    array[n] = array[i];
    array[i] = t;
  }

  return array;
}
</script>

<style scoped>
@media only screen and (max-device-width: 600px) {
}

.floatLeft {
  float: left;
}

.friendsBox {
  font-size: 5px;
}

img {
  height: 20%;
  width: 20%;
}

.userName {
  padding: 0.5em; /*文字周りの余白*/
  color: #494949; /*文字色*/
  background: #fffaf4; /*背景色*/
  border-left: solid 5px #ffaf58; /*左線（実線 太さ 色）*/
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
  overflow: scroll;
  width: 70%;
  height: 90%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Arial, Helvetica, sans-serif;
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