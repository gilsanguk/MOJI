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
    <div class="btn-cover" >
      <button :disabled="pageNum === 0" @click="prevPage" id="page-btn"> &lt; </button>
      <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
      <button :disabled="pageNum >= pageCount - 1" @click="nextPage" id="page-btn"> &gt;</button>
    </div>
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
      pageNum: 0,
      pagesize: 10,
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
    },
    nextPage() {
      this.pageNum += 1;
    },
    prevPage() {
      this.pageNum -= 1;
    }
  },
  computed: {
    movie() {
      const movie = this.$store.state.movies.find(movie => movie.id === Number(this.$route.params.id))
      return movie
    },
    pageCount() {
      let listLeng = this.reviews.length,
      listSize = this.pageSize,
      page = Math.floor(listLeng/listSize);
      if (listLeng % listSize > 0) page += 1;
      return page;
    },
    paginatedData() {
      if (this.reviews.length >= 1){
        const start = this.pageNum * this.pageSize,
        end = start + this.pageSize;
        return this.reviews.slice(start, end);
      } else {
        return 0
      }
    }
  },
  created() {
    this.getReviews()
  }
}
</script>

<style>
.btn-cover {
  margin-top: 1.5rem;
  text-align: center;
}

button,
.btn-cover #page-btn {
  padding: 0.3% 2%;
  letter-spacing: 1px;
  background-color:transparent;
  color: #ffffff;
  border: 0;
  outline: 0;
}

button:hover,
.btn-cover #page-btn:hover {
  cursor: pointer;
}
</style>