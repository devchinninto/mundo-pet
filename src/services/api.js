import { apiConfig } from './api-config.js'


export async function getAppointmentsByDay(date) {

  try {
    // Vou buscar no endpoint a resposta, e o json-server filtra usando query params
    const response = await fetch(`${apiConfig.baseUrl}/appointments?date=${date}`)
    
    if(!response.ok) {
      console.log('Erro:', response.status)
      alert('Não foi possível buscar os agendamentos. Tente novamente.')
      return
    }
    
    // Converter em json
    const data = await response.json() 
    return data

  } catch (error) {
    console.log('ERROR:', error)
    alert('Não foi possível carregar os agendamentos do dia.')
  }
}

export async function newAppointment({ tutor, pet, phone, service, date, time }) {

try {
 // Fazer a requisição para enviar os dados de um novo agendamento. 
    const response = await fetch(`${apiConfig.baseUrl}/appointments`, {
    method: 'POST', // Fazer o envio dos dados com o método POST.
    headers: {
      'Content-Type': 'application/json' // Informo no header que o conteúdo é JSON.
    },
    body: JSON.stringify({ tutor, pet, phone, service, date, time }) // Faço a conversão e passo meu objeto.
  })
  
  // Tratamento de erro
  if (!response.ok) {
    console.log('Erro:', response.status)
    alert('Erro ao realizar agendamento.')
    return
  }

  // Ser der certo, mando um alerta com mensagem de sucesso, pego os dados e retorno. 
  alert('Agendamento realizado com sucesso!')
  const data = await response.json() 
  return data

  } catch (error) {
    console.log(error)
    throw new Error('Não foi possível realizar o agendamento. Tente novamente.')
  }

}