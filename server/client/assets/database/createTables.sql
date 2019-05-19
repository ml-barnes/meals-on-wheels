CREATE TABLE Person 
(
    personID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
	notes TEXT NULL,
    active BIT NOT NULL DEFAULT 1
) ENGINE=INNODB;

CREATE TABLE Person_Title
(
    personTitleID INT NOT NULL PRIMARY KEY,
    person_title VARCHAR(15) NOT NULL
) ENGINE=INNODB;

CREATE TABLE Customer
(
    customerID INT NOT NULL,
	meal_notes TEXT NULL,
    FOREIGN KEY (customerID) REFERENCES Person(personID)
) ENGINE=INNODB;

CREATE TABLE Driver
(
    driverID INT NOT NULL,
    FOREIGN KEY (driverID) REFERENCES Person(personID)
) ENGINE=INNODB;

CREATE TABLE Meal_Option_Type
(
    mealOptionTypeID INT NOT NULL PRIMARY KEY,
    meal_option_type VARCHAR(30) NOT NULL
) ENGINE=INNODB;

CREATE TABLE Customer_Meal_Option
(
    customerID INT NOT NULL,
    mealOptionTypeID INT NOT NULL,
    FOREIGN KEY (customerID) REFERENCES Customer(customerID),
    FOREIGN KEY (mealOptionTypeID) REFERENCES Meal_Option_Type(mealOptionTypeID)
) ENGINE=INNODB;

CREATE TABLE Person_Note
(
    personID INT NOT NULL,
    notes TEXT NOT NULL,
    FOREIGN KEY (personID) REFERENCES Person(personID)
) ENGINE=INNODB;

CREATE TABLE Person_Email_Address
(
    personID INT NOT NULL,
    email_address VARCHAR(80) NOT NULL,
    FOREIGN KEY (personID) REFERENCES Person(personID)
) ENGINE=INNODB;

CREATE TABLE Phone_Number_Type
(
    phoneNumberTypeID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    phone_type VARCHAR(20) NOT NULL
) ENGINE=INNODB;

CREATE TABLE Person_Phone_Number
(
    personID INT NOT NULL,
    phone_number INT NOT NULL,
    phoneNumberTypeID INT NOT NULL,
    FOREIGN KEY (personID) REFERENCES Person(personID),
    FOREIGN KEY (phoneNumberTypeID) REFERENCES Phone_Number_Type(phoneNumberTypeID)
) ENGINE=INNODB;

CREATE TABLE Street_Type
(
    streetTypeID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    street_type VARCHAR(15) NOT NULL
) ENGINE=INNODB;

CREATE TABLE Town_City
(
    townCityID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    town_city VARCHAR(50) NOT NULL
) ENGINE=INNODB;

CREATE TABLE Postcode
(
    postcodeID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    postcode INT NOT NULL
) ENGINE=INNODB;

CREATE TABLE Person_Physical_Address
(
    personID INT NOT NULL,
    street_number VARCHAR(10) NOT NULL,
    street_name VARCHAR(40) NOT NULL,
    streetTypeID INT NOT NULL,
    townCityID INT NOT NULL,
    postcodeID INT NOT NULL,
	FOREIGN KEY (personID) REFERENCES Person(personID),
   	FOREIGN KEY (streetTypeID) REFERENCES Street_Type(streetTypeID),
    FOREIGN KEY (townCityID) REFERENCES Town_City(townCityID),
    FOREIGN KEY (postcodeID) REFERENCES Postcode(postcodeID)
) ENGINE=INNODB;

CREATE TABLE Driver_Position_Type
(
    driverPositionTypeID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    driver_position_type VARCHAR(30) NOT NULL
) ENGINE=INNODB;

CREATE TABLE Driver_Position
(
    driverID INT NOT NULL,
	driverPositionTypeID INT NOT NULL,
    FOREIGN KEY (driverID) REFERENCES Driver(driverID),
    FOREIGN KEY (driverPositionTypeID) REFERENCES Driver_Position_Type(driverPositionTypeID)
) ENGINE=INNODB;



/*CREATE TABLE Address_List
(
    addressListID INT NOT NULL PRIMARY KEY,
    lat VARCHAR(50) NOT NULL,
    lng VARCHAR(50) NOT NULL,
)*/
    
/*CREATE TABLE Route
(
    routeID INT NOT NULL PRIMARY KEY,
	routeAreaID INT NOT NULL,
    route_date DATETIME NOT NULL,
    active BIT NOT NULL DEFAULT 1,
    FOREIGN KEY routeAreaID REFERENCES Route_Area(routeAreaID)
)

CREATE TABLE Route_Customer
(
    routeID INT NOT NULL,
    customerID INT NOT NULL,
    FOREIGN KEY routeID REFERENCES Route(routeID),
    FOREIGN KEY customerID REFERENCES Customer(customerID)
)

CREATE TABLE Route_Area
(
    routeAreaID INT NOT NULL PRIMARY KEY,
    area VARCHAR(30) NOT NULL
)*/

CREATE TABLE Day_Period
(
    dayPeriodID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    day_period VARCHAR(20) NOT NULL
) ENGINE=INNODB;

CREATE TABLE Day_Of_Week
(
    dayOfWeekID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    day_of_week VARCHAR(20) NOT NULL
) ENGINE=INNODB;

CREATE TABLE Exclusion
(
    customerID INT NOT NULL,
    exclusion_start_date DATETIME NOT NULL,
    exclusion_end_date DATETIME NOT NULL,
    FOREIGN KEY (customerID) REFERENCES Customer(customerID)
) ENGINE=INNODB;
-- need to have the flexibility of both a certain date and between certain times, e.g. a customer may be intending to leave in the evening, but still wants their meal in the morning and lunch


CREATE TABLE Recurring_Order_Schedule
(
    customerID INT NOT NULL,
    dayOfWeekID INT NOT NULL,
    dayPeriodID INT NOT NULL,

    FOREIGN KEY (customerID) REFERENCES Customer(customerID),
    FOREIGN KEY (dayPeriodID) REFERENCES Day_Period(dayPeriodID),
    FOREIGN KEY (dayOfWeekID) REFERENCES Day_Of_Week(dayOfWeekID)
) ENGINE=INNODB;

 -- CREATE TABLE Order_Delivery_Preferred_Time ? is this a good idea?
/*CREATE TABLE Override_Order_Schedule
(
    customerID INT NOT NULL,
    override_date DATE NOT NULL,
    FOREIGN KEY customerID REFERENCES Customer(customerID)
) */

CREATE TABLE Meal_Order
(
    mealOrderID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    delivery_date DATE NOT NULL,
    order_date DATETIME NOT NULL DEFAULT NOW(),
    customerID INT NOT NULL,
    driverID INT NOT NULL,
    FOREIGN KEY (customerID) REFERENCES Customer(customerID),
    FOREIGN KEY (driverID) REFERENCES Driver(driverID)
) ENGINE=INNODB;

CREATE TABLE Meal
(
    mealID INT NOT NULL PRIMARY KEY,
    meal_name VARCHAR(40) NOT NULL
) ENGINE=INNODB;


CREATE TABLE Ordered_Meal
(
    mealOrderID INT NOT NULL,
    mealID INT NOT NULL,
    FOREIGN KEY (mealOrderID) REFERENCES Meal_Order(mealOrderID),
    FOREIGN KEY (mealID) REFERENCES Meal(mealID)
) ENGINE=INNODB;


CREATE TABLE Meal_Food_Type
(
    mealID INT NOT NULL,
    meal_food_type VARCHAR(40) NOT NULL,
    FOREIGN KEY (mealID) REFERENCES Meal(mealID)
) ENGINE=INNODB;

CREATE TABLE Food
(
    foodID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    food_name VARCHAR(40) NOT NULL
) ENGINE=INNODB;

CREATE TABLE Meal_Food
(
   	mealID INT NOT NULL,
    foodID INT NOT NULL,
    FOREIGN KEY (mealID) REFERENCES Meal(mealID),
    FOREIGN KEY (foodID) REFERENCES Food(foodID)
) ENGINE=INNODB;

CREATE TABLE Ingredient_Type
(
    ingredientTypeID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    ingredient_type VARCHAR(15) NOT NULL
) ENGINE=INNODB;

CREATE TABLE Ingredient
(
    ingredientID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    ingredient_name VARCHAR(30) NOT NULL,
   	ingredientTypeID INT NOT NULL,
    FOREIGN KEY (ingredientTypeID) REFERENCES Ingredient_Type(ingredientTypeID)
) ENGINE=INNODB;

CREATE TABLE Food_Ingredient
(
    foodID INT NOT NULL,
    ingredientID INT NOT NULL,
    FOREIGN KEY (foodID) REFERENCES Food(foodID),
    FOREIGN KEY (ingredientID) REFERENCES Ingredient(ingredientID)
) ENGINE=INNODB;




CREATE TABLE Online_Order
(
    date_ordered DATETIME NOT NULL DEFAULT NOW(),
    preferred_delivery_date DATE NOT NULL,
    mealID INT NOT NULL,
    ipAddress VARCHAR(30) NOT NULL,
    FOREIGN KEY (mealID) REFERENCES Meal(mealID)
) ENGINE=INNODB;