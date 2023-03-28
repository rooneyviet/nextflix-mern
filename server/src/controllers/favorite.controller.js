import responseHandler from "../handlers/response.handler";
import favoriteModel from "../models/favorite.model";

const addFavorite = async (req, res) => {
    try{
        const isFavorite = await favoriteModel.findOne({user: req.user.id,
        mediaId: req.body.mediaId
        })

        if(isFavorite) return responseHandler.ok(res, isFavorite );

        const favorite = favoriteModel({
            ...req.body,
            user: req.user.id
        });

        await favorite.save();

        responseHandler.created(res, favorite);

    
    } catch {
        responseHandler.error(res);
    }
};


const removeFavorite = async (req, res) => {
    try {
        const { favoriteId} = req.params;

        const favorite = favoriteModel.findOne(
            {
                user: req.user.id,
                _id: favoriteId
            }
        )

        if(!favorite) return responseHandler.notfound(res);

        await favorite.remove();

        responseHandler.ok(res);
    } catch {
        responseHandler.error(res);
    }
}

const getFavoriteOfUser = async (req, res) => {
    try {
        const favorites = await favoriteModel.find({user: req.user.id}).sort("-createdAt");

        responseHandler.ok(res, favorites);
    } catch {
        responseHandler.error(res);
    }
}

export default {
    addFavorite, removeFavorite, getFavoriteOfUser
}