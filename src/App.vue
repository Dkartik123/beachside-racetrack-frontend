<template>
  <div id="app">
    <header>
      <h1>Beachside Racetrack</h1>
      <nav>
        <router-link to="/front-desk">Стойка регистрации</router-link> |
        <router-link to="/race-control">Управление гонкой</router-link> |
        <router-link to="/lap-line-tracker">Отслеживание кругов</router-link> |
        <router-link to="/leader-board">Таблица лидеров</router-link> |
        <router-link to="/next-race">Следующая гонка</router-link>
      </nav>
    </header>

    <router-view />

    <footer>
      <p>&copy; 2023 Beachside Racetrack. Все права защищены.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

header {
  padding: 10px 0;
  background-color: #333;
  color: #fff;
}

header h1 {
  font-size: 1.5em;
  margin: 0;
}

nav {
  padding: 10px;
}

nav a {
  font-weight: bold;
  color: #42b983;
  text-decoration: none;
  margin: 0 10px;
}

nav a.router-link-exact-active {
  color: #fff;
}

footer {
  margin-top: 20px;
  padding: 10px;
  background-color: #f8f8f8;
  color: #333;
}
</style>
