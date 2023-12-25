// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import  axios from 'axios';

type Data = {
  name?: string,
  responseMessage?: string
}

const baseURL = 'https://api.openai.com/v1/chat/completions';
const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const message = "What is the capital of India ?";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    
    try{
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
              model: 'gpt-3.5-turbo',
              messages: [{ role: 'user', content: req.body.message }],
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
              },
            }
          );

          return res.status(200).json({responseMessage: response.data.choices[0].message.content});
            
    } catch(error)
    {
        console.log(error);
    }
    
    return res.status(400).json({name: "Not ok !!"});
}
