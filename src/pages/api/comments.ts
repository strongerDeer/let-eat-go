import type { NextApiRequest, NextApiResponse } from 'next';
import { CommentAPIResponse, CommentInterface } from '@/interface';
import prisma from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

interface ResponseType {
  id?: string;
  page?: string;
  limit?: string;
  storeId?: string;
  user?: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CommentInterface | CommentAPIResponse>,
) {
  const session = await getServerSession(req, res, authOptions);
  const {
    id = '',
    page = '1',
    limit = '10',
    storeId = '',
    user = false,
  }: ResponseType = req.query;

  if (req.method === 'POST') {
    if (!session?.user) {
      return res.status(401);
    }

    const { storeId, body }: { storeId: number; body: string } = req.body;
    const comment = await prisma.comment.create({
      data: {
        storeId,
        body,
        userId: session?.user.id,
      },
    });

    return res.status(200).json(comment);
  } else if (req.method === 'DELETE') {
    if (!session?.user || !id) {
      return res.status(401);
    }

    const result = await prisma.comment.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json(result);
  } else {
    // GET

    const count = await prisma.comment.count({
      where: {
        storeId: storeId ? parseInt(storeId) : {},
        userId: user ? session?.user.id : {},
      },
    });

    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: 'desc' },
      where: {
        storeId: storeId ? parseInt(storeId) : {},
        userId: user ? session?.user.id : {},
      },
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit),
      include: {
        user: true,
        store: true,
      },
    });

    return res.status(200).json({
      data: comments,
      page: parseInt(page),
      totalCount: count,
      totalPage: Math.ceil(count / parseInt(limit)),
    });
  }
}
