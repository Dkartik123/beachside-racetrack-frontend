<template>
    <button 
      @click="deleteSelectedSessions" 
      :disabled="selectedSessions.length === 0"
    >
      Удалить выбранные
    </button>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'SessionDelete',
    props: {
      selectedSessions: {
        type: Array,
        required: true
      },
      accessKey: {
        type: String,
        required: true
      }
    },
    emits: ['sessionsUpdated'], // Эмитим событие для обновления сессий в родительском компоненте
    methods: {
      async deleteSelectedSessions() {
        const apiUrl = process.env.VUE_APP_API_URL || 'http://localhost:3000';
  
        try {
          // Удаляем каждую выбранную сессию
          await Promise.all(this.selectedSessions.map(async (id) => {
            await axios.delete(`${apiUrl}/race-sessions/${id}`, {
              headers: { Authorization: `Bearer ${this.accessKey}` },
            });
          }));
          
          // Очищаем выбранные сессии и обновляем родительский компонент
          this.$emit('sessionsUpdated');
        } catch (error) {
          console.error('Ошибка при удалении сессий:', error);
        }
      }
    }
  };
  </script>
  