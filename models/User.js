const bcrypt = require('bcrypt');
const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const { use } = require('../routes');

//Create our User model
//user inherits functionality of model
class User extends Model{}

//defie table columns and configuration
User.init(
        {
                //Table Column Definitions Go  here
                //defines column and data type for each column

                //define column id
                id: {
                        //use the special sequelize datatypes object provide what type of data it is
                        type: DataTypes.INTEGER,
                        //this is the equivalent of SQL's `NOT NULL` option
                        allowNull: false,
                        //instructthat this is the primary key
                        primaryKey: true,
                        //turn on auto increment
                        autoIncrement: true
                },

                //define a username column
                username: {
                        type: DataTypes.STRING,
                        allowNull: false
                },
                //define email column
                email: {
                        type: DataTypes.STRING,
                        allowNull: false,
                        //there cannot be any duplicate email values in this table
                        unique: true,
                        //if allowNull is set to false, we can run our data through validators before creating the table data
                        validate: {
                                isEmail: true
                        }
                },
                //define a password column
                password: {
                        type: DataTypes.STRING,
                        allowNull: false,
                        validate: {
                                //this means that the password must be at least four charact long
                                len: [4]
                        }
                }
        },
        {

                hooks: {
                        //set up before Create lifeCycle 'hook' functionality
                        async beforeCreate(newUserData) {
                                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                                return newUserData;
                        },

                        //set up beforeUpdate lifecycle 'hook' functionality
                        async beforeUpdate(updatedUserData) {
                                updatedUserData.password = await bcrypt.hash(updatedUserData, 10);
                                return updatedUserData;
                        }
                },

                //Table configurations options go here
                //pass in our imported sequelize conection (the direct connection to our database)
                sequelize,
                //don't automatically createcreatedAt/updatedAt timestamp fields
                timestamps: false,
                //dont pluralize name of databse table
                freezeTableName: true,
                //use underscores instead of camel-casing
                underscored: true,
                //make it so our model name stays lowercase in the database
                modelName: 'user'
        }
);

module.exports = User;
