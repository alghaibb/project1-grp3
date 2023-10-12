
// Constants, variables, elements
const searchInput = document.getElementById('search');
const searchBtn = document.querySelector('.search-btn'); 
const featuredTableEl = document.querySelector("#recipe-table-featured");           //Feature table element
const resultsTableEl = document.querySelector("#recipe-table-results");             //Recipe results table element
const recipeResultHeading1El = document.querySelector("#recipe-result-heading1");   //Recipe results heading line 1
const recipeResultHeading2El = document.querySelector("#recipe-result-heading2");   //Recipe results heading line 2
const nextPageBtnEl = document.getElementsByName("nextPageBtn");                    //Targets both next page button elements

const appKey = "bd89c9d8361609dbed2adb82d1106d40";                                  //Edamam App Key (Mahmoud)
const appID = "45b75717"                                                            //Edamam Recipe App ID

var modalEl =  document.getElementById('modal');                                    //Modal window
var searchTerm = ""                                                                 //user entered search Term

let cuisineTypeEl = document.getElementsByName("cuisineType");                      //Targets all checkboxes on cuisineType
var cuisineURL = "";                                                                //variable for cuisine url thats empty

var nextPageURL = "";                                                               //API for the next page
var recipeAPI_URL = "";                                                             //API used to fetch data from Edamam

let recipeArray = [];                                                               //Core array used to store and retrieve recipes.

let imageArray = [];

//------------------------------------------//
//- FUNCTION - ASSESS CUISINE TYPE FILTERS -//
//------------------------------------------//
function assessCuisine() {
    console.log("\n\n\n> assessCuisine() Called");  
    console.log("  Clearing the cuisineURL to build afresh")
    cuisineURL = "";                                             //clear cuisineURL so that it can be rebuilt from a clean slate
    console.log("  Assessing cuisine checkboxes")
// For loop assess all check boxes under cuisineTypeEl for Checked/Not Checked status and build the cuisineURL to append to main API request
    for (let i=0; i < cuisineTypeEl.length; i++) {
        if(cuisineTypeEl[i].checked === true) {
            console.log ("    - " + cuisineTypeEl[i].id + " - Checked")
            cuisineURL += cuisineTypeEl[i].value;                //if status is "checked" then grab the element "value" and append to cuisineURL (this appears in the apiURL)            
        } else {
            //console.log (cuisineTypeEl[i].id + " - NOT Checked")
        }
    };
    console.log ("  URL to append to API fetch = " + cuisineURL);
    console.log ("  Calling fetchRecipes() function");
    console.log (searchTerm)
    recipeAPI_URL = "https://api.edamam.com/api/recipes/v2?type=public&app_id=" + appID + "&app_key=" + appKey + "&field=uri&field=label&field=image&field=images&field=source&field=url&field=shareAs&field=yield&field=dietLabels&field=healthLabels&field=cautions&field=ingredientLines&field=ingredients&field=calories&field=glycemicIndex&field=totalCO2Emissions&field=co2EmissionsClass&field=totalWeight&field=totalTime&field=cuisineType&field=mealType&field=dishType&field=totalNutrients&field=totalDaily&field=digest&field=tags&field=externalId&q="+ searchTerm + cuisineURL; // API URL
    fetchRecipes();                                        
}

//-------------------------------------//
//- FUNCTION - FETCH RECIPES FROM API -//
//-------------------------------------//
function fetchRecipes() {
    console.log("\n\n\n> fetchRecipes() Called");  
    console.log("recipeAPI_URL = " + recipeAPI_URL)
    console.log("  Fetching recipes from edamam...")
    fetch(recipeAPI_URL)                                                                         // Fetch data from edamam using URL above
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
        return;
}

//------------------------------//
//- FUNCTION - DISPLAY RECIPES -//
//------------------------------//

function displayRecipes() {
    console.log("\n\n\n> displayRecipes() Called");  
    console.log("  Show 'recipe-results-table' ");  
    resultsTableEl.style.display = "block";
    console.log("  Clearing resultsTableEl to make way for new results")         
    resultsTableEl.innerHTML = "" ;                                                          // Remove all child elements under resultsTableEl (cleras recipe results) - otherwise they'll keep appending

    for (let i = 0; i < recipeArray.hits.length; i++) {
    
        if (i === (recipeArray.hits.length-1)) {
            console.log("  All recipes rendered")                                                                                                         // Console.log a message to indicate all recipes rendered
        };

        var recipeContainerEl = document.createElement('li');                                                                                             // Create recipe container (li) - this will be appended to main 'ul" container (resutlsTableEl)
        recipeContainerEl.classList.add ("recipe-container", "border-8", "rounded-3xl", "flex", "flex-wrap", "m-5", "border-emerald-400", "bg-white", "dark:bg-slate-900");                // Add class (tailwind style)
        resultsTableEl.appendChild(recipeContainerEl);                                                                                                    // Append recipeContinerEl to resultsTableEl

                var linkContainerEl = document.createElement('div');                                                                                      // Create link container - one of 2 child element to recipe container
                linkContainerEl.classList.add("link-container", "p-3", "flex", "justify-center", "items-center", "w-full", "md:w-1/2");                   // Add class (tailwind style)
                recipeContainerEl.appendChild(linkContainerEl);                                                                                           // Append link container to recipe container

                        var linkEl = document.createElement ('a');                                                                                        // Create link element                
                        linkEl.classList.add ("link-link");                                                                                               // Add class (tailwind style)
                        linkEl.href = recipeArray.hits[i].recipe.url;                                                                                     // Define link
                        linkEl.target = "_blank";                                                                                                         // Open Link on new tab
                        linkContainerEl.appendChild(linkEl);                                                                                              // Append link element to link contaainer
                                        
                                var imageEl = document.createElement ('img')                                                                              // Create image element
                                imageEl.classList.add("link-img")                                                                                         // Add class (tailwind style)
                                imageEl.src = recipeArray.hits[i].recipe.images.REGULAR.url;                                                              // Define image source
                                imageEl.alt = "image and link for " + recipeArray.hits[i].recipe.label;                                                   // Alt text for accessibility
                                linkEl.appendChild(imageEl);                                                                                              // Append link to image

                var recipeDetailContainerEl = document.createElement('div')                                                                               // Create Recipe detail container - one of 2 child elements to recipe container 
                recipeDetailContainerEl.classList.add ("recipe-detail-container", "flex-col", "p-3", "w-full", "md:w-1/2");                               // Add class (tailwind style)         
                recipeContainerEl.appendChild(recipeDetailContainerEl);                                                                                   // Append Recipe Detaail Container to Recipe Container

                        var recipeLabelEl = document.createElement('h2');                                                                                 // Recipe label (heading) - child element to recipeDetailContainer
                        recipeLabelEl.classList.add("recipe-title", "text-2xl", "font-bold", "mb-5", "text-emerald-600", "text-center", "dark:text-emerald-300");                  // Add class (tailwind style)
                        recipeLabelEl.textContent = recipeArray.hits[i].recipe.label;                                                                     // Add recipe title
                        recipeDetailContainerEl.appendChild(recipeLabelEl);                                                                               // Append Recipe Label to recipeDetail Container

                        var dishTypeContainerEl = document.createElement('div')
                        dishTypeContainerEl.classList.add("dish-type-container", "flex");
                        recipeDetailContainerEl.appendChild(dishTypeContainerEl);
                                    
                                var dishTypeIconEl = document.createElement('i')
                                dishTypeIconEl.classList.add("fa-solid", "fa-bowl-food", "fa-xl", "flex", "justify-start", "items-center", "p-2", "w-24"); // Add class - fontawesome icon + tailwind CSS
                                dishTypeContainerEl.appendChild(dishTypeIconEl);

                                var dishTypeEl = document.createElement('p');                                                                       
                                dishTypeEl.classList.add("dish-type", "text-lg", "flex", "align-middle", "p-2");                                          // Add class (tailwind style)
                                let dishType = recipeArray.hits[i].recipe.dishType[0];
                                let dishCapital = dishType.charAt(0).toUpperCase() + dishType.slice(1);
                                dishTypeEl.textContent = dishCapital;
                                dishTypeContainerEl.appendChild(dishTypeEl);                                                                              // Append DishType to dishType Container

                        var cuisineTypeContainerEl = document.createElement('div')
                        cuisineTypeContainerEl.classList.add("cuisine-type-container", "flex");
                        recipeDetailContainerEl.appendChild(cuisineTypeContainerEl);
                                    
                                var cuisineTypeIconEl = document.createElement('i')
                                cuisineTypeIconEl.classList.add("fa-solid", "fa-globe", "fa-xl", "flex", "justify-start", "items-center", "p-2", "w-24"); // Add class - fontawesome icon + tailwind CSS
                                cuisineTypeContainerEl.appendChild(cuisineTypeIconEl);

                                var cuisineTypeEl = document.createElement('p');                                                                       
                                cuisineTypeEl.classList.add("cuisine-type", "text-lg", "flex", "align-middle", "p-2");                                    // Add class (tailwind style)
                                let cuisineType = recipeArray.hits[i].recipe.cuisineType[0];
                                let cuisineCapital = cuisineType.charAt(0).toUpperCase() + cuisineType.slice(1);
                                cuisineTypeEl.textContent = cuisineCapital;
                                cuisineTypeContainerEl.appendChild(cuisineTypeEl);                                                                        // Append DishType to dishType Container
  
                                
                        var mealTypeContainerEl = document.createElement('div')
                        mealTypeContainerEl.classList.add("meal-type-container", "flex");
                        recipeDetailContainerEl.appendChild(mealTypeContainerEl);
                                    
                                var mealTypeIconEl = document.createElement('i')
                                mealTypeIconEl.classList.add("fa-solid", "fa-utensils", "fa-xl", "flex", "justify-start", "items-center", "p-2", "w-24"); // Add class - fontawesome icon + tailwind CSS
                                mealTypeContainerEl.appendChild(mealTypeIconEl);

                                var mealTypeEl = document.createElement('p');                                                                       
                                mealTypeEl.classList.add("meal-type", "text-lg", "flex", "align-middle", "p-2");                                          // Add class (tailwind style)
                                let mealType = recipeArray.hits[i].recipe.mealType[0];
                                let mealCapital = mealType.charAt(0).toUpperCase() + mealType.slice(1);
                                mealTypeEl.textContent = mealCapital;
                                mealTypeContainerEl.appendChild(mealTypeEl);                                                                              // Append DishType to dishType Container

                        let totalTime = recipeArray.hits[i].recipe.totalTime;                                         
                        if (parseInt(totalTime) === 0) {}                                                                                                 // If totalTime = 0 then do not dynamically create and append time (leave blank) else create and append elements
                        else {

                        var totalTimeContainerEl = document.createElement('div')
                        totalTimeContainerEl.classList.add("total-time-container", "flex");
                        recipeDetailContainerEl.appendChild(totalTimeContainerEl);
                                    
                                var totalTimeIconEl = document.createElement('i')
                                totalTimeIconEl.classList.add("fa-solid", "fa-clock", "fa-xl", "flex", "justify-start", "items-center", "p-2", "w-24");   // Add class - fontawesome icon + tailwind CSS
                                totalTimeContainerEl.appendChild(totalTimeIconEl);

                                var totalTimeEl = document.createElement('p');                                                                       
                                totalTimeEl.classList.add("total-time", "text-lg", "flex", "align-middle", "p-2");                                        // Add class (tailwind style)
                                let totalTime = recipeArray.hits[i].recipe.totalTime;
                                totalTimeEl.textContent = totalTime + " minutes";
                                totalTimeContainerEl.appendChild(totalTimeEl);
                        }

                        var servesContainerEl = document.createElement('div')
                        servesContainerEl.classList.add("serves-container", "flex");
                        recipeDetailContainerEl.appendChild(servesContainerEl);
                                    
                                var servesIconEl = document.createElement('i')
                                servesIconEl.classList.add("fa-solid", "fa-users", "fa-xl", "flex", "justify-start", "items-center", "p-2", "w-24");     // Add class - fontawesome icon + tailwind CSS
                                servesContainerEl.appendChild(servesIconEl);

                                var servesEl = document.createElement('p');                                                                       
                                servesEl.classList.add("serves-type", "text-lg", "flex", "align-middle", "p-2");                                         // Add class (tailwind style)
                                let serves = recipeArray.hits[i].recipe.yield;
                                servesEl.textContent = "Serves " + serves;
                                servesContainerEl.appendChild(servesEl);                                                                                 // Append DishType to dishType Container

                        var caloriesContainerEl = document.createElement('div')
                        caloriesContainerEl.classList.add("calories-container", "flex");
                        recipeDetailContainerEl.appendChild(caloriesContainerEl);
                                    
                                var caloriesIconEl = document.createElement('i')
                                caloriesIconEl.classList.add("fa-solid", "fa-calculator", "fa-xl", "flex", "justify-start", "items-center", "p-2", "w-24"); // Add class - fontawesome icon + tailwind CSS
                                caloriesContainerEl.appendChild(caloriesIconEl);

                                var caloriesEl = document.createElement('p');                                                                       
                                caloriesEl.classList.add("calories", "text-lg", "flex", "align-middle", "p-2");                                          // Add class (tailwind style)
                                let calories = Math.round(parseInt(recipeArray.hits[i].recipe.calories));
                                caloriesEl.textContent = calories + " calories";
                                caloriesContainerEl.appendChild(caloriesEl);                                                                             // Append DishType to dishType Container
        

                        var recipeLinkContainerEl = document.createElement('div')
                        recipeLinkContainerEl.classList.add("recipe-link-container", "flex", "justify-start");
                        recipeDetailContainerEl.appendChild(recipeLinkContainerEl);

                                var recipeLinkEl = document.createElement('a');                                                                         // Recipe Link - child element to recipeDetailContainer
                                recipeLinkEl.classList.add ("recipe-link", "text-lg", "mt-5", "dark:text-sky-400", "text-blue-700", "hover:underline");                                                          // Add class (tailwind style)
                                recipeLinkEl.href = recipeArray.hits[i].recipe.url;                                                                     // Add Recipe Link
                                recipeLinkEl.title = "recipeArray.hits[i].recipe.url";                                                                  // Add link text
                                recipeLinkEl.target = "_blank";
                                // recipeLinkEl.style.color = "blue";                                                                                      // Style link text
                                recipeLinkContainerEl.appendChild(recipeLinkEl);                                                                        // Append Recipe Link to recipeDetailContainer

                                        var recipeLinkText = document.createTextNode('View recipe details (opens in new window)');                      // Create element that displays link text (This becomes to link "display as")
                                        recipeLinkEl.appendChild(recipeLinkText);                                                                       // Append link display as to link
        
                        var recipeSourceContainerEl = document.createElement('div')
                        recipeSourceContainerEl.classList.add("recipe-source-container", "flex", "justify-end");
                        recipeDetailContainerEl.appendChild(recipeSourceContainerEl);

                                var recipeSourceEl = document.createElement('p');                                                                       // Recipe Source - child element to recipeDetailContainer
                                recipeSourceEl.classList.add ("recipe-source", "mt-5", "flex", "justify-end");                                                                         // Add class (tailwind style)
                                recipeSourceEl.textContent = "Recipe Source: " + recipeArray.hits[i].recipe.source;                                     // Add source text      
                                recipeSourceContainerEl.appendChild(recipeSourceEl);                                                                    // Append Recipe Source to recipeDetailContainer
    }
    if (recipeArray._links.next) {
        console.log ("  Next link OK: " + recipeArray._links.next.href)
        console.log ("  Showing 'next' buttons")
        nextPageBtnEl.forEach(function(nextButton)
        {
            nextButton.style.display = "block"            
        });
    } else {
        console.log ("  There is no next link available - hiding 'next' buttons");                            // Hide the next button if there is no next link        
        nextPageBtnEl.forEach(function(nextButton)
        {
            nextButton.style.display = "none"            
        });        
    }
};

//----------------------------------//
//- LISTENER - CLICK SEARCH BUTTON -//
//----------------------------------//

searchBtn.addEventListener('click', function (event) {                       // Listens for event where user clicks on button (with magnifying glass)
    console.log("\n\n\n! Search button click triggered");      
    event.preventDefault();                                                  // Prevent page refresh
    searchTerm = searchInput.value;                                          // 'searchTerm' to equal value in search field on page
    if (searchTerm) {
        console.log("  calling assessCuisine()"); 
        recipeResultHeading1El.textContent = "Search Results:";              // Set recipe results subtitle to "Search results"
        recipeResultHeading2El.textContent = ""
        assessCuisine();       
    } else {                                                                 //if search field is empty them present modal
        console.log("  Search field empty - presenting modal alert")
        modalEl.classList.remove("hidden");
        modalEl.classList.add("flex");            
        modalEl.setAttribute("aria-model","true");
        modalEl.setAttribute("role","dialog");
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
        searchTerm = searchInput.value;                                      // 'searchTerm' to equal value in search field on page
        if (searchTerm) {
            console.log("  calling fetchRecipes('" + searchTerm + "')");
            recipeResultHeading1El.textContent = "Search Results:";          // Set recipe results subtitle to "Search results"
            recipeResultHeading2El.textContent = ""
            assessCuisine();         
        } else {                                                             //if search field is empty them present modal 
            console.log("  Search field empty - presenting modal alert")
            modalEl.classList.remove("hidden");
            modalEl.classList.add("flex");            
            modalEl.setAttribute("aria-model","true");
            modalEl.setAttribute("role","dialog");
        }
    }
});

//-------------------------------//
//- LISTENER - NEXT PAGE BUTTON -//
//-------------------------------//

nextPageBtnEl.forEach(function(nextButton) {                                     // Loop through and add an event listener to each element captured by nextPageBtnEl (This is an array of two buttons)
    nextButton.addEventListener('click', function(event) { 
        console.log("\n\n\n! Next Page button click triggered");  
        if (!recipeArray._links.next) {
            console.log("   There isn't a next page");
        }
            else {                                         
            console.log("  Next page API URL: " + recipeArray._links.next.href);                                 
            console.log ("  Next page API URL stored in 'recipeAPI_URL'");
            recipeAPI_URL = recipeArray._links.next.href;                       // Set Recipe API URL to the Next Page URL
            fetchRecipes();
        }
    });
});

//--------------------------------------------------------------//
//- LISTENER - PAGE LOAD - RETRIEVE RECIPES FROM LOCAL STORAGE -//
//--------------------------------------------------------------//

window.addEventListener('load', function () {                                               // Event listener that triggers on page load
    console.log("\n\n\n! Page load triggered");      
    const savedRecipes = localStorage.getItem('recipes');                                   // retrieve data from local storage ('key = recipes') - store as savedRecipes
    if (savedRecipes) {                                                                     // If savedRecipes is not null or undefined, then
        recipeArray = JSON.parse(savedRecipes);                                             // convert to JSON object and store as recipeArray
        console.log("  RETURNING VISITOR: Welcome back! Retrieving recipes from last time")
        console.log("  Recipes retrieved from local storage ('key = recipes'):");
        console.log("    recipeArray:\n    ------------");
        console.log(recipeArray);                               
        recipeResultHeading1El.textContent = "Welcome back! It's lovely to see you again!"  // Set recipe results subtitle to "Welcome back" message
        recipeResultHeading2El.textContent = "Here was your last search:"                   // Set recipe results subtitle to "Welcome back" message
        displayRecipes();                                                                   // Run displayRecipes() to display them 
        return;
    } else {                                                                                // else if savedRecipes is null or undefined (i.e. no local storage)
        console.log("  savedRecipes null or undefined");                                
        console.log("  NEW VISITOR: Hello and Welcome! Fetching random recipes")                         
        recipeResultHeading1El.textContent = "Hello and Welcome to our page!"               // Set recipe results subtitle to "New visitor" message
        recipeResultHeading2El.textContent = "Here are some recipes to get you started!"    // Set recipe results subtitle to "New visitor" message
        console.log ("  Random Recipe API URL stored in 'recipeAPI_URL'");
        recipeAPI_URL = "https://api.edamam.com/api/recipes/v2?type=public&app_id=" + appID + "&app_key=" + appKey + "&random=true&q=undefined";        // Random Recipe API URL
        fetchRecipes();
        return;
    };                                                     
});

//----------------------------------------------------------------//
//  - TO HANDLE OS PREF FOR LIGHT OR DARK MODE & MANUAL SWITCH -//
//----------------------------------------------------------------//

// SUN & MOON MODE VARS
const sunIcon = document.querySelector(".sun");
const moonIcon = document.querySelector(".moon");

// - THEME VARS - //

// Get user's preferred theme from local storage
const userTheme = localStorage.getItem("theme"); 
// Check if the system prefers dark mode
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches; 

// - TOGGLING THE ICONS - //
const iconToggle = () => {
    // Toggle the 'display-none' class on moonIcon
    moonIcon.classList.toggle("display-none");
    // Toggle the 'display-none' class on sunIcon
    sunIcon.classList.toggle("display-none");
};

// - THEME CHECK - //
const themeCheck = () => {
    if (userTheme ===  "dark" || (!userTheme && systemTheme)) {
        // If user prefers dark mode or no preference with system preferring dark mode:
        document.documentElement.classList.add("dark"); // Add 'dark' class to the document root
        moonIcon.classList.add("display-none"); // Hide moon icon
        return;
    }
    sunIcon.classList.add("display-none") // Hide sun icon
};

// - MANUAL THEME SWITCH - //
const themeSwitch = () => {
    // If currently in dark mode:
    if (document.documentElement.classList.contains("dark")) {
        // Remove 'dark' class from the document root
        document.documentElement.classList.remove("dark"); 
        // Store 'light' theme in local storage
        localStorage.setItem("theme", "light"); 
        // Toggle icons to show the sun icon
        iconToggle();
        return;
    }
    // Switch to dark mode by adding 'dark' class to the document root
    document.documentElement.classList.add("dark");
    // Store 'dark' theme in local storage
    localStorage.setItem("theme", "dark");
    // Toggle icons to show the moon icon
    iconToggle();
};

// - CALL THEME SWITCH ON CLICK - //
sunIcon.addEventListener("click", () => {
    console.log("Switched to light mode")
    // Call the themeSwitch function to switch to light mode
    themeSwitch();
});

moonIcon.addEventListener("click", () => {
    console.log("Switched to dark mode")
    // Call the themeSwitch function to switch to dark mode
    themeSwitch();
});

// - THEME CHECK ON LOAD - //
themeCheck(); // Check the theme preference when the page loads

//-------------------------//
//- GOOGLE TRANSLATE API  -//
//-------------------------//

function googleTranslateElementInit(){
    new google.translate.TranslateElement(
        {pageLanguage: 'en'},
        'google_translate_element'
    );
}



function findHeroImages(){

    let pexelKey = "vcMDr6XYTzH4WhSt0G6i6mA3GbsAp020BUFhp6glUHJcSfAa9F5BEwKB"
  
    $.ajax({
        method: 'GET',
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", pexelKey);
        },
        url: "https://api.pexels.com/v1/search?query=food",
        success: function (data) {
          const imageArray = data
          console.log(imageArray)
          var i= (Math.floor(Math.random()*imageArray.photos.length))
          console.log(i)
          var img = imageArray.photos[i].src.original
          var imgInput = JSON.stringify(img)
          console.log(imgInput)
            var bg = document.getElementById("backg-img")
            bg.style.backgroundImage = "url("+ imgInput +")"

        }

        
    })
    
  }

  

  
  $(window).on("load", findHeroImages)