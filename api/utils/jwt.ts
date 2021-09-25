import jwt from 'jsonwebtoken'

interface TokenData {
  username: string
  id: string
}

export const sign = async(tokenData: TokenData) => {
  const expiresIn = 24 * 3600 * 7
  const token = await jwt.sign(
    tokenData,
    process.env.JWT_SECRET,
    {
      expiresIn,
    },
  )
  return token
}
