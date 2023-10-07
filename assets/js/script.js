// RECIPE API
let recipeArray = []; // Using "let" to declare recipeArray as it will be modified later


// SEARCH BUTTON / SEARCH BOX VARIABLES
const searchInput = document.getElementById('search');
const searchBtn = document.querySelector('.search-btn'); 


//-------------------------------------//
//- FUNCTION - FETCH RECIPES FROM API -//
//-------------------------------------//

function fetchRecipes(searchTerm) {
    console.log("\n\n\n> fetchRecipes() Called");  
    const recipeUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=45b75717&app_key=bd89c9d8361609dbed2adb82d1106d40&imageSize=THUMBNAIL&field=label&field=url&field=calories&q=${searchTerm}`;
    console.log("  Fetching recipes from edamam...")
    fetch(recipeUrl)                                                                            // Fetch data from edamam using URL above
        .then(function (response) {
            console.log("  ... recipes received from Edamam.")
            if (response.ok) {                                                                  // Check if response OK             
                response.json().then(function (data) {                                          // Hold API response in 'data'
                    console.log (data.hits.length)
                    if (data.hits.length === 0) {                                               // Check if 'data.hits' has values. Alert if zero (data.hits is where recipes are returned in the JSON object
                        alert('No recipes were found - please review your search term(s) and try again');                        
                        return;
                    } else {
                        console.log (data.length)
                        console.log("  Sending recipes to local storage ('key = recipes')");                        
                        localStorage.setItem('recipes', JSON.stringify(recipeArray));  // STORING FETCHED DATA IN LOCAL STORAGE
                        recipeArray = data; // Store the fetched data in recipeArray 
                        console.log("  Storing API data in global variable 'recipeArray'");
                        console.log("    recipeArray:\n    ------------");                        
                        console.log(recipeArray);
                        console.log (recipeArray.hits.length);
                    }
                });
            } else {
                alert('Error in recipes: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to API server');
        });
}

//------------------------------//
//- FUNCTION - DISPLAY RECIPES -//
//------------------------------//
















//--------------------------------------------------------------//
//- LISTENER - PAGE LOAD - RETRIEVE RECIPES FROM LOCAL STORAGE -//
//--------------------------------------------------------------//

window.addEventListener('load', function () {
    console.log("\n\n\n! Page load triggered");      
    const savedRecipes = localStorage.getItem('recipes');
    if (savedRecipes) {
        recipeArray = JSON.parse(savedRecipes);
        
        console.log("  Recipes retrieved from local storage ('key = recipes'):");
        console.log("    recipeArray:\n    ------------")
        console.log(recipeArray);
    }
});

//----------------------------------//
//- LISTENER - CLICK SEARCH BUTTON -//
//----------------------------------//

searchBtn.addEventListener('click', function (event) {                       // Listens for event where user clicks on button (with magnifying glass)
    console.log("\n\n\n! Search button click triggered");      
    event.preventDefault();                                                  // Prevent page refresh
    const searchTerm = searchInput.value;                                    // 'searchTerm' to equal value in search field on page
    if (searchTerm) {
        console.log("  calling fetchRecipes('" + searchTerm + "')"); 
        fetchRecipes(searchTerm);                                            // Call the fetchRecipes function passing through the value on searchTerm onto fetchRecipes()
    } else {
        alert('Please enter a search term.');                                // If searchTerm is falsy then present alert to user
    }    
});


//----------------------------//
//- LISTENER - ENTER KEYDOWN -//
//----------------------------//

searchInput.addEventListener('keydown', function (event) {                   // Listens for event where a key is pressed down (any)
    console.log("\n\n\n! Keydown event triggered");      
    if (event.key === 'Enter') {                                             // If the keydown event was triggered by the "Enter" key
        console.log("  'Enter' detected");  
        event.preventDefault();                                              // Prevent page refresh
        const searchTerm = searchInput.value;                                // 'searchTerm' to equal value in search field on page
        if (searchTerm) {
            console.log("  calling fetchRecipes('" + searchTerm + "')");  
            fetchRecipes(searchTerm);                                        // Call the fetchRecipes function passing through the value on searchTerm onto fetchRecipes()
        } else {
            alert('Please enter a search term.');                            // If searchTerm is falsy then present alert to user
        }
    }
});
