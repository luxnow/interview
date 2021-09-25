import { VercelRequest, VercelResponse } from '@vercel/node'
import allowCors from './_utils/allowCors'
import { sign } from './_utils/jwt'
import { init as initDB, getModel } from './_utils/mongoose'
initDB()

export default allowCors(async(request: VercelRequest, response: VercelResponse) => {
  const { username = '' } = request.body

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
