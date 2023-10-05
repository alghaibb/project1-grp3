// SEARCH BUTTON / SEARCH BOX VARIABLES
const searchInput = document.getElementById('search');
const searchBtn = document.querySelector('.search-btn'); 

// EVENT LISTENERS FOR SEARCH BUTTON
searchBtn.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent form submission
    const searchTerm = searchInput.value;
    if (searchTerm) {
        fetchRecipes(searchTerm); // Call the fetchRecipes function with the search term
    } else {
        alert('Please enter a search term.');
    }
    console.log(`Searching for "${searchTerm}"...`);
});

// EVENT LISTENER FOR INPUT (USING ENTER KEYDOWN)
searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const searchTerm = searchInput.value;
        if (searchTerm) {
            fetchRecipes(searchTerm); // Call the fetchRecipes function with the search term
        } else {
            alert('Please enter a search term.');
        }
    }
});

// RECIPE API
let recipeArray = []; // Using "let" to declare recipeArray as it will be modified later

// FUNCTION TO FETCH RECIPES FROM API
function fetchRecipes(searchTerm) {
    const recipeUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=45b75717&app_key=bd89c9d8361609dbed2adb82d1106d40&imageSize=THUMBNAIL&field=label&field=url&field=calories&q=${searchTerm}`;

    fetch(recipeUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    if (data.length === 0) {
                        alert('No recipe found - please try again');
                        return;
                    } else {
                        recipeArray = data; // Store the fetched data in recipeArray
                        
                        // STORING FETCHED DATA IN LOCAL STORAGE
                        localStorage.setItem('recipes', JSON.stringify(recipeArray));

                        console.log("Recipe API data stored in global variable 'recipeArray'");
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
    const savedRecipes = localStorage.getItem('recipes');
    if (savedRecipes) {
        recipeArray = JSON.parse(savedRecipes);
        
        console.log('Recipe data loaded from local storage');
        console.log(recipeArray);
    }
});
