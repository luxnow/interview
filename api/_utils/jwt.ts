import jwt from 'jsonwebtoken'
import { VercelRequest, VercelResponse } from '@vercel/node'
interface TokenData {
  username: string
  id: string
}

const JWT_SECRET = process.env.JWT_SECRET

export const sign = async(tokenData: TokenData) => {
  const expiresIn = 24 * 3600 * 7
  const token = jwt.sign(
    tokenData,
    JWT_SECRET,
    {
      expiresIn,
    },
  )
  return token
}

export const verifyMiddleware = (fn: { (request: VercelRequest, response: VercelResponse): Promise<void>; (request: VercelRequest, response: VercelResponse): Promise<void>; (arg0: VercelRequest, arg1: VercelResponse): any }) => async(req: VercelRequest, res: VercelResponse) => {
  const notValidateRes = () => res.status(401).send({ err: 'token not validate' })
  let token: string = req.headers.authentication
  if (!token || !token.startsWith('Bearer'))
    return notValidateRes()

  token = token.replace('Bearer ', '')
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.state = decoded
  }
  catch (err) {
    return notValidateRes()
  }

  return await fn(req, res)
}
