import { Request, Response } from "express";
import axios from 'axios';
import connection from '../database/connection';

class VerseOfDayController {
  async getChapter(request: Request, response: Response){
    const {book, chapter} = request.params;
    try {
      const token = await connection('tokens').select('token').where({slug: 'bible_token'}).limit(1).first();
      const chapterResponse = await axios.get(`https://www.abibliadigital.com.br/api/verses/nvi/${book}/${chapter}`, {headers: {Authorization: `Bearer ${token.token}`}});
      const requestIncrement = Number(request.requests_number)+1;
      await connection("users_tokens").update({requests_number: requestIncrement}).where({chat_id: request.chat_id, type: 'vod_token'});

      return response.json(chapterResponse.data);
    } catch (error) {
      return response.status(400).json({msg:error.response.data.msg});
    }
   
  }
}

export default VerseOfDayController;