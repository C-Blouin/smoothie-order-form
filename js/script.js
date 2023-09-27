/*
JS Assignment 3 - Smoothie Machine

Christopher Blouin
*/

// Assign variables to select specific DOM elements to reference further into the document.
// Form control variables.
const orderButton = document.querySelector("#orderButton");
const clearOrder = document.querySelector("#clearOrder");
const orderOutput = document.querySelector("#orderOutput");


// Slider input variables, I call these variables in my changeSmoothness function.
const pageBackground = document.querySelector("body");
const smoothnessColor = document.querySelector("#smoothness");
const smoothnessText = document.querySelector("#smoothnessText");

// Generate a random number between 1 and 400, I am going to use this random number to display in text output when an order is submitted.
function randomNumber() {
  return Math.floor(Math.random() * 400) + 1;
}
// Assign a variable equal to the generated number, I will inject this into the smoothie output.
let randomOrderNum = randomNumber();

// Start of form order eventListener, pass in the an event argument to the listening function.
orderButton.addEventListener("click", function (event) {
  
  // When the form is submitted, prevent the default behaviour of sending the form data, I want to make sure I can mainipulate the inputted.
  event.preventDefault();

  // let the firstName variable equal the value of the form input with the id of fname.
  let firstName = document.getElementById("fname").value;
  /* 
  Since the first name input is a single input text input, I can check if it's empty using a strict equality operator, if it's not empty the inputted value will be passed to the smoothie Object.
  IF the customer does not type anything in the customer name, there name will be set to a string set to "Anonymous"
  */
  if (firstName === "") {
    firstName = "Anonymous Customer";
  }

  // Select all inputs with the value equal to size.
  let smoothieSize = document.querySelectorAll('input[name="size"]');
  // Declare a variable named selected size to store a deafult string value, this value will change based on the checked value.
  let selectedSize = "No Selected Size";
  // Using a simple forEach method, iterate through the list of smoothieSize radio buttons.
  smoothieSize.forEach(function (smoothieSize) {
    if (smoothieSize.checked) {
      selectedSize = smoothieSize.value;
    }
  });
  // Once the checked input is determined, store the selected value in a new variable to reference in the Smoothie class constructor, which can then be passed into the newly created object.
  const size = selectedSize;

  // Declare a variable named smoothness, this variable references the range input slider.
  let smoothness = document.getElementById("smoothness").value;
  // This conditional block takes the selected value from the range input slider, and depending on the range the assigned value of the smoothness variable will change, the value will get passed into the newly created Smoothie Object. I need this value for my smoothieDescription() method, since I want to display a string of text rather than the number the range input is set to.
  if (smoothness < 25) {
    smoothness = "Very Smooth";
  } else if (smoothness >= 25 && smoothness < 50) {
    smoothness = "Smooth";
  } else if (smoothness >= 50 && smoothness <= 75) {
    smoothness = "Thick";
  } else if (smoothness >= 75 && smoothness <= 100) {
    smoothness = "Very Thick";
  } else {
    smoothness = "Smooth";
  }

  /* 
  Assign a variable fruitOptions to the list of inputs with the name equal to fruit.
  
  The :checked pseudo class lets me know how many items in the node list are checked, I can then validate the checked values once I know how many are selected.
  */
  let fruitOptions = document.querySelectorAll('input[name="fruit"]:checked');
  // Delcare an empty array for selectedFruits that will store the checked fruit options once the selected fruits are determined.
  let selectedFruits = [];
  // Check if there are any fruits selected, if there are no checked items, I want to push the string "No Selected Fruit" to the empty array to populate it's value.
  if (fruitOptions.length === 0) {
    selectedFruits.push("No Selected Fruit");
  }
  // Else there are values checked, using a simple forEach method I can iterate through to determine what values are checked and push them to the selectedFruits array.
  else {
    fruitOptions.forEach(function (fruitOption) {
      selectedFruits.push(fruitOption.value);
    });
  }
  // Create a variable named fruits that will take the values from the above array and concatenate the values with the join method, the joined values will be sent to the new smoothie object.
  const fruits = selectedFruits.join(", ");

  // Select all the vegetable options with the name equal to vegetable using querySelectorAll.
  let vegetableOptions = document.querySelectorAll('input[name="vegetable"]:checked');
  // Create an empty vegetable array to populate depending on the conditions.
  let selectedVegetables = [];
  // If there are no checked options, push to the array "No Selected Vegetables"
  if (vegetableOptions.length === 0) {
    selectedVegetables.push("No Selected Vegetables");
  }
  // Else interate through the node list for each of the checked options, and push the checked values into the selectedVegetables array.
  else {
    vegetableOptions.forEach(function (vegetableOptions) {
      selectedVegetables.push(vegetableOptions.value);
    });
  }

  // Join together all the checked values with a comma inbetween, this variable is passed to the created object.
  const vegetables = selectedVegetables.join(", ");

  // Select all inputs with name equal to healthy.
  let healthyAdditions = document.querySelectorAll('input[name="healthy"]:checked');
  // Create an empty array that will store values depending on conditions.
  let selectedAdditions = [];
  // If there are no checked options, the list length is exactly equal to 0, push to the empty array a string "No Selected Healty Options"
  if (healthyAdditions.length === 0) {
    selectedAdditions.push("No Selected Healthy Additions");
  }
  // Else there are checked options, interate through the list and push each checked option to the empty array.
  else {
    healthyAdditions.forEach(function (healthyAdditions) {
      selectedAdditions.push(healthyAdditions.value);
    });
  }
  // Join the checked options using the the join() method, pass the healthyOptions variable to the smoothie object.
  const healthyOptions = selectedAdditions.join(", ");

  // Select all form inputs with the name value equal to liquid.
  let liquidOptions = document.querySelectorAll('input[name="liquid"]:checked');
  // Delcare a variable to hold a default string if no input is selected.
  let selectedLiquid = "No Liquid Selected";
  // Iterate through the liquid options list (radio buttons).
  liquidOptions.forEach(function (liquidOptions) {
    // If an input is checked, let the selectedLiquid variable to the liquidOption value selected.
    if (liquidOptions.checked) {
      selectedLiquid = liquidOptions.value;
    }
  });

  // Store the value in a new const named liquid to pass into the smoothie object.
  const liquid = selectedLiquid;

  // Select all inputs with value equal to sweet.
  let sweetAdditions = document.querySelectorAll('input[name="sweet"]:checked');
  // Declare an empty array to populate.
  let selectedSweets = [];
  // If the list of checked items is empty, push to the empty array "No Selected Sweet Addition"
  if (sweetAdditions.length === 0) {
    selectedSweets.push("No Selected Sweet Additions");
  }
  // Else iterate through the list of inputs and push the checked values to the empty array.
  else {
    sweetAdditions.forEach(function (sweetAdditions) {
      selectedSweets.push(sweetAdditions.value);
    });
  }
  // Join together all of the checked inputs to be outputted once it's passed into the smoothie object.
  const sweets = selectedSweets.join(", ");

  // Select all form inputs with the name value equal to final.
  let finalTouches = document.querySelectorAll('input[name="final"]:checked');
  // Declare an empty array to store values later.
  let selectedFinalTouches = [];
  // If no inputs are checked, push a default string value to be outputted in teh smoothie description..
  if (finalTouches.length === 0) {
    selectedFinalTouches.push("No Selected Final Touches");
  }
  // Iterate through the inputs list, and push the checked options to the empty array.
  else {
    finalTouches.forEach(function (sweetAdditions) {
      selectedFinalTouches.push(sweetAdditions.value);
    });
  }

  // Join together the checked values and pass them into the new
  const touches = selectedFinalTouches.join(", ");

  // The order button has an event listener waiting for a click, when the click occurs, all the inputted values will be passed into the newly created smoothie object.
  const smoothie = new Smoothie(firstName, size, smoothness, fruits, vegetables, healthyOptions, liquid, sweets, touches);
  // Log the smoothie object.
  console.log(smoothie);

  // Invoke the smoothieDescription method onto the newly created smoothie object. Setting the text output of the output paragraph using innner html as I am wrapping my output elements in html tags.
  orderOutput.innerHTML = smoothie.smoothieDescription();
});
// End of form order eventListener



// Start of Smoothie Class
// Declare a Smoothie class that can be used to create the new smoothie objects whenever the submit form button is clicked
class Smoothie {
  // Pass in the values I'm retrieving from the form into the parameters of the constructor.
  constructor(firstName, size, smoothness, fruits, vegetables, healthyOptions, liquid, sweets, touches) {
    // Set the properties of the constructor, referencing the values from the form and constrcutor parameters.
    this.firstName = firstName;
    this.size = size;
    this.smoothness = smoothness;
    this.fruits = fruits;
    this.vegetables = vegetables;
    this.healthyOptions = healthyOptions;
    this.liquid = liquid;
    this.sweets = sweets;
    this.touches = touches;
  }

  // I built a smoothieDescription method that will grab the parameters passed into the smoothie object, and will output each value the user selected. I call this method in my form submit function when creating a new Smoothie Object.
  smoothieDescription() {
    // I placed each passed in value "this." into paragraph tags to out each value on each line so the output is easier to read. I also surrounded the injected values in a span tag that references the CSS file to make the font weight bold, making the user choices easier to look at in the output.
    let smoothieDesc = 
    
    `
    <h4>Smoothie Order Number #${randomOrderNum}, please wait for your number to be called!</h4>

    <p>Thank you <span class="outputPara">${this.firstName}</span>!</p>
    
    <p>Smoothie Size: <span class="outputPara">${this.size}<span></p>
    
    <p>Blend Smoothness: <span class="outputPara">${this.smoothness}<span></p>
    
    <p>Fruits Added: <span class="outputPara">${this.fruits}<span></p>
    
    <p>Vegetables Added: <span class="outputPara">${this.vegetables}<span></p>
    
    <p>Healthy Additions: <span class="outputPara">${this.healthyOptions}<span></p>
    
    <p>Liquid Added: <span class="outputPara">${this.liquid}<span></p>
    
    <p>Sweet Additions: <span class="outputPara">${this.sweets}<span></p>
    
    <p>Final Touches: <span class="outputPara">${this.touches}<span></p>
    
    `;

    return smoothieDesc;
  }
}
// End of Smoothie Class

// Set a placeholder text to the HTML input range element with ID smoothnessText that will be updated when the slider is adjusted.
smoothnessText.textContent = "Smooth";
// I referenced lab 5 to get the change background color functionality running when the input value is adjusted by the eventListener.
function changeSmoothness() {
  const smoothnessRange = smoothnessColor.value;
  //IF ELSE conditions to check the value of the range input, in my case I set my input range to min 0 and max 100. The background and textContent, and font weight styles will adjust based on the current value range condition.
  if (smoothnessRange < 25) {
    pageBackground.style.cssText = `background-color: #edf4df;`;
    smoothnessText.textContent = "Very Smooth";
    smoothnessText.style.cssText = `font-weight: 100;`;
  } else if (smoothnessRange >= 25 && smoothnessRange <= 50) {
    pageBackground.style.cssText = `background-color: #dfebc5;`;
    smoothnessText.textContent = "Smooth";
    smoothnessText.style.cssText = `font-weight: 400`;
  } else if (smoothnessRange >= 50 && smoothnessRange <= 75) {
    pageBackground.style.cssText = `background-color: #cddbaf;`;
    smoothnessText.textContent = "Thick";
    smoothnessText.style.cssText = `font-weight: 600`;
  } else if (smoothnessRange >= 75 && smoothnessRange <= 100) {
    pageBackground.style.cssText = `background-color: #b2c097;`;
    smoothnessText.textContent = "Very Thick";
    smoothnessText.style.cssText = `font-weight: 900;`;
  } else {
    pageBackground.style.cssText = `background-color: white`;
  }
}
// Event listener attached to the range input, which will invoke the changeSmoothness function. Based on the input value, the background will switch color.
smoothnessColor.addEventListener("input", changeSmoothness);

/* 
   When the clear order form button is clicked, The Form will be reset due to the window being reloaded
   
   I referenced this resource to get the reload functionilty working properly. https://developer.mozilla.org/en-US/docs/Web/API/Location/reload
   */
   clearOrder.addEventListener("click", function () {
    // Locations references the current browser window, and I'm calling the reload method on the browser to clear the form data.
    location.reload();
  });


