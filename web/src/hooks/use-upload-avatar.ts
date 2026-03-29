import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/http/api-client';
import { getProfileQueryKey } from '@/lib/http/generated/hooks/useGetProfile';
import type { UserResource } from '@/lib/http/generated/models/UserResource';

export function useUploadAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await api.post<UserResource>(
        '/api/profile/avatar',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(getProfileQueryKey(), data);
    },
  });
}
