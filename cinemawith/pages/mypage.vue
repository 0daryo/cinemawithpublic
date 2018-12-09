<template>
<div id="mypage">
  <Message/>
  <span>こんにちは, {{ loginUser.displayName }}さん</span>
  <h3>プロフィール更新</h3>
      <EditPage/>
  <div id="file_upload">
    <div class="form-group uploadForm">
      <div>
      <label for="file_photo">
        ＋写真を選択
        <input type="file" id="file_photo" style="display:none;" class="form-control" @change="selectFile">
        </label>
        <p v-if='uploadFile'>{{uploadFile.name}}</p>
        </div>
        <el-button type="primary" plain v-on:click="upload">アップロード<i class="el-icon-upload el-icon-right"></i></el-button>
        <div id="errArea"> {{ infoMsg }}</div>
    </div>
    <div v-if="profileImageUrl">
      <img :src="profileImageUrl" class="img-fluid" alt="image" style="margin-bottom:50px"/>
    </div>

    <el-button type="text" @click="dialogVisible = true">アカウント利用停止</el-button>

    <el-dialog
      title="確認"
      :visible.sync="dialogVisible"
      width="50%">
      <div>アカウントを停止してもよろしいですか？</div>
      <div>次回ログイン時に有効化されます</div>
      <span slot="footer" class="dialog-footer">
        <span><el-button @click="dialogVisible = false">いいえ</el-button></span>
        <span><el-button type="primary" @click="deleteData">はい</el-button></span>
      </span>
    </el-dialog>

</div>
</div>
</template>

<script scoped>
import firebase from "@/plugins/firebase";
import EditPage from "../components/EditPage.vue";
import Message from "../components/Message.vue";

const db = firebase.database();
export default {
  layout: "sideMenu",

  components: {
    EditPage,
    Message
  },

  async fetch({ store, redirect }) {
    const loginUser = await store.getters.getLoginUser;
    store.commit("setErrorMessage", null);
    store.commit("setInfoMessage", null);
    if (!loginUser) {
      return redirect("/login");
    }
  },

  data: function() {
    return {
      loginUser: null,
      uploadFile: null,
      infoMsg: null,
      dialogVisible: false
    };
  },

  methods: {
    selectFile: function(e) {
      e.preventDefault();
      let files = e.target.files;
      this.uploadFile = files[0];
    },
    upload: function() {
      if (!this.uploadFile) {
        this.infoMsg = "選択してください";
        return;
      }

      const filename = splitExt(this.uploadFile.name);
      if (
        filename[1] != "jpg" &&
        filename[1] != "jpeg" &&
        filename[1] != "png"
      ) {
        this.infoMsg = "画像ファイルを選択してください";
        return;
      }

      var storageRef = firebase
        .storage()
        .ref("/profile_images/" + this.loginUser.uid);
      storageRef.put(this.uploadFile).then(function(snapshot) {});

      const userUrlRef = db.ref("/profile_urls/" + this.loginUser.uid);
      storageRef
        .getDownloadURL()
        .then(function(url) {
          if (!url) {
            console.log("not registered");
            return;
          }
          const data = {
            profileImageUrl: url
          };
          userUrlRef.set(data);
        })
        .catch(function(error) {
          console.error(error);
        });
      this.$store.commit("setInfoMessage", "success");
    },
    deleteData: function(store) {
      this.$store.dispatch("deleteInfo");
      this.dialogVisible = false;
      this.$store.commit("setInfoMessage", "success");
      this.$store.dispatch("logout");
      this.$router.push("/login");
    }
  },

  created: async function() {
    this.loginUser = this.$store.state.loginUser;
    await this.$store.dispatch("setMyPic");
  },

  computed: {
    profileImageUrl: function() {
      console.log(this.$store.state.myPic);
      if (!this.$store.state.myPic) {
        return null;
      }
      return this.$store.state.myPic.profileImageUrl;
    }
  }
};

function splitExt(filename) {
  return filename.split(/\.(?=[^.]+$)/);
}
</script>

<style scoped>
.floatLeft {
  float: left;
}

label {
  cursor: pointer;
}

.img-fluid {
  width: 70%;
}
</style>
