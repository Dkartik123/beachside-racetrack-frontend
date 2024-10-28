<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <slot name="header"><h3>Добавить новую сессию</h3></slot>
      </div>
      <div class="modal-body">
        <slot name="body">
          <form @submit.prevent="submitSession" class="modal-form">
            <div class="form-group">
              <label for="sessionName">Имя сессии:</label>
              <input type="text" v-model="sessionName" id="sessionName" required />
            </div>
            <div class="form-group">
              <label for="sessionFlag">Текущий флаг:</label>
              <select v-model="currentFlag" id="sessionFlag" required>
                <option value="Safe">Safe</option>
                <option value="Hazard">Hazard</option>
                <option value="Danger">Danger</option>
                <option value="Finish">Finish</option>
              </select>
            </div>
            <div class="button-group">
              <button type="submit" class="btn-save">Сохранить</button>
              <button type="button" class="btn-close" @click="$emit('close')">Отмена</button>
            </div>
          </form>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalForRaceSession',
  data() {
    return {
      sessionName: '',
      currentFlag: 'Safe', // Устанавливаем начальное значение для флага
    };
  },
  methods: {
    submitSession() {
      this.$emit('save', {
        sessionName: this.sessionName,
        currentFlag: this.currentFlag,
      });
      this.sessionName = ''; // Сброс поля
      this.currentFlag = 'Safe'; // Сброс значения флага к начальному
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-header h3 {
  margin: 0;
  font-size: 1.5em;
  text-align: center;
}

.modal-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.btn-save,
.btn-close {
  padding: 10px 15px;
  font-size: 1em;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  width: 48%;
}

.btn-save {
  background-color: #4CAF50;
  color: #fff;
}

.btn-close {
  background-color: #f44336;
  color: #fff;
}
</style>
