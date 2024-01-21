import type { NextApiRequest, NextApiResponse } from 'next';
import { StoreAPIResponse, StoreType } from '@/interface';
import prisma from '@/db';
import axios from 'axios';

interface ResponseType {
  page?: string;
  limit?: string;
  q?: string;
  district?: string;
  id?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreAPIResponse | StoreType[] | StoreType>,
) {
  const { page = '', limit = '', q, district, id }: ResponseType = req.query;

  if (req.method === 'POST') {
    const formData = req.body;

    const headers = {
      Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
    };

    const { data } = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
        formData.address,
      )}`,
      { headers },
    );

    const result = await prisma.store.create({
      data: { ...formData, lat: data.documents[0].y, lng: data.documents[0].x },
    });
    return res.status(200).json(result);
  } else if (req.method === 'PUT') {
    //수정
    const formData = req.body;

    const headers = {
      Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
    };

    const { data } = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
        formData.address,
      )}`,
      { headers },
    );

    const result = await prisma.store.update({
      where: { id: formData.id },
      data: { ...formData, lat: data.documents[0].y, lng: data.documents[0].x },
    });
    return res.status(200).json(result);
  } else if (req.method === 'DELETE') {
    if (id) {
      const result = await prisma.store.delete({
        where: {
          id: parseInt(id),
        },
      });
      return res.status(200).json(result);
    }
    return res.status(500).json(null);
  } else {
    if (page) {
      const count = await prisma.store.count();

      const stores = await prisma.store.findMany({
        orderBy: { id: 'asc' },
        where: {
          name: q ? { contains: q } : {},
          address: district ? { contains: district } : {},
        },
        take: parseInt(limit),
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
      const { id }: { id?: string } = req.query;

      const stores = await prisma.store.findMany({
        orderBy: { id: 'asc' },
        where: {
          id: id ? parseInt(id) : {},
        },
      });

      return res.status(200).json(id ? stores[0] : stores);
    }
  }
}
