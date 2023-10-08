import { Schema, model } from 'mongoose'
import { User, UserMethods, UserModel } from '../types/user.type'
import { EMAIL_REGEX, PHONE_NUMBER_REGEX } from '../utils/constants'

const encryptPwd = (password: string) => {
  return Bun.password.hashSync(password)
}

const Users = new Schema<User, UserModel, UserMethods>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    index: true,
    unique: true,
    match: [EMAIL_REGEX, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: true,
    set: encryptPwd
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [PHONE_NUMBER_REGEX, 'Please provide a valid phone number']
  },
  activeUser: {
    type: Boolean,
    default: () => true
  },
  createdDate: {
    type: Number,
    default: () => Date.now()
  },
  lastModifiedDate: {
    type: Number,
    default: () => Date.now()
  }
})

Users.methods.toClient = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    phoneNumber: this.phoneNumber
  }
}

export default model('User', Users)
