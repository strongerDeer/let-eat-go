import type { NextApiRequest, NextApiResponse } from 'next';
import { StoreAPIResponse, StoreType } from '@/interface';
import { PrismaClient } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreAPIResponse | StoreType[]>,
) {
  const { page = '' }: { page?: string } = req.query;

  const prisma = new PrismaClient();

  if (page) {
    const count = await prisma.store.count();

    const stores = await prisma.store.findMany({
      orderBy: { id: 'asc' },
      take: 10,
      skip: (parseInt(page) - 1) * 10,
    });

    //totalpage, data, page, totalCount
    res.status(200).json({
      page: parseInt(page),
      data: stores,
      totalCount: count,
      totalPage: Math.ceil(count / 10),
    });
  } else {
    const stores = await prisma.store.findMany({
      orderBy: { id: 'asc' },
    });
    res.status(200).json(stores);
  }
}
