import { VercelRequest, VercelResponse } from '@vercel/node'
import allowCors from './utils/allowCors'
import { sign } from './utils/jwt'
import { init as initDB, getModel } from './utils/mongoose'

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

  const token = await sign({
    username: user.username,
    id: user._id.toString(),
  })

  response.status(200).send({
    token,
  })
})
