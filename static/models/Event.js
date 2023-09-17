function Event(time,place)
{
const getTime = () => time;
const getPlace = () => place;
return {getPlace,getTime}
}

export default Event