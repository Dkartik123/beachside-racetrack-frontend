<template>
  <div class="next-race">
    <h1>Следующая гонка</h1>
    <div v-if="nextRace">
      <h2>{{ nextRace.name }}</h2>
      <p>Начало через: {{ startTime }}</p>
      <h3>Участники:</h3>
      <ul>
        <li v-for="driver in nextRace.drivers" :key="driver.id">
          {{ driver.name }} - Машина №{{ driver.carNumber }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Информация о следующей гонке отсутствует</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import io from 'socket.io-client';

export default {
  name: 'NextRace',
  setup() {
    const nextRace = ref(null);
    const startTime = ref('');
    const socket = ref(null);

    const connectSocket = () => {
      socket.value = io('http://localhost:3000');

      socket.value.on('nextRaceUpdate', (data) => {
        nextRace.value = data.race;
        startTime.value = data.startTime;
      });
    };

    onMounted(() => {
      connectSocket();
    });

    return {
      nextRace,
      startTime
    };
  }
}
</script>

