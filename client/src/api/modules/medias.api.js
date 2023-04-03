import privateClient from "../client/private.client.js";
import publicClient from "../client/public.client.js";


const mediasEndpoint = {
    listMedias: ({mediaType, mediaCategory, page}) => `${mediaType}/${mediaCategory}?page=${page}`,
    detailMedia: ({mediaType, mediaId}) => `${mediaType}/detail/${mediaId}`,
    searchMedias:  ({mediaType, query, page}) => `${mediaType}/search?query=${query}&page=${page}`,
};

const mediasAPI = {
    listMedias: async ({mediaType, mediaCategory, page}) => {
        try {
            const response = await publicClient.get(
                mediasEndpoint.listMedias({mediaType, mediaCategory, page})
            );

            return {response};
        } catch (err) {
            return {
                err
            };
        }
    },
    detailMedia: async ({mediaType, mediaId}) => {
        try {
            const response = await publicClient.get(
                mediasEndpoint.detailMedia({mediaType, mediaId})
            );

            return {response};
        } catch (err) {
            return {
                err
            };
        }
    },
    searchMedias: async ({mediaType, query, page}) => {
        try {
            const response = await publicClient.get(
                mediasEndpoint.searchMedias({mediaType, query, page})
            );

            return {response};
        } catch (err) {
            return {
                err
            };
        }
    },
}

export default mediasAPI;