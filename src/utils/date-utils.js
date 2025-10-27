import { getCurrentDate } from '../libs/dayjs.js'

// Função para setar a data atual como default, e a data mínima no modal, para bloquear agendamentos em dias passados. Além disso, abrir o calendário do input de data nos dois inputs.
export function initDatePickers() {
  const currentDate = getCurrentDate()
  
  const filterDate = document.getElementById('date-filter')
  const filterDateWrapper = document.querySelector('.date-picker')
  const appointmentDate = document.getElementById('appointment-date')
  const appointmentDateWrapper = document.querySelector('.form-field.date')
  const timeSelectWrapper = document.getElementById('select-wrapper')
  
  filterDate.value = currentDate
  appointmentDate.value = currentDate
  appointmentDate.min = currentDate
  
  filterDateWrapper.addEventListener('click', openDatePicker)
  appointmentDateWrapper.addEventListener('click', openDatePicker)
  timeSelectWrapper.addEventListener('click', openSelect)
}

// Função pura para abrir o date picker com tratamento de erros.
function openDatePicker(event) {
  const input = event.currentTarget.querySelector('input[type="date"]')
  
  try {
    input.showPicker()

  } catch (error) {
    input.focus()
  }
}

// Função para abrir o select de horários.
function openSelect(event) {
  const input = event.currentTarget.querySelector('select')
  
  try {
    input.showPicker()

  } catch (error) {
    input.focus()
  }
}