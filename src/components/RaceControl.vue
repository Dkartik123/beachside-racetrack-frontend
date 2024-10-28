<template>
  <div class="race-control">
    <h1>Управление гонкой</h1>
    <div v-if="!isAuthenticated">
      <input v-model="accessKey" placeholder="Введите ключ доступа" />
      <button @click="authenticate">Войти</button>
    </div>
    <div v-else>
      <h2>Текущая гонка: {{ currentRace.name }}</h2>
      <div class="race-controls">
        <button @click="startRace" :disabled="raceStarted">Начать гонку</button>
        <button @click="setRaceMode('safe')" :disabled="!raceStarted">Безопасно</button>
        <button @click="setRaceMode('hazard')" :disabled="!raceStarted">Опасность</button>
        <button @click="setRaceMode('danger')" :disabled="!raceStarted">Остановка</button>
        <button @click="finishRace" :disabled="!raceStarted">Завершить гонку</button>
      </div>
      <div class="race-info">
        <p>Оставшееся время: {{ remainingTime }}</p>
        <p>Текущий режим: {{ currentMode }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import io from 'socket.io-client';

export default {
  name: 'RaceControl',
  setup() {
    const accessKey = ref('');
    const isAuthenticated = ref(false);
    const currentRace = ref({});
    const raceStarted = ref(false);
    const remainingTime = ref('');
    const currentMode = ref('');
    const socket = ref(null);

    const authenticate = async () => {
      // Логика аутентификации
      isAuthenticated.value = true;
      connectSocket();
    };

    const connectSocket = () => {
      socket.value = io('http://localhost:3000', {
        query: { accessKey: accessKey.value }
      });

      socket.value.on('raceUpdate', (data) => {
        currentRace.value = data.race;
        raceStarted.value = data.started;
        remainingTime.value = data.remainingTime;
        currentMode.value = data.mode;
      });
    };

    const startRace = () => {
      socket.value.emit('startRace');
    };

    const setRaceMode = (mode) => {
      socket.value.emit('setRaceMode', mode);
    };

    const finishRace = () => {
      socket.value.emit('finishRace');
    };

    onMounted(() => {
      // Возможно, здесь будет проверка сохраненного ключа доступа
    });

    return {
      accessKey,
      isAuthenticated,
      currentRace,
      raceStarted,
      remainingTime,
      currentMode,
      authenticate,
      startRace,
      setRaceMode,
      finishRace
    };
  }
}
</script>

