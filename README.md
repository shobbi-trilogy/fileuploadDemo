# 📐 Demo File Upload Project

This project is a demo for file upload using 'multer' library. Uploaded files can be saved to physical file OR to database (blob). The project follows the MVC paradiagm. 

This project uses the following libraries:

* Express
* Express Session
* Express Handlebars
* multer
* Sequelize
* mysql2
* dotenv

The .env file requires the following values:
* DB_NAME='image_db'
* DB_USER=
* DB_PASSWORD=
* public_dir='public'
* upload_dir='uploads'

### 📝 Notes

The database consists of one table named `image`. It consists of the following columns:

`
id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
},
originalname: {
    type: DataTypes.STRING(100),
    allowNull: false,
},
name: {
    type: DataTypes.STRING(100),
    allowNull: true,
},
comment:{
    type: DataTypes.STRING(255),
    allowNull: true,
},
mimetype: {
    type: DataTypes.STRING(40),
    allowNull: false,
},
image: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
},`
