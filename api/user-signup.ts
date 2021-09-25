import { VercelRequest, VercelResponse } from '@vercel/node'
import { sign } from './_utils/jwt'
import allowCors from './_utils/allowCors'
import { init as initDB, getModel } from './_utils/mongoose'
initDB()

export default allowCors(async(request: VercelRequest, response: VercelResponse) => {
  const { username = '' } = request.body

  const userModel = getModel('user')
  const isExist = await userModel.findOne({ username })
  if (isExist) {
    response.status(200).send({
      err: 'user exist',
    })
    return
  }

  const { _id } = await userModel.create({ username })
  const token = await sign({
    username,
    id: _id.toString(),
  })

  response.status(200).send({
    token,
  })
})
