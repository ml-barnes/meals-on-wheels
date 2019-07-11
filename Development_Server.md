To get access to the development server you need to get the ssh key from the ops team.

**If you run into a permission error when running npm install:**

If the issue is node-gyp use command: 

npm i --unsafe-perm
npm i node-gyp --unsafe-perm

Or change permissions of node_modules

**Server IP:** 10.118.24.47 

To get the site running, you need to do 3 things.

1. Install and start Postgres 
2. Install node and start the backend server.
3. Build the front end and serve it with Apache.

**Postgres**

Instructions for set up: https://tecadmin.net/install-postgresql-server-on-ubuntu/

Make sure you create a user and database that match the db config in the backend server/

**Node** **Backend**

Instructions for set up: https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04

**Serve Frontend**

Relevant stackoverflow thread: https://stackoverflow.com/questions/54152815/how-can-i-deploy-node-js-back-end-and-react-js-front-end-on-server

*Install apache*

sudo apt-get update
sudo apt-get install apache2

Build your React project using npm run build and then place the files that were created inside of /build folder (in the React folder) to /var/www/html (on the remote server). Note that you need to place there files and folders from /build folder, not the /build folder itself.

Now you should be able to see your react website running when you type the myPublicIpOrDNSname address (assuming that Apache is running sudo systemctl start apache2).

For Apache to work correctly (if you are using front-end routing - ie. react-router-dom), you need to go to /etc/apache2/sites-enabled/000-default.conf and place this configuration

```
<Directory "/var/www/html">
    RewriteEngine on
    # Don't rewrite files or directories
    RewriteCond %{REQUEST_FILENAME} -f [OR]
    RewriteCond %{REQUEST_FILENAME} -d
    RewriteRule ^ - [L]
    # Rewrite everything else to index.html to allow html5 state links
    RewriteRule ^ index.html [L]
</Directory>
```

under <VirtualHost ...> section in that file. (Apache does't know about your React routes. This will make it push every request that it doesn't know how to handle to the root and leave React handle the routing)

Then you need to make sure that RewriteEngine is running (otherwise you will get an error when restarting Apache server).

sudo a2enmod rewrite

Finally, restart Apache server

sudo /etc/init.d/apache2 restart

Now, it should work.

Note that you need to modify your api calls in your React with the new public IP/DNS.

**Adding Data**

In the meals_admin home folder there are some data dumps.

You can fill the database with the pg_restore command. Example:

```
pg_restore -U meals_admin -d newmealsonwheels -1 meals_backup
```
If there is a problem with this you may need to drop the table.

**See createData.js for scripts that will fill db with initial data**


