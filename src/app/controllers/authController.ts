import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthController {
  async authenticate(req: Request, res: Response){
    const repository = getRepository(User);

    const {email, password} = req.body;

    const user = await repository.findOne({where: { email }});

    if(!user){
      return res.sendStatus(401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword){
      return res.sendStatus(401);
    }

    if(process.env.SECRET_TOKEN){
      const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, {expiresIn: '1d'})
      return res.json({
        user: {
          id: user.id,
          email: user.email,
        },
        token
      })
    }else{
      return res.sendStatus(400);
    }
  }
}

export default new AuthController;