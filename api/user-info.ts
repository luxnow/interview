import { VercelRequest, VercelResponse } from '@vercel/node'
import jwt from 'jsonwebtoken'
import allowCors from './utils/allowCors.ts'
import { init as initDB, getModel } from './utils/mongoose.ts'

export default allowCors(async(request: VercelRequest, response: VercelResponse) => {
  const { username = '' } = request.header

  await initDB()

  const userModel = getModel('user')
  const isExist = await userModel.findOne({ username })
  if (isExist) {
    console.log('====> end Time :', (Date.now() - time) / 1000)
    response.status(200).send({
      err: 'user exist',
    })
    return
  }

  const { _id } = await userModel.create({ username })
  const tokenData = {
    username,
    id: _id.toString(),
  }
  const expiresIn = 24 * 3600 * 7
  const token = await jwt.sign(
    tokenData,
    process.env.JWT_SECRET,
    {
      expiresIn,
    },
  )

  response.status(200).send({
    token,
  })
})
