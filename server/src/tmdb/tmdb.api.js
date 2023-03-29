import axiosClient from "../axios/axios.client.js";
import tmdbEndpoints from "./tmdb.endpoint.js";

const tmdbApi = {
    mediaList : async ({mediaType, mediaCateogry, page})  => 
        await axiosClient.get(tmdbEndpoints.mediaList({mediaType, mediaCateogry, page})
    ),
    mediaDetail : async ({mediaType, page})  => 
        await axiosClient.get(tmdbEndpoints.mediaDetail({mediaType, page})
    ),
    mediaGenres : async ({mediaType})  => await axiosClient.get(tmdbEndpoints.mediaGeners({mediaType})),
    mediaCredits : async ({mediaType, mediaId})  => await axiosClient.get(tmdbEndpoints.mediaCredits({mediaType, mediaId})),
    mediaVideos : async ({mediaType, mediaId})  => await axiosClient.get(tmdbEndpoints.mediaVideos({mediaType, mediaId})),
    mediaImages : async ({mediaType, mediaId})  => await axiosClient.get(tmdbEndpoints.mediaImages({mediaType, mediaId})),
    mediaRecomend : async ({mediaType, mediaId})  => await axiosClient.get(tmdbEndpoints.mediaRecommend({mediaType, mediaId})),
    mediaSearch : async ({mediaType, query, page})  => await axiosClient.get(tmdbEndpoints.mediaSearch({mediaType, query, page})),
    //mediaSearch : async ({mediaType, query, page})  => axiosClient.get(tmdbEndpoints.mediaSearch({mediaType, query, page})),
    personDetail : async ({personId})  => await axiosClient.get(tmdbEndpoints.personDetail({personId})),
    personMedias : async ({personId})  => await axiosClient.get(tmdbEndpoints.personMedias({personId})),
};

export default tmdbApi;