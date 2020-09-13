/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/*
 *This repo helped me thinking for the task
  Github repo : https://github.com/conordewey3/Udacity-FED-Landing-Page
*/


/**
 * Define Global Variables
 *
*/
  let no=1;


  const Sections = document.querySelectorAll('section');
  const navBar = document.querySelector('#navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

// selecting the active Element from the page
  function SelectActiveElemement() {
      maximumSec = Sections[0];
      minVal = 1000000;
      for (item of Sections) {
          let bounding = item.getBoundingClientRect();
          if (bounding.top > -300 & bounding.top < minVal) {
              minVal = bounding.top;
              maximumSec = item;
          };
      };
      return maximumSec;
  };

  /**
   * End Helper Functions
   * Begin Main Functions
   *
  */

  // build the nav
  function SetNavElemnts (){
    for (let iterator of Sections){
        const element = document.createElement('li');
        element.textContent = iterator.dataset.nav;
        element.dataset.nav = iterator.id;
        element.id="s"+no;
        element.className = 'menu__link';
        navBar.appendChild(element);
        no++;
    };
  };

// Add class 'active' to section when near top of viewport
  function ActiveSection(event){
    let activeElemnt = SelectActiveElemement();
    // to break from the loop when we found the unselected section and unselected nav bar elemnt.
    let foundsec = false ;
    let foundbar =false;

    activeElemnt.classList.add='your-active-class';

    for(let iterator of Sections ){
      if(iterator.id != activeElemnt.id && iterator.classList.contains('your-active-class') && !foundsec){
        iterator.classList.remove('your-active-class');
        foundsec=true;
      }
      if(foundsec){
        foundsec=false;
        break;
      }
    }

    let IDACtive = activeElemnt.id;
    const activeBar = document.getElementById('s'+IDACtive[IDACtive.length-1]);
    activeBar.classList.add('active__link');
    // select all the nav bar to delete active link class from non active one
    const barElemnts = document.querySelectorAll('.menu__link');

    for(let iterator of barElemnts){
      if(iterator.id !=activeBar.id && iterator.classList.contains('active__link') && !foundbar){
          iterator.classList.remove('active__link');
          foundbar=true;
      }
      if(foundbar){
        foundbar=false;
        break;
      }
    }
  };


// Scroll to anchor ID using scrollTO event
function targetSection(event){
  const ID = event.target.dataset.nav;
  const target = document.querySelector('#'+ID);
  target.scrollIntoView();
}


// Build menu
SetNavElemnts();
// Scroll to section on link click
navBar.addEventListener('click',targetSection);
// Set sections as active
window.addEventListener('scroll',ActiveSection);
