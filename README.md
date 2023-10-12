<a name="readme-top"></a>

# Food Haven - A recipe finder 

## Description

Project1-grp3 and is hosted on GitHub. It contains the code for Project One by Group 3. The purpose of our application, is a recipies search engine.
It can filter by multiple cuisine types and requires a key word in the search engine. It was built simply to cater to a wide range of audiences all over the world.
The project is a web application that allows users to search for recipes based on word search, filters, stores the previous search to local storage,
to then be displayed on the next visit to the website and content on the page can be translated to over 100 languages.

The repository contains an index.html file, CSS, and JavaScript code required to run the application.

## User Story

```
GIVEN I am wanting to decide on a meal to cook
I WANT to be able to quickly and easily find a recipe
I WANT to be able to choose from multiple filters
I WANT to be able to choose from multiple languages to display my recipies
I WANT to easily load the previous search
SO THAT I can prepare a meal I would enjoy

```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## User Acceptance Criteria

```
WHEN I load the page
THEN I want to be able to search for a recipe by keywords

WHEN search results for recipes are shown
THEN a summary of information relating to the recipe is presented to the user - serves, prep time, rating, cook time

WHEN i search for a recipie i have the option to translate into my preffered language


WHEN a recipe is clicked
THEN the user is taken to a recipe page that details cooking steps, ingredients

WHEN I leave the site and return
THEN I can access my past searches



```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Screenshot

Wireframe 

![Image of the wireframe](./assets/images/wireframe.png)

The below is a screenshot gif of the web application's appearance and some of its features

![Screenshot of the web applications](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHNmbHZocHR2M2dybW92dmllajJtcWp4bWllc3ZvNnpoN2ZrejNlbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/uQtXwJPh5VsVRwfVG3/giphy.gif)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Installation

Cloning the repo is the only step required.

Clone this repository to your local machine.

https://github.com/alghaibb/project1-grp3.git

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Technologies Used
- HTML
- CSS
- JavaScript
- Tailwind CSS


## Usage
<a name="URL"></a>
Link to deployed website is found here:
* https://alghaibb.github.io/project1-grp3/

- Open the application in your web browser.
- Translate to prefered language if required.
- Enter multiple filters as required.
- Enter your desired keywords you have on hand in the search bar.
- Click the “Search” button.
- Browse through the list of recipes that match your search criteria.
- Click on a recipe to view its details.
- Upon next arrival your previous search will load.

index.html, script.js and style.css files can be opened in Visual Studio Code

<p align="right">(<a href="#readme-top">back to top</a>)</p>
 

## Contributors
CONTRIBUTOR_ALGHAIBB Moudi
CONTRIBUTOR_HYBEE234
CONTRIBUTOR_T-P15
CONTRIBUTOR_DYL124

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

This project is licensed under the MIT License.


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Badges

N/A
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Features
* Search feature activates when pressing enter key or click on magnifying glass
* New visitors presented with random recipes to start
* Returning visitors presented with the last set of recipes they searched for
* Subtitle dynamically updates from "Welcome" to "Welcome back" and "Search Results"
* Responsive design down to 375 pixels
* Recipe will hide the total time if data is not available from Edamam
* Next page functionality to retrieve the next 20 recipes
* Next page buttons will be hidden if there are no further pages to navigate to.
* Dark mode functionality
* Cuisine filter that restrict results that are returned from Edamam (multi-select box)
* Google Translate embedded into the page


* Links to Edamam website
* Links to GitHub pages for members of group 3


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## How to Contribute

N/A
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Tests

### Application specific:

#### Page Load
* Validate that when the page loads for a new user (with no local storage) that the page presents with a "welcome" message and suggests random recipes
* Validate that when the page loads for a returning new user (with local storage) that the page presents with a "welcome back" message and renders the recipes last searched

#### Search field 
* Validate that the user can initiate a search for recipes by pressing the "enter" button
* Validate that the user can initiate a search for recipes by clicking or tapping on the "magnifying glass icon"
* Validate that the page generates a modal alert if the search field is blank

#### Search Results
* Validate that a searching for recipes successfully populates results on the webpage
* Validate that, if zero results are return, a modal alert appears "No recipes were found - please review your search term(s) and try again(test this by searching for random text "e.g. asdfasdf" ).
* Validate that, total time for a recipe is not displayed if the data is not available
* Validate that the recipe results subtitle updates to "Search Results:"
* Validate that clicking on a recipe link opens it on a new browser tab 

#### Google translate
* Validte that Google Translate feature works (swap languages to translate the page)

#### Footer
* Validate that all links to group 3 team member github profiles work
* Validate that the link to Edamam website works


### Developer practice tests:
* Validate that the application deployed at the live URL (<a href="#URL">Navigate to URL</a>)
* Validate that the webpage loaded without errors
* Validate that GitHub URL has been submitted
* Validate that GitHub repository contains application code
* Validate that the application resembles mock-up provided in the challenge instructions
* Validate that the GitHub repository has a unique name
* Validate that the GitHub repostiory followed be practice for class/id naming conventions, indentation, quality comments, etc
* Validate that the repository contains multiple descriptive commit messages
* Validate that the repository contains a quality README file with description, screenshot and link to deployed applications

<p align="right">(<a href="#readme-top">back to top</a>)</p>

