<template>
  <div>
    <h1 v-for="post in posts" :key="post._id">{{ post.title }}</h1>
    <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae, ipsum!</h1>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Posts",
  props: {},
  data: () => ({
    posts: [],
  }),
  methods: {
    async getAllPosts() {
      const res = await axios.get("http://localhost:5000/api/posts");
      console.log(res.data);
      this.posts = res.data;
    },
  },
  mounted() {
    this.getAllPosts();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li {
  color: red;
}
</style>
