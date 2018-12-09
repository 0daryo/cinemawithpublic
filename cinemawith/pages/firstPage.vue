<template>
<div>
  <Message/>
<h3>プロフィール作成</h3>
  <EditPage/>
</div>
</template>

<script>
import EditPage from "../components/EditPage.vue";
import Message from "../components/Message.vue";
export default {
  layout: "sideMenu",
  components: {
    EditPage,
    Message
  }
};
</script>