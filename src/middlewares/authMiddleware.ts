
import { NextFunction, Request, Response } from "express";
import connection from '../database/connection';

class AuthMiddleware {
  async validate(request: Request, response: Response, next: NextFunction){
    const {chat_id, token} = request.headers;

    try {
    const tokenResponse = await connection('users_tokens').select('token', 'requests_number').where({chat_id, type: 'vod_token'}).limit(1).first();
    if( tokenResponse !== undefined && tokenResponse.token === token){
        if(tokenResponse.requests_number < 10){
          request.requests_number = tokenResponse.requests_number;
          request.chat_id = Number(chat_id);
          return next();
        }
        return response.status(401).json({
          msg: "Token expired"
        });
    }else {
      return response.status(400).json({
        msg: "Invalid token"
      });
    }
  } catch (error) {
    return response.status(500).json({
      msg: "Internal server error"
    });
  }
  }
}

export default AuthMiddleware;
