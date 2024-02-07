import type { NextApiRequest, NextApiResponse } from 'next';
import { LikeAPIResponse, LikeInterface } from '@/interface';
import prisma from '@/db';

interface ResponseType {
  page?: string;
  limit?: string;
}
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LikeAPIResponse | LikeInterface>,
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user) {
    return res.status(401);
  }
  if (req.method === 'POST') {
    const { storeId }: { storeId: number } = req.body;

    let like = await prisma.like.findFirst({
      where: {
        storeId,
        userId: session?.user?.id,
      },
    });

    if (like) {
      like = await prisma.like.delete({
        where: {
          id: like.id,
        },
      });
      return res.status(204).json(like);
    } else {
      like = await prisma.like.create({
        data: {
          storeId,
          userId: session?.user?.id,
        },
      });
      return res.status(201).json(like);
    }
  } else {
    // GET
    const { page = '1', limit = '10' }: ResponseType = req.query;

    if (page) {
      const count = await prisma.like.count({
        where: {
          userId: session.user.id,
        },
      });

      const likes = await prisma.like.findMany({
        orderBy: { createdAt: 'desc' },
        where: {
          userId: session.user.id,
        },
        include: {
          store: true,
        },
        take: parseInt(limit),
        skip: (parseInt(page) - 1) * 10,
      });

      return res.status(200).json({
        data: likes,
        page: parseInt(page),
        totalCount: count,
        totalPage: Math.ceil(count / parseInt(limit)),
      });
    } else {
    }
  }
}
