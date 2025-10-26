const newAppointmentBtn = document.getElementById('add-appointment')
const modal = document.getElementById('modal')
const closeModalBtn = document.getElementById('modal-close')

export function removeClassHidden (){
  modal.classList.remove('hidden')
}

export function addClassHidden(){
  modal.classList.add('hidden')
}

export function initModal() {
  newAppointmentBtn.addEventListener('click', removeClassHidden)
  closeModalBtn.addEventListener('click', addClassHidden)
}