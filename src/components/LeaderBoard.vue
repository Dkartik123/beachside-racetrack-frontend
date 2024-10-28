<template>
  <div class="leader-board">
    <h1>Таблица лидеров</h1>
    <div v-if="currentRace">
      <h2>{{ currentRace.name }}</h2>
      <p>Оставшееся время: {{ remainingTime }}</p>
      <p>Статус гонки: {{ raceStatus }}</p>
      <table>
        <thead>
          <tr>
            <th>Позиция</th>
            <th>Номер машины</th>
            <th>Гонщик</th>
            <th>Лучший круг</th>
            <th>Текущий круг</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(driver, index) in sortedDrivers" :key="driver.carNumber">
            <td>{{ index + 1 }}</td>
            <td>{{ driver.carNumber }}</td>
            <td>{{ driver.name }}</td>
            <td>{{ driver.bestLap }}</td>
            <td>{{ driver.currentLap }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>Ожидание начала гонки...</p>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import io from 'socket.io-client';

export default {
  name: 'LeaderBoard',
  setup() {
    const currentRace = ref(null);
    const drivers = ref([]);
    const remainingTime = ref('');
    const raceStatus = ref('');
    const socket = ref(null);

    const sortedDrivers = computed(() => {
      return [...drivers.value].sort((a, b) => a.bestLap - b.bestLap);
    });

    const connectSocket = () => {
      socket.value = io('http://localhost:3000');

      socket.value.on('leaderboardUpdate', (data) => {
        currentRace.value = data.race;
        drivers.value = data.drivers;
        remainingTime.value = data.remainingTime;
        raceStatus.value = data.status;
      });
    };

    onMounted(() => {
      connectSocket();
    });

    return {
      currentRace,
      sortedDrivers,
      remainingTime,
      raceStatus
    };
  }
}
</script>

