
const getNow = () => {
  return parseInt(Date.now() / 1000);
}
const yearFromate = (time) =>{
  time = time * 1000;
  const date = new Date(time);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}


module.exports= {
  getNow,
  yearFromate
}