import { VercelRequest, VercelResponse } from '@vercel/node'
import allowCors from './_utils/allowCors.ts'
import { verifyMiddleware } from './_utils/jwt'
import { init as initDB, getModel } from './_utils/mongoose.ts'

initDB()

export default allowCors(verifyMiddleware(async(request: VercelRequest, response: VercelResponse) => {
  const userId = request.state.id

  const userModel = getModel('user')
  const user = await userModel.findById(userId)
  if (!user) {
    response.status(200).send({
      err: 'user not exist',
    })
    return
  }

  response.status(200).send({
    msg: 'data validate',
  })
}))
