if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position) => console.log(position));
}else console.log('for fuks sake');