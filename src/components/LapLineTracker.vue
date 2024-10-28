<template>
  <div class="lap-line-tracker">
    <h1>Отслеживание кругов</h1>
    <div v-if="!isAuthenticated">
      <input v-model="accessKey" placeholder="Введите ключ доступа" />
      <button @click="authenticate">Войти</button>
    </div>
    <div v-else>
      <h2>Текущая гонка: {{ currentRace.name }}</h2>
      <div class="car-buttons">
        <button 
          v-for="car in cars" 
          :key="car.number"
          @click="recordLap(car.number)"
          :disabled="!raceActive"
        >
          Машина {{ car.number }}
        </button>
      </div>
      <p v-if="!raceActive">Гонка завершена</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import io from 'socket.io-client';

export default {
  name: 'LapLineTracker',
  setup() {
    const accessKey = ref('');
    const isAuthenticated = ref(false);
    const currentRace = ref({});
    const cars = ref([]);
    const raceActive = ref(false);
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
        cars.value = data.cars;
        raceActive.value = data.active;
      });
    };

    const recordLap = (carNumber) => {
      socket.value.emit('recordLap', carNumber);
    };

    onMounted(() => {
      // Возможно, здесь будет проверка сохраненного ключа доступа
    });

    return {
      accessKey,
      isAuthenticated,
      currentRace,
      cars,
      raceActive,
      authenticate,
      recordLap
    };
  }
}
</script>

