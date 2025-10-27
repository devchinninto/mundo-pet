import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

export function getCurrentDate(){
  return dayjs(new Date()).format('YYYY-MM-DD')
}