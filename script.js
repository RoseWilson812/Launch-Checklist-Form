 //This block of code shows how to format the HTML once you fetch some planetary JSON!
 let images = [];
 function fetchImages() {
   fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) { 
       response.json().then(function(json) {
        
        images = json.slice(0);
        
        console.log("images loaded")    
        init();  
       });

   });  
 }
 


// Write your JavaScript code here!
window.addEventListener("load", function() {
   fetchImages()
});

function init() {
        
    let missionData = document.getElementById("missionTarget");
    let randomIndex = 0;
    randomIndex = Math.floor(Math.random()* images.length);
        
    missionData.innerHTML +=
    `
     <h2>Mission Destination</h2>
       <ol>
         <li>Name: ${images[randomIndex].name}</li>
         <li>Diameter: ${images[randomIndex].diameter}</li>
         <li>Star: ${images[randomIndex].star}</li>
         <li>Distance from Earth: ${images[randomIndex].distance}</li>
         <li>Number of Moons: ${images[randomIndex].moons}</li>
      </ol>
      <img src="${images[randomIndex].image}" height=250>`
     

    let pilot = document.querySelector("input[name=pilotName]");
    let copilot = document.querySelector("input[name=copilotName]");
    let fuelLvl = document.querySelector("input[name=fuelLevel]");
    let cargo = document.querySelector("input[name=cargoMass]");
    let button = document.getElementById("launchForm");
    
    let faultyList = document.getElementById("faultyItems");
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");
    
    

   button.addEventListener("submit", function(event) {
          
    // edit input
    let errorSW = 'n';
    let pilotEdit = pilot.value.trim();
    let copilotEdit = copilot.value.trim();
    let fuelLvlEdit = fuelLvl.value.trim();
    let cargoEdit = cargo.value.trim();

     if (pilot.value === null  || 
         pilotEdit === "" ||
         copilot.value === null  ||
         copilotEdit === ""  ||
         fuelLvl.value === null  ||
         fuelLvlEdit === "" ||
         cargo.value === null  ||
         cargoEdit === "" ) {
           errorSW = 'y'; 
           alert("All fields are required.");
           event.preventDefault();
     } else { 
         pilotEdit = isNaN(pilot.value);
         if (pilotEdit == false ) {
            errorSW = 'y'; 
            alert("Pilot Name cannot be a number.");
            event.preventDefault();
         } //else {
            copilotEdit = isNaN(copilot.value); 
            if (copilotEdit == false ) {
               errorSW = 'y'; 
               alert("CoPilot Name cannot be a number.");
               event.preventDefault();
            }
         //}   
     }

      fuelLvlEdit = isNaN(fuelLvl.value);
      cargoEdit = isNaN(cargo.value);
      
      if ( fuelLvlEdit == true ) {
           errorSW = 'y';
           alert("Fuel Level must be numeric.");
           event.preventDefault();
      }

      if (cargoEdit == true) {
          errorSW = 'y'; 
          alert("Cargo Mass must be numeric.");
           event.preventDefault();
      }          
      
      if (errorSW === 'n') {
         updateRequirements();
      } else {
         launchStatus.innerHTML = "Awaiting Information Before Launch";
         launchStatus.style.color= "black"; 
         faultyList.style.visibility = "hidden";
      }
      event.preventDefault();   
    
           
  
     function updateRequirements() {
      
      faultyList.style.visibility = "visible";
      pilotStatus.innerHTML = `<li id="pilotStatus" value="1">Pilot Name ${pilot.value}</li>`;
      copilotStatus.innerHTML = `<li id="copilotStatus" value="2">Co-pilot Name ${copilot.value}</li>`;
      if (fuelLvl.value > 9999) {
         fuelStatus.innerHTML = `<li id="fuelStatus" value="3">Fuel Level high enough for launch</li>`;
         launchStatus.innerHTML = "Shuttle ready for launch";
         launchStatus.style.color= "green";
         if (cargo.value < 10001) { 
            cargoStatus.innerHTML = `<li id="cargoStatus" value="4">Cargo mass low enough for launch</li>`;
         } else {
            cargoStatus.innerHTML = `<li id="cargoStatus" value="4">There is too much mass for the shuttle to take off</li>`;
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.style.color= "red";
         }
      } else {
         fuelStatus.innerHTML = `<li id="fuelStatus" value="3">Fuel Level too low to launch</li>`;
         launchStatus.innerHTML = "Shuttle not ready for launch";
         launchStatus.style.color= "red"; 
         if (cargo.value < 10001) {
            cargoStatus.innerHTML = `<li id="cargoStatus" value="4">Cargo mass low enough for launch</li>`;
         } else {
            cargoStatus.innerHTML = `<li id="cargoStatus" value="4">There is too much mass for the shuttle to take off</li>`;
         }
      }

      //event.preventDefault() 
     } // end upadate requirements   
      
  });  // end button event             
   
  
}  // end init
