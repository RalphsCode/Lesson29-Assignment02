console.log("JS is running.")

// Get the form elements
const form = document.getElementsByTagName("form")

const favNum = document.getElementById("fav_num");
const favNums = document.getElementById("fav_nums");
const btnSubmit1 = document.getElementById("btn_fav_num");
const btnSubmit2 = document.getElementById("btn_fav_nums");
const btnSubmit3 = document.getElementById("btn_fav_num_4");
const favNumberText = document.getElementById("fav_number_text");
const favNumberFact = document.getElementById("fav_number_fact");


async function getFacts(num) {
    /* Make a promise to get the API data using Async/Await */
    let baseURL = "http://numbersapi.com";

    let res = await axios
        .get(`${baseURL}/${num}/trivia?notfound=floor&json`, {
            headers: {
            'Content-Type': 'application/json'
            }
        } )
        .then(resp => {
            console.log("Promise completed successfully");	
            return resp.data;	
        })
        .catch(err => {
            console.log(`Oops, there was a problem, promise not completed. Error:( ${err}`);
        } );

        return res;
   
}  // END getFacts()


// favorite Number

// Add event listener to the submit button
btnSubmit1.addEventListener("click", function(evt) {
    evt.preventDefault();
    favNumberFact.innerHTML = ''
    // Get the entered number
    const num = favNum.value;
    // Write the number to the DOM
    favNumberText.innerHTML = `<p>Number: ${num}</p>`;
    form[0].reset();

    // Make API Call and return the data
    getFacts(num)
        /* Calls a Promise & returns the API data */
        .then(data => {
            favNumberFact.innerHTML = `<p>Number Fact: ${data.text}</p>`;
            })
        .catch(error => {
            console.error(`Promise Failed: ${error}`);   
            });
    } )    // END addEventListener 



// favorite Numbers

// Add event listener to the submit button
btnSubmit2.addEventListener("click", function(evt) {
    evt.preventDefault();
    favNumberFact.innerHTML = ''
    // Get the entered number
    const nums = favNums.value;
    form[1].reset();
    // Write the numbers to the DOM
    favNumberText.innerHTML = `<p>Numbers: ${nums}</p>`;

    // Make an string of the entered numbers, to use in the URL for the API call
    // Make an array of the numbers
    nums_arr = nums.split(',')

    // Take the array elements and make a string
    let numbers = ""
    for (let i=0; i < nums_arr.length; i++) {
        if (i == 0){
            numbers += `${nums_arr[i]}`
        } else {
                numbers += `,${nums_arr[i]}`
        } };

    // Pass the numbers string into getFacts to return the API data
    getFacts(numbers)
    .then(data => {
        for (res in data) {
                favNumberFact.innerHTML += `${data[res]}</p>`
            };
            
    }  ) 
    .catch(error => {
            console.error(`Promise Failed: ${error}`);   
            });
    }
     )    // END addEventListener 


/* Return 4 facts for a number */

// Add event listener to the submit button
btnSubmit3.addEventListener("click", function(evt) {
    evt.preventDefault();
    favNumberFact.innerHTML = ''
    // Get the entered number
    const num = favNum.value;
    // Write the number to the DOM
    favNumberText.innerHTML = `<p>Number: ${num}</p>`;
    form[0].reset();

    // Make API Call and return the data
    for (let i=0; i<4; i++){
        getFacts(num)
        .then(data => {
            favNumberFact.innerHTML += `<p>${data.text}</p>`
                })
           
        .catch(error => {
                console.error(`Promise Failed: ${error}`);   
                });
        } // END for loop
    } )    // END addEventListener 