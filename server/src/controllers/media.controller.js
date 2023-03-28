import tmdbApi from "../tmdb/tmdb.api";
import responseHandler from "../handlers/response.handler.js"
import tokenMiddleware from "../middlewares/token.middleware";
import userModel from "../models/user.model";
import favoriteModel from "../models/favorite.model";
import reviewModel from "../models/review.model";

const getList = async (req, res) => {
    try {
        const {page} =  req.query;
        const {mediaType, mediaCategory} = req.params;

        const response = await tmdbApi.mediaList({mediaType, mediaCateogry, page});

        return responseHandler.ok(res, response);
    } catch {
        responseHandler.error(res);
    }
}

const getGenres = async (req, res) => {
    try  {
        const { mediaType} = req.params;

        const response = await tmdbApi.mediaGenres({mediaType});

        return responseHandler.ok(res, response);
    } catch {
        responseHandler.error(res);
    }
}


const search = async (req, res) => {
    try  {
        const { mediaType} = req.params;

        const {query, page} = req.query;

        const response = await tmdbApi.mediaSearch({mediaType: mediaType === "people" ? "person" : mediaType, query, page});

        return responseHandler.ok(res, response);
    } catch {
        responseHandler.error(res);
    }
}


const getDetail = async (req, res) => {
    try  {
        const { mediaType, mediaId} = req.params;
        const params = { mediaType, mediaId};
        const media = await tmdbApi.mediaDetail(params);
        media.credits = await tmdbApi.mediaCredits(params);
        const videos = await tmdbApi.mediaVideos(params);
        media.videos = videos;
        const recommend = await tmdbApi.mediaRecomend(params);
        media.recommend = recommend;


        media.images = await tmdbApi.mediaImages(params);

        const tokenDecoded = tokenMiddleware.tokenDecode(req);

        if(tokenDecoded) {
            const user = await userModel.findById(tokenDecoded.data);

            if(user) {
                const isFavorite = await favoriteModel.findOne({user:user.id, mediaId});
                media.isFavorite = isFavorite!==null;
            }
        }

        media.reviews = await reviewModel.find({mediaId}).populate("user").sort("-createdAt");
        return responseHandler.ok(res, media);

        return responseHandler.ok(res, response);
    } catch {
        responseHandler.error(res);
    }
}

export default {getList, getGenres, search, getDetail}