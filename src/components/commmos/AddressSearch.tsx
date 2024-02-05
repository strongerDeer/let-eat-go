'use client';

import { UseFormRegister, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { StoreType } from '@/interface';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { useState } from 'react';

interface AddressProps {
  register: UseFormRegister<StoreType>;
  errors: FieldErrors<StoreType>;
  setValue: UseFormSetValue<StoreType>;
}
export default function AddressSearch({
  register,
  errors,
  setValue,
}: AddressProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setValue('address', fullAddress);
    setIsOpen(false);
  };
  return (
    <>
      <div className="col-span-full">
        <label
          htmlFor="address"
          className="block text-sm font-medium leading-6 text-gray-900">
          주소
        </label>
        <div className="mt-2">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            <input
              readOnly
              placeholder="주소를 검색해 주세요"
              {...register('address', { required: true })}
              type="text"
              name="address"
              id="address"
              className="col-span-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="bg-blue-700 text-white rounded">
              주소검색
            </button>
          </div>
          {errors.address?.type === 'required' && (
            <p className="mt-2 text-sm text-red-600">필수 입력사항입니다.</p>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="col-span-full border-2 p-3 box-border overflow-x-auto">
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </div>
      )}
    </>
  );
}
