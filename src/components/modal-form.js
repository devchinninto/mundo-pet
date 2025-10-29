import { validateTimeOptions } from '../utils/validators.js'
import { getAppointmentsByDay, newAppointment } from '../services/api.js'
import { renderSchedule } from './schedule.js'
import { getCurrentDate } from '../libs/dayjs.js'

const newAppointmentBtn = document.getElementById('add-appointment')
const modal = document.getElementById('modal')
const closeModalBtn = document.getElementById('modal-close')
const form = document.getElementById('form')

// Helper para validar e atualizar os time slots disponíveis de acordo com a data.
async function loadAndValidateTimeSlots() {
  const dateInput = document.getElementById('appointment-date')
  const timeSelect = document.getElementById('appointment-time')
  const selectedDate = dateInput.value
  
  const appointments = await getAppointmentsByDay({ date: selectedDate })
  validateTimeOptions(dateInput, timeSelect, appointments)
}

// Função pura para remover a classe 'hidden'.
export async function removeClassHidden (){
  modal.classList.remove('hidden')

  await loadAndValidateTimeSlots()
}

// Função pura para adicionar a classe 'hidden'.
export function addClassHidden(){
  modal.classList.add('hidden')
}

export function initModal() {
  newAppointmentBtn.addEventListener('click', removeClassHidden)
  closeModalBtn.addEventListener('click', addClassHidden)
  form.addEventListener('submit', handleFormSubmit)

  const dateInput = document.getElementById('appointment-date')
  dateInput.addEventListener('input', async () => {
    // Só chama o helper!
    await loadAndValidateTimeSlots()
  })
}

// Função pura para lidar com o evento de submit do form.
async function handleFormSubmit(e) {
  e.preventDefault()

  const formData = getFormData()

  // Em 'newApponintment(formData)' eu posso passar só essa função porque nela eu retorno tudo desestruturado, então seria redundante digitar todos os parâmetros novamente, o JS já entende o que eu estou passando e desestrutura para mim.
  try {
    const result = await newAppointment(formData)

    
    if (result) {
      addClassHidden()
      form.reset()

      const dateInput = document.getElementById('appointment-date')
      dateInput.value = getCurrentDate()
    }

    // Atualização da renderização lista de agendamentos 
    const dateFilter = document.getElementById('date-filter')
    const selectedDate = dateFilter.value
    const appointments = await getAppointmentsByDay({ date: selectedDate })
    renderSchedule(appointments)

  } catch (error) {
    alert('Não foi possível realizar o agendamento. Tente novamente.')
    console.log('Erro:', error)
  }
}

function getFormData() {
    const tutorInput = document.getElementById('tutor-name')
    const petInput = document.getElementById('pet-name')
    const phoneInput = document.getElementById('phone')
    const serviceInput = document.getElementById('service-description')
    const dateInput = document.getElementById('appointment-date')
    const timeInput = document.getElementById('appointment-time')

    // Retorno um objeto com os valores do input. 
    return {
      tutor: tutorInput.value.trim(),
      pet: petInput.value.trim(),
      phone: phoneInput.value,
      service: serviceInput.value.trim(),
      date: dateInput.value,
      time: timeInput.value
    }  
}