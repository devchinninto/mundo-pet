import { validateTimeOptions } from '../utils/validators.js'
import { newAppointment } from '../services/api.js'

const newAppointmentBtn = document.getElementById('add-appointment')
const modal = document.getElementById('modal')
const closeModalBtn = document.getElementById('modal-close')
const form = document.getElementById('form')

// Função pura para remover a classe 'hidden'.
export function removeClassHidden (){
  modal.classList.remove('hidden')

  const dateInput = document.getElementById('appointment-date')
  const timeSelect = document.getElementById('appointment-time')
  
  validateTimeOptions(dateInput, timeSelect)
}

// Função pura para adicionar a classe 'hidden'.
export function addClassHidden(){
  modal.classList.add('hidden')
}

export function initModal() {
  newAppointmentBtn.addEventListener('click', removeClassHidden)
  closeModalBtn.addEventListener('click', addClassHidden)
  form.addEventListener('submit', handleFormSubmit)

}

// Função pura para lidar com o evento de submit do form.
async function handleFormSubmit(e) {
  e.preventDefault()

  const formData = getFormData()

  // Em 'newApponintment(formData)' eu posso passar só essa função porque nela eu retorno tudo desestruturado, então seria redundante digitar todos os parâmetros novamente, o JS já entende o que eu estou passando e desestrutura para mim.
  const result = await newAppointment(formData)
  console.log('Agendamento criado:', result)
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