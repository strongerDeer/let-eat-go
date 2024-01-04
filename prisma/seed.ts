import { PrismaClient } from '@prisma/client';
import * as data from '../src/data/store_data.json';

const prisma = new PrismaClient();

async function seedData() {
  data?.['DATA']?.map(async (store) => {
    const storeData = {
      phone: store?.tel_no, //전화번호
      storeType: store?.cob_code_nm, //업종 명 (식육즉석판매가공업, 식육판매업...)
      category: store?.bizcnd_code_nm, //업태 명(마커용)
      name: store?.upso_nm, // 업소 명
      lan: store?.x_cnts, // 지도 Y좌표
      lat: store?.y_dnts, // 지도 X좌표
      address: store?.rdn_code_nm, // 도로명주소
      foodCertifyName: store?.crtfc_gbn_nm, // 식품인증
    };

    const res = await prisma.store.create({
      data: storeData,
    });
    console.log(res);
  });
}

async function main() {
  await seedData();
}
main()
  .catch((e) => {
    console.log(e);

    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });

// npx prisma db seed
