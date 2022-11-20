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
const API_URL = 'http://127.0.0.1:8000/moji'

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
      axios.get(
        `${API_URL}/community/${this.$route.params.id}/reviews`, {
        headers: { Authorization: `Token ${this.$store.getters.getToken}` }
        })
        .then(res => {
          this.reviews = res.data
          console.log(this.reviews);
        })
        .catch(err => {
          if (err.response.status === 401) {
            this.$router.push({ name: 'LoginView' })
          } else if (err.response.status === 404) {
            this.$router.push({ name: 'NotFound404' })
          } else {
            console.log(err)
          }
        })
    },
    // createReview() {
    //   this.$router.push(`community/${this.$router.params.id}/reviews/create/`)
    // },
      createReview() {
      axios.get(`${API_URL}/community/${this.$route.params.id}/reviews/create/`, {
        headers: { Authorization: `Token ${this.$store.getters.getToken}` }
      })
        .then(res => {
          this.createForm = res.data
          this.showCreateForm = true
        })
        .catch(err => {
          if (err.response.status === 401) {
            this.$router.push({ name: 'LoginView' })
          } else if (err.response.status === 404) {
            this.$router.push({ name: 'NotFound404' })
          } else {
            console.log(err)
          }
        })
    }
  },
  computed: {
    movie() {
      const movie = this.$store.state.movies.find(movie => movie.id === Number(this.$route.params.id))
      return movie
    },
    // movieId() {
    //   return this.$route.params.id
    // }
  },
  created() {
    this.getReviews()
  }
}
</script>

<style>

</style>