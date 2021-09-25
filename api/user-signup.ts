import { VercelRequest, VercelResponse } from '@vercel/node'
import jwt from './utils/jwt.ts'
import allowCors from './utils/allowCors.ts'
import { init as initDB, getModel } from './utils/mongoose.ts'

export default allowCors(async(request: VercelRequest, response: VercelResponse) => {
  const { username = '' } = request.body
  await initDB()
  console.log('====> username :', username)

  const userModel = getModel('user')
  const isExist = await userModel.findOne({ username })
  if (isExist) {
    response.status(200).send({
      err: 'user exist',
    })
    return
  }

  const { _id } = await userModel.create({ username })
  const token = await jwt.sign({
    username,
    id: _id.toString(),
  })

  response.status(200).send({
    token,
  })
})
