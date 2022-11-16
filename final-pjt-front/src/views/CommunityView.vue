<template>
  <div>
    <h1>Review</h1>
    <div
      v-for="review in reviews"
      :key="review.id"
    >
      <ReviewItem/>
    </div>
    <button @click="createReview">리뷰 작성</button>
    <ReviewCreateForm
      v-if="showCreateForm"
      :createForm="this.createForm"
      @close="closeCreateForm"
    /> 
  </div>
</template>

<script>
import axios from 'axios'
import ReviewItem from '@/components/ReviewItem'
import ReviewCreateForm from '@/components/ReviewCreateForm'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'CommunityView',
  components: {
    ReviewItem,
    ReviewCreateForm,
  },
  data() {
    return {
      reviews: null,
      showCreateForm: false,
      createForm: null,
    }
  },
  methods: {
    closeCreateForm() {
      this.showCreateForm = false
    },
    getReviews() {
      console.log(this.$route.params.id);
      axios.get(`${API_URL}/community/${this.$route.params.id}/reviews/`)
        .then(res => {
          this.reviews = res.data
          console.log(this.reviews);
        })
        .catch(err => {
          console.log(err);
        })
    },
    createReview() {
      axios.get(`${API_URL}/community/${this.$route.params.id}/reviews/create/`)
        .then(res => {
          this.createForm = res.data
          this.showCreateForm = true
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  computed: {
    movie() {
      const movie = this.$store.state.movies.find(movie => movie.id === Number(this.$route.params.id))
      return movie
    },
    movieId() {
      return this.$route.params.id
    }
  },
  created() {
    this.getReviews()
  }
}
</script>

<style>

</style>