import { getScheduleBlock } from '../libs/time.js'

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
      <div class="appointment">
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
}