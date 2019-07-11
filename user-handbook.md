

### Meals on Wheels Handbook

##### Login page

Across the application, regardless of which page link you first visit such as `www.mealsonwheels.op-bit.nz/customers` or `www.mealsonwheels.op-bit.nz/drivers`, you will be asked for the username and password. The default logout time period is 24 hours. To logout, simply click on the exit button in the top-right corner, which is on any page within the application.

##### Home page

The home page is where all the critical information pertinent to today and tomorrow is stored. Notifications will also appear here, resembling events that can occur. For example, if a customer has been inactive for three months or longer, a suggestion notification will appear suggesting to mark that particular customer as inactive. Critical warning messages will appear in red - for example, if an administrator has marked a driver as inactive for today or tomorrow that was previously assigned to a cluster.

A full list of possible events ...

Few number of drivers for a particular day (perhaps calculate this with the expected number of customers)

## Customers
#####  Display page

This is where information about the customers is displayed. In the top section, clicking the **New Customer** button will redirect you to the Add Customers page. Clicking the **Restore** button will open a modal which displays all the inactive customers. You can also search for customers on various attributes (last name, first name, address and phone number) and the results will continually update as you type. 

 In the rows, you can see attributes such as title, address, phone number. To the right are different options, including creating an Extra, editing an existing customers details, and disabling a customer. Disabling a customer does not delete them as such but rather marks them as inactive. Doing this immediately removes them from the page and across the application (from clusters etc). You can restore them at any time by clicking the **Restore** button as noted above.

?? should we limit results to say 20, but show more as the user scrolls down the page? seems to be some lag going on

#####  Add page

This is where you can add a new customer in.

On the first page, you can add various personal details for a customer. When typing in an address, the application will take your input and seek out to provide suggestions as you type. Once a suggestion appears, please click on it (provided it is the one you are looking for) and a confirmation modal will appear, asking you to confirm the address. You will see a map with a marker appearing at the location the application suggests (based on your input). If you do not agree with where it has placed the marker, you have the ability to move it by clicking on the **Move** button. The marker will now become draggable and you can move it to a location of your choosing. The application may not be able to find any suggestions for your input, and in this case you can press the Enter key to bring up the confirmation modal. The map will appear in the middle of Dunedin with no marker. Please move to the area on the map you want the marker to be placed and then double-click on the point in the map you wish the marker to be displayed at. Click the **Confirm** button to confirm your choice.

Click the arrow button to the right of the page to be taken to the next dialog.

Note: you can go back and forth between dialogs should you wish to make a change.

## Drivers
#####  Display page

This is where information about the drivers is displayed. In the top section, clicking the **New Driver** button will redirect you to the Add Drivers page. Clicking the **Restore** button will open a modal which displays all the inactive drivers. You can also search for drivers on various attributes (last name, first name, address and phone number) and the results will continually update as you type. 

 In the rows, you can see attributes such as title, address, phone number. To the right are different options, including editing an existing drivers details, and disabling a driver. Disabling a driver does not delete them as such but rather marks them as inactive. Doing this immediately removes them from the page and across the application (from clusters etc). You can restore them at any time by clicking the **Restore** button as noted above.

#####  Add page

On this page, you can add new drivers. Enter in the driver's personal details to begin with. You'll also see a date picker spanning four months in advance for you to select the driver's delivery dates. You can enter dates in for just the current month if you want to - you are not required to enter in dates in advance, although if you have that information then you should. You can easily add dates later on once you have created the driver.

## Routes
#####  Delivery Runs page

This is where you can see delivery runs/schedules.

On the top right in the header, you can select a date and see all the clusters and given drivers for that particular date. 
You can print out this information using the print button in the top-right corner and it will format the output nicely. You can give these print-outs to the drivers themselves.

There is also a map on the right, which displays the customers in a close-up version (zoomed out to fit all the customers in on the map).

!!!!! SHOULD THE PRINT BUTTON APPEAR IF ALL THE CLUSTERS ARE DISPLAYED FOR A PARTICULAR DATE, OR ONLY WHEN ONE CLUSTER IS DISPLAYED AT TIME ?????

You can see which items need to be delivered to which individual customers in their row. In the table beneath the display, it contains a list of the total number of different meals and extras for the particular run for each category. This is based on what the customers have specified (meals and extras) for that date. The fields are:

* Number of standard meals
* Number of special meals
* Total number of meals
* Deserts Standard
* Desserts Named
* Total number of desserts
* Soups
* Sandwiches
* Baking
* Frozen Meals
* Savouries
* Fruit

Note: it does not make much sense to select a particular date or print anything off for a particular date until you have the clusters mostly sorted.

#####  Clusters page

This is the interface where you can perform a variety of actions to help with Cluster/Route/Driver management. Clusters are reflected as coloured polygons on the map, with the individual markers inside. You can see seven days worth of data in advance. Down on the right, you can interact with the timeline slider and see current date that you are working with. Selecting another date in the timeline slider will automatically update all the information and reflect the data for the date you are now working with.  

As mentioned before, each cluster on the map is represented as a coloured polygon. Clicking on the polygon itself will display more information about it, including its number, the driver (if already selected) and the number of customers for the given cluster. 

On the left is a sidebar, containing information about the current state of the situation. It displays a list of drivers available for the given date, along with which cluster they have been assigned to. 

To move a customer into another cluster, select the marker of the customer you want to move and a select box will appear. Select the cluster number you want the customer to be moved into to complete the change, and the change will be updated automatically straightaway both on the map and across the site and will be saved internally.

On the left

Print functionality ????

Allow them to play with the concavity property or minimum cluster group number ???

How to identify polygon/cluster - can we number them?

**Notes**

1. This part of the application only takes into account whether any given customer has a meal for a particular date. It only seeks to confirm that they do indeed have a meal for that specific date, but does not concern itself with how many meals, what types of meals, any extras they may have etc. This information is reflected on the Display page. 

2. If an administrator gets rid of all meals for a particular customer on any date when the cluster has already been generated for that particular date over on the separate configuration pages, the customer will therefore be removed from the given cluster they were previously in on for that particular date.

3. Please note that if you were not expecting a customer to be displayed for a particular day, or want to delete them, they must still have a meal. You will need to ensure that they don't have any meals or extras scheduled for the particular date you are working with on the applicable pages.

4. Changes you make to this page are also reflected on other parts of the application, e.g. the Display page. E.g. if you move a customer into another cluster, that will be reflected on the Display page.

5. Drivers can only belong to one cluster (??????????)

##### Meals page

##### Meal Calendar page


##### Map page

This is where you can visibly see customer locations as represented on a map. Each customer is grouped together into a cluster to help you see results better (rather than having hundreds of markers displayed). Note that the term here of 'cluster' is different from the 'cluster' term. These clusters do not have any association with the actual clusters - they are simply based on distance between the individual markers themselves, but do not have any bearing on the application themselves.

##### Actions that happen at midnight ...

Note that every night, with the exception of Sundays, the application will automatically run various tasks at 1 minute past midnight (12:01) NZDT. 

* For the clusters, the application will generate them approximately seven days in advance. During this process, it looks for customers who have a meal for that particular day. The application also finds all the drivers that are available for that particular day. The information is then reflected on the Display Clusters page as a new entry for that new particular date. Note that there may be a few seconds lag on the website while the website processes all this. 

    The algorithm for generating the clusters is primarily based on the number of drivers there is for the day. If there are say 12 drivers for any particular day, there will be twelve clusters in total. However, there is also a second factor to the algorithm. Each cluster must have a minimum number of customers inside, to help ensure the results aren't too varied and that the generated cluster results are fairly equally distributed.  The less drivers there are for a particular day makes for a harder time for the algorithm to generate fair results, and the generated clusters will inevitably get bigger. As a straightforward example, if there are 153 customers booked for a meal on a particular date, and there are eight drivers.

* For the clusters display, the application will determine all the customers that have meal(s), and then perform a variety of calculations based on the cluster they have been assigned to (this follows after the clusters themselves have been generated). This information is reflected on the Routes Display.

* The data for the application (customer details, meal information etc) gets automatically backed up on a separate backups server. Please contact Adon should you require a restore. The information is based on a retention period of <MONTHS HERE!!!> months, and then will be overwritten.

This information This process is ongoing - the application will continually do this without any intervention necessary.

For the home page, you will receive updates on the overall health of the application. These notifications also get updated automatically at one minute past midnight.


It is important to schedule driver days well in advance, so that the cluster generation algorithm can perform better. Since the number of clusters is dependant on the number of drivers, so if you have only two drivers in five days from now, obviously the results will be very poor. The Home page will return warnings well in advance to ensure the administrator has listed driver schedules for the next < number of days here!!!!> days.