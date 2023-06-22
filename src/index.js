import buttonClick from "./button-click.js";
import makeNewList from "./list-functions.js";

// let titleArray = ['All Tasks', 'Today', 'This Week'];

const menu = document.querySelector('.menu');
const menuItems = menu.querySelectorAll('button');


const wrapper = document.querySelectorAll('.wrapper');

wrapper.forEach(item => {
    item.addEventListener('click', (event) => {
      const isButton = event.target.nodeName === 'BUTTON';
      if (!isButton) {
        return;
      }

      buttonClick(event.target);
      const list = makeNewList('a', 'b', 'c', 'd', 0);
      console.log(list);
    });
});


//   menuItems.forEach(menuItem => {
//     if(menuItem.textContent == event.target.textContent) {
//        headingChange(menuItem);
//     } else {
//         return;
//     }  
//   });