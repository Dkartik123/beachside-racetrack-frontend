<!-- src/components/BaseModal.vue -->
<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal">
      <span class="close-btn" @click="close">&times;</span>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseModal',
  emits: ['close'],
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
  font-size: 24px;
}
</style>
