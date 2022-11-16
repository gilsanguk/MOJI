<template>
  <div>
    {{ createForm }}
    <button @click="closeCreateForm">X</button>
  </div>
</template>

<script>
export default {
  name: 'ReviewCreateForm',
  props : {
    createForm: Object,
    show: Boolean,
  },
  methods: {
    closeCreateForm() {
      this.$emit('close')
    }
  }
}
</script>

<style>

</style>