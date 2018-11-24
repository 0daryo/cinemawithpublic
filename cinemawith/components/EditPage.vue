<template>
<div id="mypage">
  <p v-if="errors.length" class="errors">
    <b>入力エラーがあります:</b>
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </p>
  <p>*は必須項目です</p>
  <div>＊表示名</div>
  <el-input v-model="nickName" ></el-input>
  <div>＊年齢</div>
  <el-select v-model="age">
    <el-option value="18">18</el-option>
<el-option value="19">19</el-option>
<el-option value="20">20</el-option>
<el-option value="21">21</el-option>
<el-option value="22">22</el-option>
<el-option value="23">23</el-option>
<el-option value="24">24</el-option>
<el-option value="25">25</el-option>
<el-option value="26">26</el-option>
<el-option value="27">27</el-option>
<el-option value="28">28</el-option>
<el-option value="29">29</el-option>
<el-option value="30">30</el-option>
<el-option value="31">31</el-option>
<el-option value="32">32</el-option>
<el-option value="33">33</el-option>
<el-option value="34">34</el-option>
<el-option value="35">35</el-option>
<el-option value="36">36</el-option>
<el-option value="37">37</el-option>
<el-option value="38">38</el-option>
<el-option value="39">39</el-option>
<el-option value="40">40</el-option>
<el-option value="41">41</el-option>
<el-option value="42">42</el-option>
<el-option value="43">43</el-option>
<el-option value="44">44</el-option>
<el-option value="45">45</el-option>
<el-option value="46">46</el-option>
<el-option value="47">47</el-option>
<el-option value="48">48</el-option>
<el-option value="49">49</el-option>
<el-option value="50">50</el-option>
<el-option value="51">51</el-option>
<el-option value="52">52</el-option>
<el-option value="53">53</el-option>
<el-option value="54">54</el-option>
<el-option value="55">55</el-option>
<el-option value="56">56</el-option>
<el-option value="57">57</el-option>
<el-option value="58">58</el-option>
<el-option value="59">59</el-option>
<el-option value="60">60</el-option>
<el-option value="61">61</el-option>
<el-option value="62">62</el-option>
<el-option value="63">63</el-option>
<el-option value="64">64</el-option>
<el-option value="65">65</el-option>
<el-option value="66">66</el-option>
<el-option value="67">67</el-option>
<el-option value="68">68</el-option>
<el-option value="69">69</el-option>
<el-option value="70">70</el-option>
<el-option value="71">71</el-option>
<el-option value="72">72</el-option>
<el-option value="73">73</el-option>
<el-option value="74">74</el-option>
<el-option value="75">75</el-option>
<el-option value="76">76</el-option>
<el-option value="77">77</el-option>
<el-option value="78">78</el-option>
<el-option value="79">79</el-option>
<el-option value="80">80</el-option>
  </el-select>
  <div>＊性別</div>
  <el-radio id="male" label="male" v-model="sex">男性</el-radio>
  <el-radio id="female" label="female" v-model="sex">女性</el-radio>
  <el-radio id="other" label="other" v-model="sex">その他</el-radio>
  <div>＊ジャンル</div>
  <el-select v-model="genre">
  <el-option value="アクション">アクション</el-option>
  <el-option value="ホラー">ホラー</el-option>
  <el-option value="サスペンス/ミステリー">サスペンス/ミステリー</el-option>
  <el-option value="SF">SF</el-option>
  <el-option value="ヒューマンドラマ">ヒューマンドラマ</el-option>
  <el-option value="コメディ">コメディ</el-option>
  <el-option value="ロマンス">ロマンス</el-option>
  <el-option value="アニメ">アニメ</el-option>
</el-select>
  <div>＊お気に入りの映画</div>
  <el-input v-model="favorite"></el-input>
  <div>＊PR</div>
  <el-input type="textarea" autosize v-model="pr"></el-input>
  <el-button type="primary" plain @click="regist">登録</el-button>

</div>
</template>
<script>
import firebase from "@/plugins/firebase";
export default {
  data: function() {
    return {
      nickName: null,
      age: null,
      sex: null,
      genre: null,
      favorite: null,
      pr: null,
      errors: []
    };
  },
  mounted() {
    const user = this.$store.state.userInfo;
    if (!user) {
      return;
    }
    this.nickName = user.nickName;
    this.age = user.age;
    this.sex = user.sex;
    this.genre = user.genre;
    this.favorite = user.favorite;
    this.pr = user.pr;
  },
  methods: {
    regist: async function() {
      this.errors = [];
      if (!this.nickName) {
        this.errors.push("表示名は必須項目です");
      }

      if (this.nickName) {
        if (this.nickName.length >= 16) {
          this.errors.push("表示名は１６文字以内で入力してください");
        }
      }

      if (!this.age) {
        this.errors.push("年齢は必須項目です");
      }

      if (!this.sex) {
        this.errors.push("性別は必須項目です");
      }

      if (!this.genre) {
        this.errors.push("ジャンルは必須項目です");
      }

      if (!this.favorite) {
        this.errors.push("お気に入りの映画は必須項目です");
      }

      if (this.favorite) {
        if (this.favorite.length >= 30) {
          this.errors.push("お気に入りの映画は３０文字以内で入力してください");
        }
      }

      if (!this.pr) {
        this.errors.push("PRは必須項目です");
      }

      if (this.pr) {
        if (this.pr.length >= 100) {
          this.errors.push("PRは１００文字以内で入力してください");
        }
      }

      if (this.errors.length != 0) {
        return;
      }

      const user = await firebase.auth().currentUser;
      const data = {
        uid: user.uid,
        nickName: this.nickName,
        age: this.age,
        sex: this.sex,
        genre: this.genre,
        favorite: this.favorite,
        pr: this.pr,
        isDeleted: false
      };
      try {
        this.$store.dispatch("createUser", data);
        this.$store.commit("setInfoMessage", "success");
      } catch (e) {
        this.$store.commit("setErrorMessage", "エラーが発生しました");
      }
    }
  }
};
</script>

<style scoped>
.errors {
  color: red;
}
</style>