### Meals on Wheels technical documentation

Note that there are two package.json files. You will need to navigate into both of their relevant directories to install the applicable packages with the command `npm install`.

Note that the application runs on port 5433, however the default for Postgres is 5432. You may need to look in your `postgresql.conf` file (on Windows) under the `C:\Program Files\PostgreSQL\<version number here>\data` folder to change the `port` number field.

Run the application using `npm start` from the */servers* directory level.

To create a new user ...

Open up an API development environment (we recommend using Postman) and make a POST request to the url of `localhost:3001/api/registerUser` (while the application is running). In the Body, write a JSON object such as...

```
 {"email": "test@test.com", "password": "P@ssw0rd"}
```

Ensure that the `raw` option is selected, and that the header type is set to `JSON (application/json)`. You will also need to remove the `withAuth` option from the <WRITE FILE NAME HERE!!!!>.

There are ten tables in the database.

#### Clusters
| Name        | Field Type | Key     | References | Example                                                | Default | Not null |
|-------------|------------|---------|------------|--------------------------------------------------------|---------|----------|
| date        | dateonly   | PRIMARY |            | 2019-03-17                                             |         | false    |
| clusterData | JSONB      |         |            | { date: '2014-05-20', customerIDs {1, 2, 3, 4, 5 ...}} |         | false    |
|             |            |         |            |                                                        |         |          |

This is where information about clusters is stored.


Customers

This is where customer data is stored. including their personal details, meal data and extra data.

| Name            | Field Type | Key     | References | Example | Default        | Allow null |
|-----------------|------------|---------|------------|---------|----------------|------------|
| customerID      | integer    | PRIMARY |            | 6       | AUTO_INCREMENT | false      |
| detailData      | JSONB      |         |            | {}      |                | false      |
| mealData        | JSONB      |         |            | {}      |                | true       |
| restrictionData | JSONB      |         |            | {}      |                | true       |
| active          | boolean    |         |            | true    | true           | false      |

Cycles


DriverDays

This is where driver days are stored.

| Name     | Field Type | Key     | References | Example    | Default | Allow null |
|----------|------------|---------|------------|------------|---------|------------|
| driverID | INTEGER    | FOREIGN | Driver     | 3          |         | false      |
| date     | DATEONLY   |         |            | 2019-08-12 |         | false      |

Drivers

This is where driver data is stored.

| Name       | Field Type | Key     | References | Example | Default        | Allow null |
|------------|------------|---------|------------|---------|----------------|------------|
| driverID   | INTEGER    | PRIMARY |            | 5       | AUTO_INCREMENT | false      |
| detailData | JSONB      |         |            | {}      |                | false      |
| active     | BOOLEAN    |         |            | true    | true           | false      |

Extras

| Name     | Field Type | Key     | References | Example    | Default | Allow null |
|----------|------------|---------|------------|------------|---------|------------|
| date     | DATEONLY   | PRIMARY |            | 2018-03-22 |         | false      |
| mealData | JSONB      |         |            | {}         |         | false      |

Food

| Name   | Field Type | Key     | References | Example                | Default | Allow null |
|--------|------------|---------|------------|------------------------|---------|------------|
| foodID | INTEGER    | PRIMARY |            | 2                      |         | false      |
| name   | JSONB      |         |            | {}                     |         | false      |
| type   | ENUM       |         |            | "Meat","Vegetable" ... |         | false      |

FoodMeal


Meals

| Name   | Field Type | Key     | References | Example                | Default | Allow null |
|--------|------------|---------|------------|------------------------|---------|------------|
| mealID | INTEGER    | PRIMARY |            | 2                      |         | false      |

* 
Users

This is the table that stores a username and password for authentication purposes.

| Name     | Field Type | Key     | References | Example                                | Default | Allow null |
|----------|------------|---------|------------|----------------------------------------|---------|------------|
| userID   | INTEGER    | PRIMARY |            | 2                                      |         | false      |
| username | STRING     |         |            | bob                                    |         | false      |
| password | STRING     |         |            | $2b$10$dmvth13feabfQK2cYeQNoaiKiGL.Tf5 |         | false      |

Reading in customers and drivers...