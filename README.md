<a name="readme-top"></a>

# project1-grp3

## Description


## User Story

```
GIVEN I am wanting to decide on a meal to cook
I WANT to be able to quickly and easily find a recipe
SO THAT I can prepare a meal I would enjoy

```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## User Acceptance Criteria

```
WHEN I load the page
THEN I want to be able to search for a recipe

WHEN search results for recipes are shown
THEN a summary of information relating to the recipe is presented to the user - serves, prep time, rating, cook time

WHEN a recipe is clicked
THEN the user is taken to a recipe page that details cooking steps, ingredients

WHEN I leave the site and return
THEN I can access my past searches



```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Screenshot

Wireframe 

![Image of the wireframe](./assets/images/wireframe.png)

The below is a screenshot of the web application's appearance

![Screenshot of the web applications appearance](./assets/images/screenshot1.jpg)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Installation

Cloning the repo is the only step required.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Usage
<a name="URL"></a>
Link to deployed website is found here:
* https://alghaibb.github.io/project1-grp3/

<p align="right">(<a href="#readme-top">back to top</a>)</p>
 

## Credits
Othneildrew - for the example on linking back to the top of the readme page!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Please refer to the LICENSE in the repo.
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
* Next page functionality also has error handlign if there are no more recipes to Warmomg(error handling functionality)    <---
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

