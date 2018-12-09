<template>
  <div>
    <div v-for='movie in movies' :key="movie['.key']">
      <div v-if="movie['.key'] == favoriteMovie" class="main">
          <h2><font face="arial black">CinemaWith</font></h2>
          <h2>オススメ</h2>
          <div>
            <img :src="movie.url" class="movie_img" alt="image">
          </div>
          <h3>
            {{movie.title}}
          </h3>
          <span>
            <el-button v-if="!checkIcon(movie['.key'])" icon="el-icon-star-off"  v-on:click="registMovie(movie['.key'])"></el-button>
            <el-button v-if="checkIcon(movie['.key'])" icon="el-icon-star-on"></el-button>
            <el-button type="primary" plain v-on:click="openModal(movie['.key'])">
              一緒に！
            </el-button>
          </span>
          <div>
            :{{movie.genre}}
          </div>
          <div>{{movie.description}}</div>
      </div>
    </div>
    <div v-for='movie in movies' :key="movie['.key']">
      <div v-if="movie['.key'] != favoriteMovie" class="sub">
        <el-col :span="span">
        <el-card shadow="hover">
          <div>
            <img :src="movie.url" class="imagesub" alt="image">
          </div>
          <h3>
            {{movie.title}}
          </h3>
          <div>
            :{{movie.genre}}
          </div>
          <div>
            <!-- <div v-readMore:40="movie.description"></div> -->
          </div>
          <div>
            <el-button v-if="!checkIcon(movie['.key'])" icon="el-icon-star-off"  v-on:click="registMovie(movie['.key'])"></el-button>
            <el-button v-if="checkIcon(movie['.key'])" icon="el-icon-star-on"></el-button>
            <el-button type="primary" plain v-on:click="openModal(movie['.key'])">
              一緒に！
            </el-button>
          </div>
        </el-card>
        </el-col>
      </div>
    </div>
    <hr>
    <h3>Cinema With!</h3>
    
    <FriendsSearch v-if="showModal" @close="showModal = false"/>
  </div>
</template>


<script>
import firebase from "../plugins/firebase";
import Profile from "../components/Profile.vue";
import Message from "../components/Message.vue";
import FriendsSearch from "../components/FriendsSearch.vue";
const db = firebase.database();
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  components: {
    Profile,
    Message,
    FriendsSearch
  },
  data: () => {
    return {
      self: null,
      users: [],
      notSelf: [],
      showModal: false
    };
  },

  async fetch({ store, redirect }) {
    const loginUser = await store.getters.getLoginUser;
    store.commit("setErrorMessage", null);
    store.commit("setInfoMessage", null);
    if (!loginUser) {
      return redirect("/login");
    }

    firebase.auth().onAuthStateChanged(function() {
      const userSelect = db.ref("/users/" + loginUser.uid);
      userSelect.once("value", function(snapshot) {
        if (!snapshot.val()) {
          return redirect("/firstPage");
        }
      });
    });
  },

  beforeCreate: function() {
    const self = firebase.auth().currentUser;
    this.self = self;
    this.$store.dispatch("initFavoriteMovie");
    this.$store.commit("setLoginUser", self);
    this.$store.dispatch("setUserInfo");
    this.movies = this.$store.dispatch("initMovies");
    this.$store.dispatch("setMyPic");
    this.$store.dispatch("initFriends", self);
  },
  created: function() {
    this.favoriteMovie = this.$store.state.favoriteMovie;

    this.$store.dispatch("setMessage");
    const message = this.$store.state.message;
    if (message) {
      this.$message({
        showClose: true,
        duration: 0,
        message: this.$store.state.message
      });
    }
  },

  methods: {
    openModal: function(key) {
      this.$store.commit("setMovieKey", key);
      this.showModal = true;
    },

    registMovie: function(key) {
      this.$store.dispatch("addUserToMovie", key);
    },

    checkIcon: function(key) {
      if (!this.$store.state.userInfo.movies) {
        return false;
      }
      return !!this.$store.state.userInfo.movies[key];
    }
  },

  computed: {
    movies: function() {
      return this.$store.getters.getMovies;
    },
    favoriteMovie: function() {
      return this.$store.state.favoriteMovie;
    },
    span: function() {
      var ua = navigator.userAgent;
      if (
        ua.indexOf("iPhone") > 0 ||
        ua.indexOf("iPod") > 0 ||
        (ua.indexOf("Android") > 0 && ua.indexOf("Mobile") > 0)
      ) {
        return 25;
      } else if (ua.indexOf("iPad") > 0 || ua.indexOf("Android") > 0) {
        return 12;
      } else {
        return 12;
      }
    }
  },
  layout: "sideMenu"
};
</script>

<style scoped>
@media screen and (min-width: 768px) {
}

.main {
  background-color: rgb(41, 40, 40);
  width: 100% !important;
}
.el-col {
  background-color: rgb(41, 40, 40) !important;
}
.heart {
  height: 15%;
  width: 15%;
}

.profile_img {
  height: 10%;
  width: 10%;
}

.movie_img {
  height: 60%;
  width: 100%;
}

.imagesub {
  height: 50%;
  width: 80%;
}

hr {
  margin-top: 10px;
}

.friendsBox {
  padding: 0.5em 1em;
  margin: 2em 0;
  color: #474747;
  background: whitesmoke; /*背景色*/
  border-left: double 7px #4ec4d3; /*左線*/
  border-right: double 7px #4ec4d3; /*右線*/
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