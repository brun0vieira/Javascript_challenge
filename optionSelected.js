// Simple script to check when the user is hovering over the pictures in order to decrease the brightness.
// When the user clicks a picture, it checks the div's id to open the correspondent html page.
const searchItems = document.querySelectorAll('.search-item')

searchItems.forEach(searchItem => {
        searchItem.addEventListener('mouseover', () => {
            searchItem.childNodes[1].classList.add('img-darken');

            searchItem.addEventListener('click', function() {
                switch(searchItem.id) {
                        case 'search_name': window.open('search_name.html','_self');
                                 break;
                        case 'search_food': window.open('search_food.html','_self');
                                 break;
                        case 'search_date': window.open('search_date.html','_self');
                                 break;
                }
            })
        })

        searchItem.addEventListener('mouseout', () => {
            searchItem.childNodes[1].classList.remove('img-darken');
        })
})
