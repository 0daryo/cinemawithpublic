<template>
  <div>
    <h2>使い方</h2>
          <el-tabs v-model="activeName">
          <el-tab-pane label="1.登録" name="first">
            googleアカウントでログイン
            <br>
            自分のプロフィールを入力
            <br>
            写真をアップロードするとマッチング率UP
          </el-tab-pane>
          <el-tab-pane label="2.観たい映画" name="second">
            一覧から観たいと思った映画のアイコンをクリック
            <br>
            他の人があなたを見つけられます
          </el-tab-pane>
          <el-tab-pane label="3.友達を探す" name="third">
            観たい映画の「一緒に」ボタンをクリック
            <br>
            表示された人は、その映画をお気に入りにしています
            <br>
            プロフィールを確認して友達になりたいと思ったら友達申請！
          </el-tab-pane>
          <el-tab-pane label="4.チャット" name="fourth">
            友達ページを開いてチャット
            <br>
            予定を決めて映画館へ！
          </el-tab-pane>
  </el-tabs> 
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      activeName: "first"
    };
  }
};
</script>