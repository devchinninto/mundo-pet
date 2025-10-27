import dayjs from 'dayjs'

// Validação que compara o dia selecionado com o horário, para evitar agendamentos no dia atual em horários que já passaram.
export function validateTimeOptions(dateInput, timeSelect) {
  const selectedDate = dateInput.value 
  const now = dayjs()
  
  // Converte minhas options para array para usar forEach
  Array.from(timeSelect.options).forEach(option => {
    const optionTime = option.value 
    // Combino o dia selecionado com as options de horário, comparo com o dayjs e desativo os horários que já passaram.
    const combinedDateTime = `${selectedDate}T${optionTime}:00`
    const optionDateTime = dayjs(combinedDateTime)
    
    if (optionDateTime.isBefore(now)) {
      option.disabled = true
    } else {
      option.disabled = false // Reseta a option para se o usuário mudar o dia.
    }
  })
}