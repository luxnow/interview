import jwt from 'jsonwebtoken'

export const sign = async(tokenData) => {
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
