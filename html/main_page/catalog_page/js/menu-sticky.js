
/*window.onscroll = function() {myFunction()};


var menu = document.getElementById("menu-header-1");


var sticky = menu.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    menu.classList.add("menu-sticky");
  } else {
    menu.classList.remove("menu-sticky");
  }
}*/

let prevScrollPos = window.pageYOffset;
var menu = document.getElementById("menu-header-1");
window.onscroll = function() {
let currentScrollPos = window.pageYOffset;

if (prevScrollPos > currentScrollPos) {
    //menu.classList.remove("menu-sticky");
    menu.classList.remove("menu-sticky");
} else {
    //menu.classList.add("menu-sticky");
    menu.classList.add("menu-sticky");
}

prevScrollPos = currentScrollPos;
};




