import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function CommentForm({
  storeId,
  refetch,
}: {
  storeId: number;
  refetch: () => void;
}) {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const result = await axios.post('/api/comments', {
          ...data,
          storeId,
        });

        if (result.status === 200) {
          toast.success('댓글을 달았습니다');
          resetField('body');
          refetch?.();
        } else {
          toast.error('다시 시도해주세요!');
        }
      })}>
      {errors?.body?.type === 'required' && (
        <div className="text-xs text-red-600">필수 입력사항입니다.</div>
      )}

      <textarea
        placeholder="댓글을 작성해 주세요"
        {...register('body', { required: true })}
      />
      <button type="submit">작성하기</button>
    </form>
  );
}
