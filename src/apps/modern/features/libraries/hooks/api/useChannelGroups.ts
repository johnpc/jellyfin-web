import type { AxiosRequestConfig } from 'axios';
import { useQuery } from '@tanstack/react-query';

import { type JellyfinApiContext, useApi } from 'hooks/useApi';

/**
 * A live TV channel group as returned by `GET /LiveTv/ChannelGroups`.
 * Not part of the generated client yet.
 */
export interface LiveTvChannelGroup {
    Id: string;
    Name: string;
    ChannelCount: number;
}

const fetchChannelGroups = async (
    currentApi: JellyfinApiContext,
    options?: AxiosRequestConfig
) => {
    const { api, user } = currentApi;
    if (api && user?.Id) {
        const response = await api.axiosInstance.get<LiveTvChannelGroup[]>(
            api.getUri('/LiveTv/ChannelGroups', { userId: user.Id }),
            {
                signal: options?.signal,
                headers: { Authorization: api.authorizationHeader }
            }
        );
        return response.data;
    }
};

export const useGetChannelGroups = (enabled: boolean) => {
    const currentApi = useApi();
    return useQuery({
        queryKey: ['User', currentApi.user?.Id, 'LiveTvChannelGroups'],
        queryFn: ({ signal }) => fetchChannelGroups(currentApi, { signal }),
        enabled: enabled && !!currentApi.api && !!currentApi.user?.Id
    });
};
