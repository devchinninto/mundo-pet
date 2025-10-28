export function getScheduleBlock(time) {
  const hour = parseInt(time.split(':')[0])

  if (hour < 13) {
    return 'morning'
  } else if (hour < 19) {
    return 'afternoon'
  } else {
    return 'night'
  }
}

