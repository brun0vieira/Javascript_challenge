// Function responsible for saving the input by the user.
// Then calls the correspondent function to make the GET request according to the operation
function saveInput(e,operation)
{
    var url_filter;
    // when the user presses ENTER the input is saved
    if(e.keyCode===13) {
        var input = document.getElementById("userInput").value;

        switch(operation) {
            case 'name':
                url_filter = '?beer_name=';
                break;
            case 'food':
                url_filter = '?food=';
                break;
            /*case 'date':
                break;*/
        }

        defineUrl(url_filter,input);
    }

}

function defineUrl(url_filter,url_filter_value)
{
    var url_without_filter = 'https://api.punkapi.com/v2/beers/';
    var url_with_filter = url_without_filter.concat(url_filter);
    var url = url_with_filter.concat(url_filter_value);
    getRequest(url);
}

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
            console.log(data); // to delete after all done
        }
        else
        {
            // if anything goes wrong, logs the error info
            console.log(`error ${request.status} ${request.statusText}`);
        }
    }
}
