export const timeFunc = (time) => {
    const givenDate = new Date(time);

    // Текущая дата
    const currentDate = new Date();

    // Разница между заданной и текущей датой в миллисекундах
    const timeDifference = currentDate - givenDate;

    // Преобразование разницы в дни, часы, минуты и секунды
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    if (days === 0 && hours === 0) {
        return `${minutes}m`
    }
    if (!minutes && !hours && !days) {
        return `${seconds}s`
    }
    if (days === 0 && hours !== 0) {
        return `${hours}h`
    }
    if (days !== 0) {
        return `${days}d`
    }

}



export const debounce = (callback, delay) => {
    let timerId;
  
    return (...args) => {
      clearTimeout(timerId);
  
      timerId = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  };