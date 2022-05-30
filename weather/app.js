window.addEventListener("load", () => {
let long;
let lat;
let temparatureDegree=document.querySelector(".temparature-degree");
let temparatureDescription=document.querySelector(".temparature-description");
let locationTimezone=document.querySelector(".location-timezone");
let degreeSection=document.querySelector(".degree-section");
let degreeSectionSpan=document.querySelector(".degree-section span");
let icontag=document.getElementById("icon");

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position=>{
        console.log(position)
        lat=position.coords.latitude;
        long=position.coords.longitude;

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
                'X-RapidAPI-Key': '1bca4f2568mshe9dfdbfb1034acbp131ecejsn5168d4e25422'
            }
        };
        
        fetch(`https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=${long}&lat=${lat}`, options)
            .then(response => response.json())
            .then(response =>{
                console.log(response.data)
                 temparatureDegree.textContent=response.data[0].temp;
                 temparatureDescription.textContent= response.data[0].weather.description;
                 locationTimezone.textContent=response.data[0].timezone;

                 let celcius=(response.data[0].temp-32)*(5/9)
                 icontag.textContent='';

                 let img = document.createElement('img');
                 img.src = `icons/${response.data[0].weather.icon}.png`;
                 document.getElementById('icon').appendChild(img);

                 console.log(img)

                 degreeSection.addEventListener("click", () => {
                     if(degreeSectionSpan.textContent==="F") {
                        degreeSectionSpan.textContent="C";
                        temparatureDegree.textContent=Math.floor(celcius);
                     }
                     else {
                        degreeSectionSpan.textContent="F";
                        temparatureDegree.textContent=response.data[0].temp;
                     }
                 })

            })
            .catch(err => console.error(err));
    })
}
});