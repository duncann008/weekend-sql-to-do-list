# Project Name and Description

To-Do App

I need an app that allows a user to create a task and add it to the database. Then the user should be able to alter whether or not that task has been completed.  Finally the user should have an option to delete a task.

## How I Approached My Project:

#### Step 1: Initialization.

1. Created the appropriate folders to store the files I will need to create.
    - Server, Public, Scripts, Routes, Styles, Modules

2. Created all the files needed for my project.
    - HTML, CSS, JS(Server, Router, Module, and Client), jQuery, .gitignore, database.sql

3. Brought in the modules I'd need.
    - NPM, Express, pg
    - Added npm start script to start my server a little faster.

4. Made sure that all of my files are working together.
    - Brought in my jQuery file.
    - Added boilerplate HTML to source my files.
    - Sourced my client.js, styles.css, and jQuery.js into my index.html.
    - Got jQuery working with my client.js with an onReady function.
    - Used 2 console.logs to make sure JS and jQuery were sourced and checked them in my browser.

5. Created a database on Postico to work with my app demands.
    - Created a table with "id", "task", and "complete".
    - Added some dummy data to better visualize and test my table while I work with it.
    - Put the sql-query stuff into my database.sql.

6. Got my client, router, server, and database tied together.
    - Got my server.js up and running by requiring my router and modules.
    - Wired up pool.js.
    - Got my taskRouter.js ready for my requests and responses.


#### Step 2: Make an app that works!

1. 