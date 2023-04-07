import privateClient from "../client/private.client";

const reviewEndpoint = {
    listReviews: "reviews",
    addReview: "reviews",
    removeReview: ({reviewId}) => `reviews/${reviewId}`,
}


const reviewApi = {
    addReview: async ({mediaId, mediaType, mediaTitle, mediaPoster, content}) => {
        try {
            const response = await privateClient.post(
                reviewEndpoint.addReview,
                {mediaId, mediaType, mediaTitle, mediaPoster, content}
            );

            return {response};
        } catch (err) {
            return {
                err
            };
        }
    },
    listReviews: async () => {
        try {
            const response = await privateClient.get(
                reviewEndpoint.listReviews,
            );

            return {response};
        } catch (err) {
            return {
                err
            };
        }
    },

    removeReview: async ({reviewId}) => {
        try {
            const response = await privateClient.delete(
                reviewEndpoint.removeReview,
                { reviewId}
            );

            return {response};
        } catch (err) {
            return {
                err
            };
        }
    },
}

export default reviewApi;