<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">ページが見つかりません</h1>
    <h1 v-else>エラーが発生しました</h1>
    <h2>お問い合わせ<el-button type="primary" icon="el-icon-message"><a href="mailto:cinamewith123@gmail.com">mail</a></el-button></h2>
    <nuxt-link to="/login">ホーム</nuxt-link>
  </div>
</template>
<script>
export default {
  props: ["error"],
  layout: "sideMenu" // エラーページ用のカスタムレイアウトを指定できます
};
</script>