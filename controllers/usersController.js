import { UsersModel } from '../models/models.js'
import { ApiError } from '../error/ApiError.js'
import { url } from '../env.js'
import axios from 'axios'
import _ from 'lodash'
import { json } from 'sequelize'

const ACTION_CREATED = 'CREATED'
const ACTION_UPDATED = 'UPDATED'


export const UsersController = {
    add: async (req, resp, next) => {
        try {
            const { email, password, first_name, last_name, phone } = req.body
            if (!email || !password) {
                return next(ApiError.badRequest("email or password fields are empty"))
            }

            const user = await UsersModel.create({ email, password, first_name, last_name, phone })
            await axios.post(url, { user_id: user.id, action: ACTION_CREATED })
                .catch((error) => { console.log(error)})

            return resp.json(user)
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest("user with this email already exist"))
        }


    },
    get: async (req, resp, next) => {
        try {
            const users = await UsersModel.findAll()
            if (!users) {
                return next(ApiError.notFound("Empty users list"))
            }
            return resp.json(users)

        } catch (e) {
            console.log(e)
        }

    },
    change: async (req, resp, next) => {
        try {
            const { id, ...params } = req.body
            if (!id) {
                return next(ApiError.badRequest("id field is empty"))
            }
            const user = await UsersModel.findOne({ where: id })
            if (!user) {
                return next(ApiError.notFound(`can't find user with id = ${id}`))
            }

            if (_.isMatch(user, params)) {
                return next(ApiError.badRequest("Nothing to change"))
            }

            user.update({ ...params })
            user.save()
            await axios.post(url, { user_id: user.id, action: ACTION_UPDATED })
                .catch((error) => { console.log(error)})

            return resp.json(user)
        } catch (e) {
            console.log(e)
        }

    },
}
