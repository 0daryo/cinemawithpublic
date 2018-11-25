<template>
<div>
  <iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FCinemawith-2105623036419457%2F%3Fmodal%3Dadmin_todo_tour&width=450&layout=standard&action=like&size=large&show_faces=true&share=true&height=80&appId" width="450" height="80" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>
<div>
  <div>
    <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
  </div>
</div>
<span>
<el-button size="mini" type="primary" icon="el-icon-message"><a href="mailto:cinamewith123@gmail.com">mail</a></el-button>
<el-button type="primary" plain v-on:click="showModal=true">
    利用規約
</el-button>
</span>
<ServiceContract v-if="showModal" @close="showModal = false"/>
<HowToUse/>
</div>
</template>
<script>
import HowToUse from "../components/HowToUse.vue";
import ServiceContract from "../components/ServiceContract.vue";
export default {
  layout: "sideMenu",
  components: {
    HowToUse,
    ServiceContract
  },
  data: () => {
    return {
      showModal: false
    };
  }
};
</script>

<style scoped>
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