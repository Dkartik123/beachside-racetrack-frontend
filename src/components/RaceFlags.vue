<template>
  <div class="race-flags" :class="currentFlag">
    <div class="flag-display">
      <div v-if="currentFlag === 'green'" class="flag green"></div>
      <div v-else-if="currentFlag === 'yellow'" class="flag yellow"></div>
      <div v-else-if="currentFlag === 'red'" class="flag red"></div>
      <div v-else-if="currentFlag === 'checkered'" class="flag checkered"></div>
      <div v-else class="no-flag">Ожидание сигнала</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import io from 'socket.io-client';

export default {
  name: 'RaceFlags',
  setup() {
    const currentFlag = ref('');
    const socket = ref(null);

    const connectSocket = () => {
      socket.value = io('http://localhost:3000');

      socket.value.on('flagUpdate', (flag) => {
        currentFlag.value = flag;
      });
    };

    onMounted(() => {
      connectSocket();
    });

    return {
      currentFlag
    };
  }
}
</script>

<style scoped>
.race-flags {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.flag {
  width: 80%;
  height: 80%;
}

.green { background-color: green; }
.yellow { background-color: yellow; }
.red { background-color: red; }
.checkered {
  background-image: linear-gradient(45deg, #fff 25%, #000 25%, #000 50%, #fff 50%, #fff 75%, #000 75%, #000 100%);
  background-size: 56.57px 56.57px;
}

.no-flag {
  font-size: 2em;
  color: #333;
}
</style>
