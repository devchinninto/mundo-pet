'use strict'

// CSS
import './styles/index.css'

// JavaScript
import { initModal } from './components/modal-form.js'
import { initDatePickers } from './utils/date-utils.js'


document.addEventListener('DOMContentLoaded', () => {

  initDatePickers()
  initModal()
})