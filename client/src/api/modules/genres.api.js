import publicClient from "../client/public.client";

const genresEndpoint = {
    listGenres: ({mediaType}) => `${mediaType}/genres`,
};

const genresAPI = {
    listGenres: async ({personId}) => {
        try {
            const response = await publicClient.get(
                genresEndpoint.listGenres({personId})
            );

            return {response};
        } catch (err) {
            return {
                err
            };
        }
    },
};

export default genresAPI;