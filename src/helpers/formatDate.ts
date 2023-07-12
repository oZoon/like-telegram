export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp)
  const hour = `0${date.getHours()}`.slice(-2)
  const minutes = `0${date.getMinutes()}`.slice(-2)
  return `${hour}:${minutes}`
}
