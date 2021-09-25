import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

const { Schema, Query } = mongoose

const __setOptions = mongoose.Query.prototype.setOptions
Query.prototype.setOptions = function() {
  __setOptions.apply(this, arguments)
  if (!this.mongooseOptions().lean) this.mongooseOptions().lean = true
  return this
}

const modelMap = {}

export const init = async() => {
  await mongoose.connect(process.env.MONGODB_URI)
}

export const getModel = (modelName) => {
  if (modelMap[modelName]) return modelMap[modelName]

  const ModelSchema = new Schema(
    {},
    {
      strict: false,
      timestamps: true,
    },
  )
  ModelSchema.plugin(mongoosePaginate)
  modelMap[modelName] = mongoose.model(modelName, ModelSchema)
  return modelMap[modelName]
}
