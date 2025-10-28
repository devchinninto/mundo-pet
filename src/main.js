'use strict'

// CSS
import './styles/index.css'

// JavaScript
import { getCurrentDate } from './libs/dayjs.js'
import { initModal } from './components/modal-form.js'
import { initDatePickers } from './utils/date-utils.js'
import { getAppointmentsByDay } from './services/api.js'
import { renderSchedule } from './components/schedule.js'
const dateFilterInput = document.getElementById('date-filter')

document.addEventListener('DOMContentLoaded', async () => {
  initDatePickers()
  initModal()

  try {
    const today = getCurrentDate()
    const appointments = await getAppointmentsByDay({ date: today })
    renderSchedule(appointments)
  } catch (error) {
    console.log('Erro:', error)
    alert('Falha ao carregar agendamentos.')
  }
})

dateFilterInput.addEventListener('change', async (e) => {
  const selectedDate = e.target.value
  const appointments = await getAppointmentsByDay({ date: selectedDate })
  renderSchedule(appointments)
})