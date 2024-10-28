<template>
  <div class="home">
    <h1>Добро пожаловать на Beachside Racetrack</h1>
    <p>Выберите нужный раздел в меню навигации выше.</p>
    <div class="features">
      <div class="feature">
        <h2>Стойка регистрации</h2>
        <p>Зарегистрируйтесь на предстоящие гонки</p>
        <router-link to="/front-desk" class="btn">Перейти</router-link>
      </div>
      <div class="feature">
        <h2>Управление гонкой</h2>
        <p>Контроль и управление текущей гонкой</p>
        <router-link to="/race-control" class="btn">Перейти</router-link>
      </div>
      <div class="feature">
        <h2>Таблица лидеров</h2>
        <p>Следите за результатами в реальном времени</p>
        <router-link to="/leader-board" class="btn">Перейти</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.features {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}

.feature {
  flex-basis: 30%;
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h2 {
  color: #42b983;
  margin-bottom: 10px;
}

.btn {
  display: inline-block;
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #3aa876;
}
</style>

