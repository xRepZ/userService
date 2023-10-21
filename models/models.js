import { sequelize } from '../db.js'
import { DataTypes } from 'sequelize'

export const UsersModel = sequelize.define('users_model', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    first_name: {type: DataTypes.STRING},
    last_name: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING},

})

