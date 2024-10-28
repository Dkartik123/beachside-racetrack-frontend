<template>
  <div class="front-desk">
    <h1>Стойка регистрации</h1>
    <div v-if="!isAuthenticated">
      <input v-model="accessKey" placeholder="Введите ключ доступа" />
      <button @click="authenticate">Войти</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
    <div v-else>
      <h2>Список сессий</h2>
      <button @click="showModal = true">Добавить сессию</button>

      <!-- Модальное окно для создания новой сессии -->
      <ModalForRaceSession 
        v-if="showModal" 
        @close="showModal = false" 
        @save="handleSaveSession"
      />

      <!-- Кнопка для удаления выбранных сессий -->
      <SessionDelete :selectedSessions="selectedSessions" :accessKey="accessKey" @sessionsUpdated="fetchSessions" />

      <table v-if="sessions.length" class="sessions-table">
        <thead>
          <tr>
            <th>Выбрать</th>
            <th>ID</th>
            <th>Имя</th>
            <th>Дата</th>
            <th>Статус</th>
            <th>Флаг</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in sessions" :key="s.id">
            <td><input type="checkbox" :value="s.id" v-model="selectedSessions" /></td>
            <td>{{ s.id }}</td>
            <td>{{ s.sessionName }}</td>
            <td>{{ new Date(s.createdAt).toLocaleString() }}</td>
            <td>{{ s.status }}</td>
            <td>{{ s.currentFlag }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>Сессий пока нет.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import ModalForRaceSession from './ModalForRaceSession.vue';
import SessionDelete from './SessionDelete.vue';

export default {
  name: 'FrontDesk',
  components: {
    ModalForRaceSession,
    SessionDelete,
  },
  setup() {
    const selectedSessions = ref([]);
    const apiUrl = process.env.VUE_APP_API_URL || 'http://localhost:3000';
    const accessKey = ref('');
    const isAuthenticated = ref(false);
    const errorMessage = ref('');
    const sessions = ref([]);
    const showModal = ref(false);
    const newSession = ref({ sessionName: '', currentFlag: '' });

    // Аутентификация
    const authenticate = async () => {
      try {
        await axios.post(`${apiUrl}/auth/login`, { token: accessKey.value, type: 'receptionist' });
        isAuthenticated.value = true;
        errorMessage.value = '';
        fetchSessions();
      } catch (error) {
        errorMessage.value = error.response?.data?.message || 'Ошибка аутентификации';
      }
    };

    // Получение списка сессий
    const fetchSessions = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/race-sessions`, {
          headers: { Authorization: `Bearer ${accessKey.value}` },
        });
        sessions.value = data;
      } catch (error) {
        console.error('Ошибка при получении сессий:', error);
      }
    };

    // Сохранение новой сессии
    const handleSaveSession = async (sessionData) => {
      try {
        await axios.post(`${apiUrl}/race-sessions`, sessionData, {
          headers: { Authorization: `Bearer ${accessKey.value}` },
        });
        fetchSessions();
        showModal.value = false;
      } catch (error) {
        console.error('Ошибка при создании сессии:', error);
      }
    };

    onMounted(() => {
      if (isAuthenticated.value) fetchSessions();
    });

    return {
      accessKey,
      isAuthenticated,
      errorMessage,
      sessions,
      showModal,
      newSession,
      selectedSessions,
      authenticate,
      fetchSessions,
      handleSaveSession,
    };
  },
};
</script>

<style scoped>
.front-desk { font-family: Arial, sans-serif; padding: 20px; }
input { padding: 8px; margin-right: 10px; }
button { padding: 8px 12px; cursor: pointer; }
.error { color: red; margin-top: 10px; }
.sessions-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
.sessions-table th, .sessions-table td { border: 1px solid #ddd; padding: 8px; }
.sessions-table th { background-color: #f4f4f4; }
</style>
