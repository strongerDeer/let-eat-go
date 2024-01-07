export interface StoreType {
  id: number;
  phone?: string | null;
  storeType?: string | null;
  category?: string | null;
  name?: string | null;
  lan?: string | null;
  lat?: string | null;
  address?: string | null;
  foodCertifyName?: string | null;

  // tel_no: string; //전화번호
  // cob_code_nm: string; //업종 명 (식육즉석판매가공업, 식육판매업...)
  // bizcnd_code_nm: string; //업태 명(마커용)
  // upso_nm: string; //업소 명
  // x_cnts: string; //지도 Y좌표
  // y_dnts: string; //지도 X좌표
  // rdn_code_nm: string; //도로명주소
  // crtfc_gbn_nm: string; //식품인증 구분명(우리동네 모범정육점, 채식가능음식점...)
}
