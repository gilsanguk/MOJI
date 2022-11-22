<template>
  <div>
    {{ review.title }}
    {{ review.content }}
    {{ review.rank }}
    {{ review.created_at }}
    {{ review.updated_at }}
    {{ review.movie }}
    {{ review.user }}
  </div>
</template>

<script>
export default {
  name: 'ReviewItem',
  props: {
    review: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style>

</style>