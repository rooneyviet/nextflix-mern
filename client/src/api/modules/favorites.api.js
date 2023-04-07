import privateClient from "../client/private.client"

const favoriteEndpoint = {
    listFavorites: "user/favorites",
    addFavorite: "user/favorites",
    removeFavorite: ({favoriteId}) => `user/favorites/${favoriteId}`,
}

const favoritesAPI = {
    listFavorites: async () => {
        try {
            const response = await privateClient.get(
                favoriteEndpoint.listFavorites
            );

            console.log('response ' +response);

            return {response};
        } catch (err) {
            console.log(err);
            return {
                err
            };
        }
    },
    addFavorite: async ({mediaId, mediaType, mediaTitle, mediaPoster, mediaRate}) => {
        try {
            const response = await privateClient.post(
                favoriteEndpoint.addFavorite,
                {mediaId, mediaType, mediaTitle, mediaPoster, mediaRate}
            );

            return {response};
        } catch (err) {
            return {
                err
            };
        }
    },
    removeFavorite: async ({favoriteId}) => {
        try {
            const response = await privateClient.delete(
                favoriteEndpoint.removeFavorite({favoriteId})
            );

            return {response};
        } catch (err) {
            return {
                err
            };
        }
    },
    
}

export default favoritesAPI;