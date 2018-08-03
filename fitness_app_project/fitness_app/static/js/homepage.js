// Chatbot
$(".chatbot-icon").on("click", function() {
  console.log("clicked");
  $(".chat").toggleClass("hide");
});

let workoutResponse = null;
let foodResponse = null;
let username = document.getElementById("username");

let muscles = {
  1: "Biceps Long Head",
  2: "Deltiods",
  3: "Serratus Anterior",
  4: "Chest",
  5: "Triceps",
  6: "Abdominals",
  7: "Calves",
  8: "Glutes",
  9: "Traps",
  10: "Quadriceps",
  11: "Hamstring",
  12: "Lats",
  13: "Bicep Short Head",
  14: "Obliques",
  15: "Calves"
};

//////////////////// Handle Errors //////////////////
const error = (err1, err2, err3) => {
  console.log(err1);
  console.log(err2);
  console.log(err3);
};

///////////////// Render Food and Workout Searches ///////////////
const renderFoodSuccess = response => {
  foodResponse = response.hints;
  $("#search-results").empty();
  $("#sresults").pagination({
    dataSource: foodResponse,
    pageSize: 5,
    callback: function(data, pagination) {
      console.log("data", data);
      // template method of yourself
      let html = foodTemplate(data);
      $("#search-results").html(html);
    }
  });
};

const foodTemplate = response => {
  $("#search-results").empty();
  response.forEach(food => {
    $("#search-results").append(`
        <div id="foodResults">
          <h1>Name: ${food.food.label}</h1>
          <ul id="${food.food.id}"></ul>
        </div>
    `);
    for (let nutrient in food.food.nutrients) {
      let measure = food.food.nutrients[nutrient];
      $(`#${food.food.id}`).append(`
            <li>${nutrient} : ${measure.toFixed(2)}</li>
        `);
    }
    $("#search-results").append(
      `<input value='Save this Food' type='submit' class='saveFood' id=${
        food.food.id
      } data-id='${food.food.id}'>`
    );
  });
};

const renderWorkoutSuccess = response => {
  workoutResponse = response.results;
  console.log("Workout Res  = ", response);
  $("#search-results").empty();
  $("#sresults").pagination({
    dataSource: workoutResponse,
    pageSize: 4,
    callback: function(data, pagination) {
      console.log("data", data);
      // template method of yourself
      let html = workoutTemplate(data);
      $("#search-results").html(html);
    }
  });
};

const workoutTemplate = workoutResponse => {
  $("#search-results").empty();
  workoutResponse.forEach(workout => {
    $("#search-results").append(`
          <div id="${workout.id} class="rendered-workouts">
            <h1>Author: ${workout.license_author}</h1>
            <p>Name: ${workout.name}</p>
            <p>Description: ${workout.description}</p>
            <ul id="muscle-group-${workout.id}"></ul>
          </div>
    `);
    workout.muscles.forEach(muscleNum => {
      $(`#muscle-group-${workout.id}`).append(`<li>${muscles[muscleNum]}</li>`);
    });
    $("#search-results").append(
      `<input value='Save this workout' type='submit' class='saveWorkout' id=${
        workout.id
      } data-id='${workout.id}'>`
    );
  });
};

$("#find-button").on("click", function(e) {
  e.preventDefault();
  if ($("#search-type").val() === "food") {
    let foodInput = $("#food-selection").val();
    let food = foodInput.replace(/" "/g, "%20");
    console.log(food);
    $.ajax({
      method: "GET",
      url: "/api/food/find/" + food,
      success: renderFoodSuccess,
      error: error
    });
  } else if ($(".form-control").val() === "workouts") {
    let muscle = $("#muscle-selection").val();
    console.log("invoked");
    $.ajax({
      method: "GET",
      url: "/api/workout/find/" + muscle,
      success: renderWorkoutSuccess,
      error: error
    });
  }
});

/////////////////////// Save workouts and meals ////////////////////
$("#search-results").on("click", ".saveWorkout", function() {
  console.log("in search");
  // if workout id matches the input button id, save that work
  let workoutId = null;
  let license_author = null;
  let name = null;
  let description = null;
  let muscles = null;

  workoutResponse.forEach(workout => {
    if (workout.id === $(this).data("id")) {
      console.log(workout);
      workoutId = workout.id;
      license_author = workout.license_author;
      name = workout.name;
      description = workout.description;
      muscles = workout.muscles.join(", ");
    }
  });

  $.ajax({
    type: "POST",
    url: "/api/workout/save/" + username,
    dataType: "application/json",
    data: {
      workoutId: workoutId,
      author: license_author,
      name: name,
      description: description,
      muscles: muscles
    },
    success: console.log("success")
  });
});

// ################### SAVE FOOD ###########################################

$("#search-results").on("click", ".saveFood", function() {
  console.log("in search");
  // if workout id matches the input button id, save that work
  let foodId = null;
  let label = null;
  let kcal = null;
  let protein = null;
  let fat = null;
  let carbs = null;

  foodResponse.forEach(food => {
    if (food.food.id === $(this).data("id")) {
      console.log(food);
      foodId = food.food.id;
      label = food.food.label;
      kcal = food.food.nutrients.ENERC_KCAL;
      protein = food.food.nutrients.PROCNT;
      fat = food.food.nutrients.FAT;
      carbs = food.food.nutrients.CHOCDF;
    }
  });

  $.ajax({
    type: "POST",
    url: "/api/food/save/" + username,
    dataType: "application/json",
    data: {
      foodId: foodId,
      label: label,
      kcal: kcal,
      protein: protein,
      fat: fat,
      carbs: carbs
    },
    success: console.log("success from save food")
  });
});

const renderCustomMeals = response => {
  let meals = JSON.parse(response.meals);
  console.log(meals);
  for (let i = 0; i < meals.length; i++) {
    let meal = meals[i];
    $("#meal-feed").append(`<div id="${meal.pk}">
                  <h1>Name: ${meal.fields.label}</h1>
                  <p>Ingredients: ${meal.fields.ingredients}</p>
                  <p>Instructions: ${meal.fields.instructions}</p>
                  <p>Portions: ${meal.fields.portions}</p>
                  <p>Macros: ${meal.fields.macros}</p>
                    </div> <hr id="horizontal">`);
  }
};

const renderCustomCircuits = response => {
  let circuits = JSON.parse(response.circuits);
  console.log(circuits);
  for (let i = 0; i < circuits.length; i++) {
    let circuit = circuits[i];
    $("#circuit-feed").append(`<div id="${circuit.pk}">
                  <h1>Name: ${circuit.fields.name}</h1>
                  <p>Workouts: ${circuit.fields.workouts}</p>
                    </div> <hr id="horizontal">`);
  }
};

$.ajax({
  method: "GET",
  url: "/api/custommeals/",
  success: renderCustomMeals,
  error: error
});

$.ajax({
  method: "GET",
  url: "/api/customcircuits/",
  success: renderCustomCircuits,
  error: error
});

///////////////////////////// Render Proper Form /////////////////
$("#search-type").on("change", function() {
  console.log("hello");
  console.log(this);
  let val = $(this).val();
  console.log(val);
  if (val == "workouts") {
    $("#muscle-select-span").css("display", "inline-block");
    $("#food-selection").css("display", "none");
  } else if (val == "food") {
    $("#food-selection").css("display", "block");
    $("#muscle-select-span").css("display", "none");
  }
});
