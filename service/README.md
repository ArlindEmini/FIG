Setting the application local

1. Install MySQL locally.

2. Create a new local instance

3. Import the fig_db file from the database directory and run the MySQL script (This script will create the neccesary tables).

4. Run this query in the databse to create the admin user.
    INSERT INTO
    users (full_name, email, username, password, user_type, is_deleted)
    VALUES ("Admin", "Admin@mail.com", "Admin", "$2b$10$xwl53hyH53WijmCrsD3dR.LcwMnIuO7kf6rGTkXIVjVo6tge2WDPC", 0, 0);

5. Create a new .env file with those internal paramters:
    PORT=3000
    MYSQL_DATABASE=FIG_db
    MYSQL_USER=root
    MYSQL_PASSWORD=test1234
    MYSQL_HOST=localhost
    MYSQL_LOCAL_PORT=3306
    SECRET_TOKEN=fig4fig

    NOTE: The environment variables values should be as configured while creating the database.

6. Get the postman collection from the postman folder and import it in the postman.

7. Run the npm install command

8. Run the application with the npm run dev command.

YOU WILL BE ABLE TO TEST THE APIs.