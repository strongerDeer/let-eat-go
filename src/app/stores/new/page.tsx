'use client';

import { CATEGORY_ARR, FOOD_CERTIFY_ARR, STORE_TYPE_ARR } from '@/data/store';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import AddressSearch from '@/components/commmos/AddressSearch';
import { StoreType } from '@/interface';

export default function StoreNewPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<StoreType>();

  return (
    <form
      className="px-4 md:max-w-4xl mx-auto py-8"
      onSubmit={handleSubmit(async (data) => {
        try {
          const result = await axios.post('/api/stores', data);

          if (result.status === 200) {
            toast.success('맛집 등록');
            router.replace(`/stores/${result?.data?.id}`);
          } else {
            toast.error('데이터 생성 에러. 다시 시도!');
          }
        } catch (error) {
          console.log(error);
          toast.error('데이터 생성 에러. 다시 시도!');
        }
      })}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            맛집등록
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            아래 내용을 입력해서 맛집을 등록해주세요
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900">
                가게명
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('name', { required: true })}
                  name="name"
                  id="name"
                  autoComplete="store-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.name?.type === 'required' && (
                  <p className="mt-2 text-sm text-red-600">
                    필수 입력사항입니다.
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900">
                카테고리
              </label>
              <div className="mt-2">
                <select
                  {...register('category', { required: true })}
                  name="category"
                  id="category"
                  autoComplete="store-category"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <option value="">카테고리 선택</option>
                  {CATEGORY_ARR.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category?.type === 'required' && (
                  <p className="mt-2 text-sm text-red-600">
                    필수 입력사항입니다.
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900">
                연락처
              </label>
              <div className="mt-2">
                <input
                  {...register('phone', { required: true })}
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="phone"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.phone?.type === 'required' && (
                  <p className="mt-2 text-sm text-red-600">
                    필수 입력사항입니다.
                  </p>
                )}
              </div>
            </div>

            <AddressSearch
              setValue={setValue}
              register={register}
              errors={errors}
            />

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="foodCertifyName"
                className="block text-sm font-medium leading-6 text-gray-900">
                식품인증구분
              </label>
              <div className="mt-2">
                <select
                  {...register('foodCertifyName', { required: true })}
                  name="foodCertifyName"
                  id="foodCertifyName"
                  autoComplete="foodCertifyName"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <option value="">식품인증 선택</option>
                  {FOOD_CERTIFY_ARR.map((certify) => (
                    <option key={certify} value={certify}>
                      {certify}
                    </option>
                  ))}
                </select>
                {errors.foodCertifyName?.type === 'required' && (
                  <p className="mt-2 text-sm text-red-600">
                    필수 입력사항입니다.
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="storeType"
                className="block text-sm font-medium leading-6 text-gray-900">
                업종구분
              </label>
              <div className="mt-2">
                <select
                  {...register('storeType', { required: true })}
                  name="storeType"
                  id="storeType"
                  autoComplete="storeType"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <option value="">업종 선택</option>
                  {STORE_TYPE_ARR.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.storeType?.type === 'required' && (
                  <p className="mt-2 text-sm text-red-600">
                    필수 입력사항입니다.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={() => router.back()}>
          취소
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          등록
        </button>
      </div>
    </form>
  );
}
