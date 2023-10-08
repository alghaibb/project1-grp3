
// Elements
const searchInput = document.getElementById('search');
const searchBtn = document.querySelector('.search-btn'); 
const featuredTableEl = document.querySelector("#recipe-table-featured");    //Feature table element
const resultsTableEl = document.querySelector("#recipe-table-results");     //Recipe results table element

const appKey = "bd89c9d8361609dbed2adb82d1106d40";      //Edamam App Key (Mahmoud)
const appID = "45b75717"                                //Edamam Recipe App ID

//Arrays
let recipeArray = []; // Using "let" to declare recipeArray as it will be modified later

//-------------------------------------//
//- FUNCTION - FETCH RECIPES FROM API -//
//-------------------------------------//

function fetchRecipes(searchTerm) {
    console.log("\n\n\n> fetchRecipes() Called");  
    const recipeUrl = "https://api.edamam.com/api/recipes/v2?type=public&app_id=" + appID + "&app_key=" + appKey + "&field=uri&field=label&field=image&field=images&field=source&field=url&field=shareAs&field=yield&field=dietLabels&field=healthLabels&field=cautions&field=ingredientLines&field=ingredients&field=calories&field=glycemicIndex&field=totalCO2Emissions&field=co2EmissionsClass&field=totalWeight&field=totalTime&field=cuisineType&field=mealType&field=dishType&field=totalNutrients&field=totalDaily&field=digest&field=tags&field=externalId&q="+ searchTerm;   
    
    console.log("  Fetching recipes from edamam...")
    fetch(recipeUrl)                                                                            // Fetch data from edamam using URL above
        .then(function (response) {
            console.log("  ... recipes received from Edamam.")
            if (response.ok) {                                                                  // Check if response OK             
                response.json().then(function (data) {                                          // Hold API response in 'data'
                    console.log("  Checking data received:")
                    console.log("    data.hits.length = " + data.hits.length)
                    if (data.hits.length === 0) {                                               // Check if 'data.hits' has values. Alert if zero (data.hits is where recipes are returned in the JSON object
                        console.log("    No recipes found - bad")
                        alert('No recipes were found - please review your search term(s) and try again');                        
                        return;
                    } else {                        
                        console.log("    Recipes found - good")
                        console.log("  Sending recipes to local storage ('key = recipes')");                        
                        recipeArray = data;                                                     // Store the fetched data in recipeArray 
                        localStorage.setItem('recipes', JSON.stringify(recipeArray));           // STORING FETCHED DATA IN LOCAL STORAGE
                        console.log("  Storing API data in global variable 'recipeArray'");
                        console.log("    recipeArray:\n    ------------");                        
                        console.log(recipeArray);       
                        displayRecipes();                 
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

function displayRecipes() {
    console.log("\n\n\n> displayRecipes() Called");  
    console.log("  Hiding 'feature-recipe-table' ");  
    featuredTableEl.style.display = "none";                                                  // hide feature-recipe-table
    console.log("  Show 'recipe-results-table' ");  
    resultsTableEl.style.display = "block";
    console.log("  Clearing resultsTableEl to make way for new results")         
    resultsTableEl.innerHTML = "" ;                                                          // Remove all child elements under resultsTableEl (cleras recipe results) - otherwise they'll keep appending

    for (let i = 0; i < recipeArray.hits.length; i++) {
        
        if (i === (recipeArray.hits.length-1)) {
            console.log("  All recipes rendered")                                                                                       // Console.log a message to indicate all recipes rendered
        };

        var recipeContainerEl = document.createElement('li');                                                                           // Create recipe container (li) - this will be appended to main 'ul" container (resutlsTableEl)
        recipeContainerEl.classList.add ("recipe-container", "border-8", "rounded-3xl", "flex", "m-5");                     // Add class (tailwind style)
        resultsTableEl.appendChild(recipeContainerEl);                                                                                  // Append recipeContinerEl to resultsTableEl

            var linkContainerEl = document.createElement('div');                                                                        // Create link container - one of 2 child element to recipe container
            linkContainerEl.classList.add("link-container", "flex", "p-5", "w-1/3","border-2", "justify-center");                                                    // Add class (tailwind style)
            recipeContainerEl.appendChild(linkContainerEl);                                                                             // Append link container to recipe container

                var linkEl = document.createElement ('a');                                                                              // Create link element                
                linkEl.classList.add ("link-link");                                                                     // Add class (tailwind style)
                linkEl.href = recipeArray.hits[i].recipe.url;                                                                           // Define link
                linkContainerEl.appendChild(linkEl);                                                                                    // Append link element to link contaainer
                                
                    var imageEl = document.createElement ('img')                                                                        // Create image element
                    imageEl.classList.add("link-img")                                                                                   // Add class (tailwind style)
                    imageEl.src = recipeArray.hits[i].recipe.images.REGULAR.url;                                                        // Define image source
                    imageEl.alt = "image and link for " + recipeArray.hits[i].recipe.label;                                             // Alt text for accessibility
                    linkEl.appendChild(imageEl);                                                                                        // Append link to image

            var recipeDetailContainerEl = document.createElement('div')                                                                 // Create Recipe detail container - one of 2 child elements to recipe container 
            recipeDetailContainerEl.classList.add ("recipe-detail-container", "flex-col", "p-5", "w-2/3", "border-2");                  // Add class (tailwind style)         
            recipeContainerEl.appendChild(recipeDetailContainerEl);                                                                     // Append Recipe Detaail Container to Recipe Container

                var recipeLabelEl = document.createElement('h2');                                                                       // Recipe label (heading) - child element to recipeDetailContainer
                recipeLabelEl.classList.add("recipe-title", "text-2xl", "font-bold", "mb-5", "text-lime-700", "text-center");           // Add class (tailwind style)
                recipeLabelEl.textContent = recipeArray.hits[i].recipe.label;                                                           // Add recipe title
                recipeDetailContainerEl.appendChild(recipeLabelEl);                                                                     // Append Recipe Label to recipeDetail Container

                var recipeDetailEl = document.createElement('p');                                                                       // Recipe detils - child element to recipeDetailContainer
                recipeDetailEl.classList.add("recipe-detail", "mb-5", "text-lg");                                                                          // Add class (tailwind style)
                var newline = "\n";
                recipeDetailEl.textContent = "Cuisine Type: " + recipeArray.hits[i].recipe.cuisineType + ", Dish Type: " + recipeArray.hits[i].recipe.dishType + ", Meal Type: " + recipeArray.hits[i].recipe.mealType[0] + ", Time: " + recipeArray.hits[0].recipe.totalTime + ", Makes: " + recipeArray.hits[i].recipe.yield; ", Calories: " + recipeArray.hits[i].recipe.calories  // Add Text
                recipeDetailContainerEl.appendChild(recipeDetailEl);                                                                    // Append Recipe Details to recipeDetaail Container

                var recipeLinkEl = document.createElement('a');                                                                         // Recipe Link - child element to recipeDetailContainer
                recipeLinkEl.classList.add ("recipe-link", "mb-5", "text-lg");                                                                             // Add class (tailwind style)
                recipeLinkEl.href = recipeArray.hits[i].recipe.url;                                                                     // Add Recipe Link
                recipeLinkEl.title = "recipeArray.hits[i].recipe.url";                                                                  // Add link text
                recipeLinkEl.style.color = "blue";                                                                                      // Style link text
                recipeDetailContainerEl.appendChild(recipeLinkEl);                                                                      // Append Recipe Link to recipeDetailContainer
                    var recipeLinkText = document.createTextNode('Link to recipe');                                                     // Create element that displays link text (This becomes to link "display as")
                    recipeLinkEl.appendChild(recipeLinkText);                                                                           // Append link display as to link
 
                var recipeSourceEl = document.createElement('p');                                                                       // Recipe Source - child element to recipeDetailContainer
                recipeSourceEl.classList.add ("recipe-source", "mt-5");                                                                         // Add class (tailwind style)
                recipeSourceEl.textContent = "Recipe Source: " + recipeArray.hits[i].recipe.source;                                     // Add source text      
                recipeDetailContainerEl.appendChild(recipeSourceEl);                                                                    // Append Recipe Source to recipeDetailContainer

    }
};

    

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
    console.log("  Hiding 'recipe-results-table' ");  
    resultsTableEl.style.display = "none";     
   // displayRecipes();                                                            //Hy being lazy - remove this at the end
});
 

