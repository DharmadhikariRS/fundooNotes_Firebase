import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    const  user  = await jwt.verify(bearerToken,process.env.SECRET_KEY);
   console.log("user in auth=",user)
  //  req.body.createdBy=user.Email
  //  req.body.UserId=user.UserId
  req.body.createdBy=user.email
  req.body.id=user.id
    next();
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      code: HttpStatus.UNAUTHORIZED,
      message: `${error}`
    });
  }
};

export const userResetAuth = async (req, res, next) => {
  try {
    //let bearerToken = req.header('Authorization');
    let bearerToken = req.params.token
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
   // bearerToken = bearerToken.split(' ')[1];

    const  user  = await jwt.verify(bearerToken,process.env.SECRET_KEY_RESET);
 
   req.body.email=user.email
   req.body.id=user.id
    next();
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      code: HttpStatus.UNAUTHORIZED,
      message: `${error}`
    });
  }
};


