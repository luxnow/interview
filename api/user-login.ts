import { VercelRequest, VercelResponse } from '@vercel/node'
import allowCors from './utils/allowCors.ts'
import jwt from './utils/jwt.ts'
import { init as initDB, getModel } from './utils/mongoose.ts'

export default allowCors(async(request: VercelRequest, response: VercelResponse) => {
  const { username = '' } = request.body

  await initDB()

  const userModel = getModel('user')
  const user = await userModel.findOne({ username })
  if (!user) {
    response.status(200).send({
      err: 'user not exist',
    })
    return
  }

  const token = await jwt.sign({
    username: user.username,
    id: user._id.toString(),
  })

  response.status(200).send({
    token,
  })
})
