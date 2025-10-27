const newAppointmentBtn = document.getElementById('add-appointment')
const modal = document.getElementById('modal')
const closeModalBtn = document.getElementById('modal-close')
const form = document.getElementById('form')

export function removeClassHidden (){
  modal.classList.remove('hidden')
}

export function addClassHidden(){
  modal.classList.add('hidden')
}

export function initModal() {
  newAppointmentBtn.addEventListener('click', removeClassHidden)
  closeModalBtn.addEventListener('click', addClassHidden)
  form.addEventListener('submit', handleFormSubmit)
}

// Função pura para lidar com o evento de submit do form.
function handleFormSubmit(e) {
  e.preventDefault()

  const formData = getFormData()
  console.log(formData)
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