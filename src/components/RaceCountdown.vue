<template>
  <div class="race-countdown">
    <h1>Обратный отсчет до гонки</h1>
    <div v-if="currentRace">
      <h2>{{ currentRace.name }}</h2>
      <div class="countdown">
        <span v-if="isRaceActive">Оставшееся время: {{ remainingTime }}</span>
        <span v-else>До начала: {{ startTime }}</span>
      </div>
    </div>
    <div v-else>
      <p>Ожидание информации о гонке...</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import io from 'socket.io-client';

export default {
  name: 'RaceCountdown',
  setup() {
    const currentRace = ref(null);
    const remainingTime = ref('');
    const startTime = ref('');
    const isRaceActive = ref(false);
    const socket = ref(null);

    const connectSocket = () => {
      socket.value = io('http://localhost:3000');

      socket.value.on('countdownUpdate', (data) => {
        currentRace.value = data.race;
        remainingTime.value = data.remainingTime;
        startTime.value = data.startTime;
        isRaceActive.value = data.isActive;
      });
    };

    onMounted(() => {
      connectSocket();
    });

    return {
      currentRace,
      remainingTime,
      startTime,
      isRaceActive
    };
  }
}
</script>

