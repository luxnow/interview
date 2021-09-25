import { VercelRequest, VercelResponse } from '@vercel/node'
import allowCors from './_utils/allowCors'
import { verifyMiddleware, sign } from './_utils/jwt'
import { init as initDB, getModel } from './_utils/mongoose'

initDB()

export default allowCors(verifyMiddleware(async(request: VercelRequest, response: VercelResponse) => {
  const { username = '' } = request.body

  const userModel = getModel('user')
  const user = await userModel.findOne({ username })
  if (user) {
    response.status(200).send({
      err: 'the username exist',
    })
    return
  }

  const userId = request.state.id
  await userModel.findByIdAndUpdate(userId, { username })

  const token = await sign({
    username,
    id: userId,
  })

  response.status(200).send({
    token,
  })
}))
