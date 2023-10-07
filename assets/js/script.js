// RECIPE API
let recipeArray = []; // Using "let" to declare recipeArray as it will be modified later


// SEARCH BUTTON / SEARCH BOX VARIABLES
const searchInput = document.getElementById('search');
const searchBtn = document.querySelector('.search-btn'); 

// EVENT LISTENERS FOR SEARCH BUTTON
searchBtn.addEventListener('click', function (event) {
    console.log("\n\n\n! Search button click triggered");      
    event.preventDefault(); // Prevent form submission
    const searchTerm = searchInput.value;
    if (searchTerm) {
        console.log("  calling fetchRecipes('" + searchTerm + "')"); 
        fetchRecipes(searchTerm); // Call the fetchRecipes function with the search term
    } else {
        alert('Please enter a search term.');
    }    
});

// EVENT LISTENER FOR INPUT (USING ENTER KEYDOWN)
searchInput.addEventListener('keydown', function (event) {
    console.log("\n\n\n! Keydown event triggered");      
    if (event.key === 'Enter') {     // If the keydown event was triggered by the "Enter" key
        console.log("  'Enter' detected");  
        event.preventDefault();
        const searchTerm = searchInput.value;
        if (searchTerm) {
            console.log("  calling fetchRecipes('" + searchTerm + "')");  
            fetchRecipes(searchTerm); // Call the fetchRecipes function with the search term
        } else {
            alert('Please enter a search term.');
        }
    }
});

// FUNCTION TO FETCH RECIPES FROM API
function fetchRecipes(searchTerm) {
    console.log("\n\n\n> fetchRecipes() Called");  
    const recipeUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=45b75717&app_key=bd89c9d8361609dbed2adb82d1106d40&imageSize=THUMBNAIL&field=label&field=url&field=calories&q=${searchTerm}`;
    console.log("  Fetching recipes from edamam...")
    fetch(recipeUrl)
        .then(function (response) {
            console.log("  ... recipes received from Edamam.")
            if (response.ok) {                
                response.json().then(function (data) {
                    if (data.length === 0) {
                        alert('No recipe found - please try again');
                        return;
                    } else {
                        console.log("  Sending recipes to local storage ('key = recipes')");                        
                        localStorage.setItem('recipes', JSON.stringify(recipeArray));  // STORING FETCHED DATA IN LOCAL STORAGE
                        recipeArray = data; // Store the fetched data in recipeArray 
                        console.log("  Storing API data in global variable 'recipeArray'");
                        console.log("    recipeArray:\n    ------------");                        
                        console.log(recipeArray);
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

// LOCAL DATA FROM LOCAL STORAGE WHEN PAGE LOADS
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
