const registerform = document.querySelector(".container");
const loginform = document.querySelector(".login-form");

const showregister = () => {
    registerform.classList.add("register-form");
    console.log("clicked hai jii");
}
const showlogin = () => {
    loginform.classList.add("display");
    console.log("clicked hai jii");
}
const hideform = ()=>{
    registerform.classList.remove("display");
    loginform.classList.remove("display");
}
function filter(id) {
    const urlParams = new URLSearchParams(window.location.search);
    const locationValue = urlParams.get('location');
    const playersContainer = document.getElementById('containercard');
    const uid = id;
  
    fetch('/players?format=json')
    .then(response => response.json())
    .then(data => {
      // Check if data.players is an array
      if (Array.isArray(data.players)) {
        // Clear the existing content in the container
        playersContainer.innerHTML = '';
  
        data.players.forEach(player => {
          // Check if location and sports properties exist before accessing
          if (player.location && player.sports && Array.isArray(player.sports)) {
            // Check if the location matches and "cricket" is in the sports array
            if (
              (player.location.toLowerCase() === locationValue.toLowerCase() ||
              player.state.toLowerCase() === locationValue.toLowerCase()) &&
              player.sports.includes(uid)
            ) {
              const availability = player.socketid === null ? 'Offline' : 'Online';
              // Determine the visibility of the "Chat now" button based on player.chat
              const showChatButton = player.chat === null;
              // Append the player template to the container
              playersContainer.innerHTML += `
                <div class="card">
                  <p>${player.name}</p>
                  <p>Sport: ${player.sports.join(', ')}</p>
                  <p>Location: ${player.location}, ${player.state}, ${player.city}</p>
                  <p>Experience: ${player.skills}</p>
                  <p>Gender: ${player.gender}</p>
                  <p>Available: ${availability}</p>
                  ${showChatButton ? `<a href='/chat?id=${player.socketid}&email=${player.email}'>
                    <button id='chat'>Chat now</button>
                  </a>` : ''}
                </div>
              `;
            }
          }
        });
      } else {
        console.error('Invalid data format. Expected an array of players.');
      }
    })
    .catch(error => console.error('Error fetching data:', error));
  
  }
  //////////////////Rendering first
  // Function to fetch player data from the server and render player cards
  function fetchAndRenderPlayers() {
    const container = document.getElementById('containercard');
    container.innerHTML = ''; // Clear previous content
  
    fetch('/players?format=json')
      .then(response => response.json())
      .then(data => {
        // Check if data.players is an array
        if (Array.isArray(data.players)) {
          data.players.forEach(player => {
            // Create card element
            const card = document.createElement('div');
            card.classList.add('card');
  
            // Determine availability based on socket ID
            const availability = player.socketid !== null;
            const showChatButton = player.chat === null && player.socketid !==null;
  
            // Populate card content
            card.innerHTML = `
              <p>${player.name}</p>
              <p>Sport: ${player.sports.join(', ')}</p>
              <p>Location: ${player.location}, ${player.state}, ${player.city}</p>
              <p>Experience: ${player.skills}</p>
              <p>Gender: ${player.gender}</p>
              ${availability ? "<p style='color:green;font-weight:bold;'>Online</p>" : "<p style='color:red;font-weight:bold;'>Offline</p>"}

              ${showChatButton ? `<a href='/chat?id=${player.socketid}&email=${player.email}'>
              <button id='chat'>Chat now</button>
            </a>` : ''}
            `;
         container.appendChild(card);
          });
        } else {
          console.error('Invalid data format. Expected an array of players.');
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }
  
  // Call the function to fetch and render players when the page loads

  document.addEventListener("DOMContentLoaded", function() {
   fetchAndRenderPlayers();
     
  
 });
 
  
  
    