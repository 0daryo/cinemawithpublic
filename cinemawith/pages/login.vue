
 <template>
 <div>
   <div class="loginBackGround">
     <div class="header">
       <span>
         <el-button plain @click="doLogin"><img src="~assets/images/google.png"></el-button>
       </span>
          </div>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <div>
            <h3>映画が観たい！</h3>
            <br>
            <h3>でも一人で行くのも・・・</h3>
            <br>
            <h3>CinemaWithを使えば</h3>
            <br>
            <h3>すぐに一緒に行く人を探せます</h3>
            <br>
            <h3>最新の映画も</h3>
            <br>
            <h3>マニアックな映画も</h3>
            <br>
            <h3>このアプリで</h3>
            <br>
            <h3>もっと充実した映画ライフに！！</h3>
          </div>
          <br>        
          <br>        
          <br>
          <br>
          <p>
            ＊必ず利用規約をご確認ください
          </p>
          <el-button type="primary" plain v-on:click="showModal=true">
              利用規約
          </el-button>
          <ServiceContract v-if="showModal" @close="showModal = false"/>
           <HowToUse/>      
   <div>
   </div>
   </div>
 </div>
</template>

<script>
import firebase from "@/plugins/firebase";
import { mapActions } from "vuex";
import HowToUse from "../components/HowToUse.vue";
import ServiceContract from "../components/ServiceContract.vue";

export default {
  async mounted() {
    this.$nextTick(async () => {
      this.$nuxt.$loading.start();
      let user = await new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(user => resolve(user));
      });
      this.$store.dispatch("setLoginUser", user); // setUser is mapped action from vuex
      if (user) {
        this.$router.push("/");
      }
      setTimeout(() => this.$nuxt.$loading.finish(), 500);
    });
  },
  loading: {
    height: "5px"
  },
  components: {
    HowToUse,
    ServiceContract
  },
  data: () => {
    return {
      isNotLoggedIn: true,
      activeName: "first",
      showModal: false
    };
  },
  fetch() {
    // `fetch` メソッドはページの描画前にストアを満たすために使用されます
  },
  methods: {
    ...mapActions(["login"]),

    doLogin() {
      console.log("login");
      this.login()
        .then(() => {
          console.log("resloved");
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
img {
  height: 60%;
  width: 80%;
}
.header {
  margin-left: 0px;
  position: fixed; /* ヘッダーの固定 */
  top: 0px; /* 位置(上0px) */
  right: 0px; /* 位置(右0px) */
  width: 100%; /* 横幅100%　*/
  height: 50px;
  background-color: #fff !important;
}

body {
  background: url("~assets/images/MV5BMjMxOTM1OTI4MV5BMl5BanBnXkFtZTgwODE5OTYxMDI@ (1).png");
}
.floatLeft {
  float: left;
}

.googleButton {
  line-height: 30px;
}
</style>

