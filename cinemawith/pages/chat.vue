<template>
        <div id="container"  @click.stop>
          <div class="header">
            <span>
            <router-link to="/friends">
            <a>
              <img class="doBack" src="~assets/images/doBack.png">
            </a>
            </router-link>
          </span>
            <span class="userName">{{user.nickName}}</span>
          </div>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <div v-for="message in messages" :key="message.id">
            <div v-if="message.text">
              <div :class="[message.sender!=user.uid ? 'notSelf': 'self']">
              <p>
                {{message.text}}
              </p>
            </div>
            </div>
          </div>
          <div>
            <input class="speakChat" v-focus @keyup.enter="speak" type="text" v-model="message" placeholder="入力してください ...">
            <span>
              <el-button type="primary" plain @click="speak">Send</el-button>
            </span>
          </div>
        </div>
</template>
<script scoped>
export default {
  data: () => {
    return {
      message: null,
      movie: null,
      user: null
    };
  },
  created: function() {
    this.$store.dispatch("setRead");
    this.movie = this.$store.state.movie;
    this.user = this.$store.state.friend;
  },

  updated: function() {
    var a = document.documentElement;
    var y = a.scrollHeight - a.clientHeight;
    window.scroll(0, y);
  },

  computed: {
    messages: function() {
      return this.$store.getters.getMessages;
    }
  },
  methods: {
    speak: function() {
      const messageInfo = {
        user: this.user,
        text: this.message
      };
      console.log(messageInfo);
      this.$store.dispatch("speak", messageInfo);
      this.message = null;
    }
  },

  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.speakChat {
  border: 0;
  padding: 5px;
  font-size: 1.3em;
  font-family: Arial, sans-serif;
  color: rgb(0, 0, 0);
  border: solid 1px #ccc;
  margin: 10px 10px 20px;
  width: 250px;
}

.doBack {
  height: 100%;
}

.el-icon-arrow-left {
  height: 30% !important;
  width: 30% !important;
}

.headerTitle {
  background-color: #fff !important;
}

.header {
  z-index: 9998;
  margin-left: 0px;
  position: fixed; /* ヘッダーの固定 */
  top: 0px; /* 位置(上0px) */
  left: 0px; /* 位置(右0px) */
  width: 100%; /* 横幅100%　*/
  height: 50px;
  color: #fff;
  background-color: rgb(82, 78, 78) !important;
}

.clear {
  clear: both;
}

.floatLeft {
  float: left;
}

img {
  height: 15%;
  width: 15%;
}

.notSelf {
  text-align: right;
  margin: 10px 0;
}

.notSelf p {
  display: inline-block;
  position: relative;
  margin: 0 10px 0 0;
  padding: 8px;
  max-width: 250px;
  border-radius: 12px;
  background: #30e852;
  font-size: 15px;
}

.notSelf p:after {
  content: "";
  position: absolute;
  top: 3px;
  right: -19px;
  border: 8px solid transparent;
  border-left: 18px solid #30e852;
  -ms-transform: rotate(-35deg);
  -webkit-transform: rotate(-35deg);
  transform: rotate(-35deg);
}

.self {
  display: inline-block;
  position: relative;
  margin: 0 0 0 50px;
  padding: 10px;
  max-width: 250px;
  border-radius: 12px;
  background: #edf1ee;
}

.self:after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 3px;
  left: -19px;
  border: 8px solid transparent;
  border-right: 18px solid #edf1ee;
  -ms-transform: rotate(35deg);
  -webkit-transform: rotate(35deg);
  transform: rotate(35deg);
}

.self p {
  margin: 0;
  padding: 0;
}

.userName {
  padding-left: 20%;
  font-size: 40px;
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