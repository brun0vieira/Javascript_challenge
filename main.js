// function responsible for handling which url parameter filter to use according to the operation
// i.e., if the operation is search for a beer by its name then the url_param filter is ?beer_name
function saveInput(e,operation)
{
    // when the user presses ENTER the input is saved OR the user inserted a date and pressed search
    if(e.keyCode===13 || searchButtonPressed(operation)) {

        var input;
        var url_filter;

        switch(operation) {
            case 'name':
                input = document.getElementById("userInput").value;
                url_filter = '?beer_name=';
                break;
            case 'food':
                input = document.getElementById("userInput").value;
                url_filter = '?food=';
                break;
            case 'date':
                input = handleDate();
                url_filter = '?brewed_before=';
                break;
        }
        defineUrl(url_filter,input);
    }
}

// function responsible for making the final url used to make the GET request
// (concatenates the beers url with its filters)
function defineUrl(url_filter,url_filter_value)
{
    var url_without_filter = 'https://api.punkapi.com/v2/beers/';
    var url_with_filter = url_without_filter.concat(url_filter);
    var url = url_with_filter.concat(url_filter_value);

    getRequest(url);
}

// function responsible for making the GET request
function getRequest(url)
{

    var request = new XMLHttpRequest();

    request.open('GET',url);
    request.send();
    request.onload = () =>
    {
        console.log(request);
        if(request.status ==200)
        {
            // by default we receive the response in the string format, we need to parse into JSON
            var data = JSON.parse(request.response);
            createTable(data);
        }
        else
        {
            // if anything goes wrong, logs the error info
            console.log(`error ${request.status} ${request.statusText}`);
        }
    }
}

// function self explanatory
function handleDate()
{
    // dateSelected format: yyyy-mm-dd
    var dateSelected = document.getElementById("date-bar").value;

    // first we need to split the date
    var date_vector = dateSelected.split("-");

    // date_vector[0] contains the year, date_vector[1] the month and date_vector[2] the day
    var date = date_vector[1].concat('-');

    // date format: yyyy-mm, as wanted
    date = date.concat(date_vector[0]);

    return date;
}

// function that returns true if the user has pressed the search button
function searchButtonPressed(operation)
{
    // this only occurs if the operation is = 'date'
    if(operation==='date')
    {
        // Altough the user pressed the search button he might not entered a date, so we need to address that
        var date = document.getElementById("date-bar").value;
        // checks if date is a null, undefined or empty string
        if(date)
        {
            return true;
        }
        else
        {
            alert('You need to insert a date in order to search!');
        }
    }
}

function createTable(data)
{
    // there's any data to insert into the table ?
    // if not, this if isn't executed
    if(data.length > 0)
    {
        var aux = "";

        // loop through each result
        data.forEach((u) => {
            aux += "<tr>";
            aux += "<td>"+u.id+"</td>";
            aux += "<td>"+u.name+"</td>";
            aux += "<td>"+u.description+"</td>";
            aux += "<td>"+u.first_brewed+"</td>";

        })

        document.getElementById("data").innerHTML = aux;
    }
    else
    {
        alert('There\'s no data for your input.');
    }
}
