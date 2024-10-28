import FrontDesk from '@/components/FrontDesk.vue'
import HomePage from '@/components/Home.vue'
import LapLineTracker from '@/components/LapLineTracker.vue'
import LeaderBoard from '@/components/LeaderBoard.vue'
import NextRace from '@/components/NextRace.vue'
import RaceControl from '@/components/RaceControl.vue'
import RaceCountdown from '@/components/RaceCountdown.vue'
import RaceFlags from '@/components/RaceFlags.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/front-desk',
    name: 'FrontDesk',
    component: FrontDesk,
  },
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/race-control',
    name: 'RaceControl',
    component: RaceControl,
    meta: { requiresAuth: true }, // Защищенный маршрут
  },
  {
    path: '/lap-line-tracker',
    name: 'LapLineTracker',
    component: LapLineTracker,
    meta: { requiresAuth: true }, // Защищенный маршрут
  },
  {
    path: '/leader-board',
    name: 'LeaderBoard',
    component: LeaderBoard,
    meta: { requiresAuth: true }, // Защищенный маршрут
  },
  {
    path: '/next-race',
    name: 'NextRace',
    component: NextRace,
    meta: { requiresAuth: true }, // Защищенный маршрут
  },
  {
    path: '/race-countdown',
    name: 'RaceCountdown',
    component: RaceCountdown,
    meta: { requiresAuth: true }, // Защищенный маршрут
  },
  {
    path: '/race-flags',
    name: 'RaceFlags',
    component: RaceFlags,
    meta: { requiresAuth: true }, // Защищенный маршрут
  },
]

console.log(process.env.BASE_URL)
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

// Добавляем глобальный охранитель маршрутов
router.beforeEach((to, from, next) => {
  // Проверяем, требует ли маршрут аутентификации
  if (to.meta.requiresAuth) {
    const userToken = localStorage.getItem('userToken')
    const userType = localStorage.getItem('userType')
    
    // Если токен и тип пользователя отсутствуют, перенаправляем на /front-desk
    if (!userToken || !userType) {
      next({ name: 'FrontDesk' })
    } else {
      // Если токен и тип пользователя присутствуют, разрешаем переход
      next()
    }
  } else {
    // Если аутентификация не требуется, разрешаем переход
    next()
  }
})

export default router
