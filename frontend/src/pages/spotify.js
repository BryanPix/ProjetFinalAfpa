
// const Spotify = async (req,res) => {

//     const clientId = process.env.CLIENT_ID; 
//     const code = undefined;
    
//     if (!code) {
//         redirectToAuthCodeFlow(clientId);
//     } else {
//         const accessToken = await getAccessToken(clientId, code);
//         const profile = await fetchProfile(accessToken);
//         populateUI(profile);
//     }
    
//     async function redirectToAuthCodeFlow(clientId) {
//         // TODO: Redirect to Spotify authorization page
//     }
    
//     async function getAccessToken(clientId, code) {
//       // TODO: Get access token for code
//     }
    
//     async function fetchProfile(token) {
//         // TODO: Call Web API
//     }
    
//     function populateUI(profile) {
//         // TODO: Update UI with profile data
//     }
//   return (
//     <div>

//     <h1>Display your Spotify profile data</h1>

//     <section id="profile">
//     <h2>Logged in as <span id="displayName"></span></h2>
//     <span id="avatar"></span>
//     <ul>
//         <li>User ID: <span id="id"></span></li>
//         <li>Email: <span id="email"></span></li>
//         <li>Spotify URI: <a id="uri" href="#"></a></li>
//         <li>Link: <a id="url" href="#"></a></li>
//         <li>Profile Image: <span id="imgUrl"></span></li>
//     </ul>
//     </section>
//     </div>
    

//   );
// };

// export default Spotify;
