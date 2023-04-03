import publicClient from "../client/public.client";

const genresEndpoint = {
    listGenres: ({mediaType}) => `${mediaType}/genres`
};

const genresAPI = {
    listGenres: async ({mediaType}) => {
        try {
            const response = await publicClient.get(
                genresEndpoint.listGenres({mediaType})
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