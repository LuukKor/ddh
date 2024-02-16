// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

export type StarshipDTO = z.infer<typeof starshipSchema>;

const starshipSchema = z.object({
  model: z.string().min(1),
  name: z.string().min(1),
  pilot: z.object({
    name: z.string().min(1),
    url: z.string().url(),
  }),
  starship_class: z.enum(['Starfighter', 'Deep Space Mobile Battlestation']),
  cost_in_credits: z.number().min(1000),
  length: z.string().min(1),
  max_atmosphering_speed: z.string().min(1),
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const body = starshipSchema.safeParse(req.body);

    if (!body.success) {
      res.status(400).json({ ...body.error.formErrors });
    }

    res.status(201).json({});
  } else {
    return res.status(500).send(`Only POST method`);
  }
}
