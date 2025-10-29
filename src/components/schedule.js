import { getScheduleBlock } from '../libs/time.js'
import { deleteAppointment } from '../services/api.js'

// Função para renderizar cada novo agendamento na página principal, recebendo o 'dailySchedules', array que vem da minha API com os dados dos agendamentos filtrados por dia.
export async function renderSchedule(dailySchedules) {
  const morning = document.querySelector('.morning-list')
  const afternoon = document.querySelector('.afternoon-list')
  const night = document.querySelector('.night-list')

  morning.innerHTML = ''
  afternoon.innerHTML = ''
  night.innerHTML = ''

  try {
    // Para cada agendamento:
    dailySchedules.forEach(appointment => {
     // appointment.X acessa cada propriedade  
      const cardHTML = `
      <div class="appointment" data-id=${appointment.id}>
                  <div class="content">
                    <span class="time">${appointment.time}</span>
                    <div class="info">
                      <span class="pet">${appointment.pet}</span>
                      <span class="client">/ ${appointment.tutor}</span>
                    </div>
                    <p class="service">${appointment.service}</p>
                  </div>
                  <button class="remove-btn" type="button">
                    Remover agendamento
                  </button>
                </div>
      `
    
      // Verificação para identificar em qual bloco de horário renderizar o agendamento
      const block = getScheduleBlock(appointment.time)
      if (block === 'morning') {
        morning.insertAdjacentHTML('beforeend', cardHTML)
      } else if (block === 'afternoon') {
        afternoon.insertAdjacentHTML('beforeend', cardHTML)
      } else {
        night.insertAdjacentHTML('beforeend', cardHTML)
      }
    })
    
  } catch (error) {
    console.log('Erro:', error)
    alert('Não foi possível atualizar a página com os agendamentos do dia, tente novamente.')
  }

  morning.addEventListener('click', handleRemoveClick)
  afternoon.addEventListener('click', handleRemoveClick)
  night.addEventListener('click', handleRemoveClick)

}

async function handleRemoveClick(e) {
  // Se tiver remove
    if (e.target.classList.contains('remove-btn')) {
    // Pegar o elemento pai -> appointment (o item inteiro)  
    const card = e.target.closest('.appointment')
    // Pegar apenas a id desse card.
    const { id } = card.dataset

      if(id) {
        const confirmCancel = confirm('Tem certeza que deseja cancelar este agendamento?')

        if (confirmCancel) {
          console.log('Agendamento cancelado.')
          await deleteAppointment({ id })
          card.remove()
        }
      }
    }
  }