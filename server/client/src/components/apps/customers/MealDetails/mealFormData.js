const extras = [
  { value: "dessert", label: "Dessert", key: 0, quantity: 1 },
  { value: "soup", label: "Soup", key: 1, quantity: 1 },
  { value: "frozen", label: "Frozen", key: 2, quantity: 1 },
  { value: "sandwiches", label: "Sandwiches", key: 3, quantity: 1 },
  { value: "fruit", label: "Fruit", key: 4, quantity: 1 },
  { value: "baking", label: "Baking", key: 5, quantity: 1 }
];

const restrictionData = [
  [
    { value: "cut meat", label: "Cut Meat" },
    { value: "puree", label: "Puree" },
    { value: "gluten free", label: "Gluten Free" },
    { value: "dairy free", label: "Dairy Free" },
    { value: "diabetic", label: "Diabetic" }
  ],
  [
    { value: "noBeefSwirls", label: "Beef Swirls" },
    { value: "noChicken", label: "Chicken" },
    { value: "noChickenRedWineCassrole", label: "Chicken Red Wine Cassrole" },
    { value: "noChilliBeanMince", label: "Chilli Bean Mince" },
    { value: "noFish", label: "Fish" },
    { value: "noGravy", label: "Gravy" },
    { value: "noMeatLoaf", label: "Meat Loaf" },
    { value: "noMince", label: "Mince" },
    { value: "noPasta", label: "Pasta" },
    { value: "noPork", label: "Pork" },
    { value: "noRiblets", label: "Riblets" },
    { value: "noRice", label: "Rice" },
    { value: "noRoastBeef", label: "Roast Beef" },
    { value: "noSausages", label: "Sausages" },
    { value: "noSilverside", label: "Silverside" }
  ],
  [
    { value: "nobeans", label: "Beans" },
    { value: "noBroccoli", label: "Broccoli" },
    { value: "noCabbage", label: "Cabbage" },
    { value: "noCarrots", label: "Carrots" },
    { value: "noCauliflower", label: "Cauliflower" },
    { value: "noCorn", label: "Corn" },
    { value: "noKumara", label: "Kumara" },
    { value: "noLettuce", label: "Lettuce" },
    { value: "noMushroon", label: "Mushroon" },
    { value: "noNuts", label: "Nuts" },
    { value: "noOnion", label: "Onion" },
    { value: "noPeas", label: "Peas" },
    { value: "noPumpkin", label: "Pumpkin" },
    { value: "noRoastPotato", label: "Roast Potato" },
    { value: "noSilverbeet", label: "Silverbeet" },
    { value: "noSpinach", label: "Spinach" },
    { value: "noStirFryVeggies", label: "Stir Fry Veggies" },
    { value: "noWhiteSauce", label: "White Sauce" }
  ],
  [
    { value: "noApple", label: "Apple" },
    { value: "noDriedFruit", label: "Dried Fruit" },
    { value: "noGrapeFruit", label: "Grape Fruit" },
    { value: "noKiwi", label: "Kiwi" },
    { value: "noLemon", label: "Lemon" },
    { value: "noPineapple", label: "Pineapple" }
  ],
  [
    { value: "noCarrot", label: "Carrot" },
    { value: "noChilli", label: "Chilli" },
    { value: "noCucumber", label: "Cucumber" },
    { value: "noDairy", label: "Dairy" },
    { value: "noEgg", label: "Egg" },
    { value: "noHam", label: "Ham" },
    { value: "noMayonnaise", label: "Mayonnaise" },
    { value: "noSaladDressings", label: "Salad Dressings" },
    { value: "noPickle", label: "Pickle" },
    { value: "noOnion", label: "Onion" },
    { value: "noSalami", label: "Salami" },
    { value: "noTomato", label: "Tomato" },
    { value: "noVinegar", label: "Vinegar" }
  ],
  [
    { value: "noAmbrosia", label: "Ambrosia" },
    { value: "noApple", label: "Apple" },
    { value: "noBakedRice", label: "Baked Rice" },
    { value: "noChocolate", label: "Chocolate" },
    { value: "noCoconut", label: "Coconut" },
    { value: "noCream", label: "Cream" },
    { value: "noCustard", label: "Custard" },
    { value: "noDairy", label: "Dairy" },
    { value: "noGluten", label: "Gluten" },
    { value: "noMilkPuddings", label: "Milk Puddings" },
    { value: "pureed", label: "Needs to be pureed" },
    { value: "soft", label: "Needs to be soft" },
    { value: "noPips", label: "Pips" },
    { value: "noSeeds", label: "Seeds" },
    { value: "noSago", label: "Sago" },
    { value: "noSpanishCream", label: "Spanish Cream" },
    { value: "noMandarins", label: "Mandarins" }
  ],
  [
    { value: "noAsparagus", label: "Asparagus" },
    { value: "noChickenCorn", label: "Chicken & Corn" },
    { value: "noChickenNoodle", label: "Chicken & Noodle" },
    { value: "noCremeMushroom", label: "Creme of Mushroom" },
    { value: "noCremeVegetable", label: "Creme of Vegetable" },
    { value: "noCurry", label: "Curry" },
    { value: "noKumaraVegetable", label: "Kumara & Vegetable" },
    { value: "noLeekPotato", label: "Leek & Potato" },
    { value: "noMulligatawny", label: "Mulligatawny" },
    { value: "noMushroon", label: "Mushroon" },
    { value: "noPeaHam", label: "Pea & Ham" },
    { value: "noPumpkin", label: "Pumpkin" }
  ]
];

export { extras, restrictionData };
