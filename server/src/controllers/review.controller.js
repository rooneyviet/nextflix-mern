import responseHandler from "../handlers/response.handler.js";
import reviewModel from "../models/review.model.js";

const createReview  =async (req, res) => {
    try {
        const {movieId} = req.params;

        const review = new reviewModel(
            {
                user: req.user.id,
                movieId,
                ...req.body
            }
        )

        await review.save();

        responseHandler.ok(res, {
            ...review._doc,
            id: review.id,
            user: req.user
        });
    } catch {
        responseHandler.error(res);
    }
};


const removeReview  =async (req, res) => {
    try {
        const {reviewId} = req.params;

        const reviewSomething = await reviewModel.findOne({
            _id: reviewId,
            user: req.user.id
        })

        if(!reviewSomething) return responseHandler.notfound(res);
        if(reviewSomething) console.log("found1");

        //await review.remove();
        await reviewSomething.deleteOne();

         responseHandler.ok(res);
    } catch(err) {
        console.log(err);
        responseHandler.error(res);
    }
};


const getReviewOfUser  =async (req, res) => {
    try {
        
        const reviews = await reviewModel.find({
            user: req.user.id
        }).sort("-createdAt");


        responseHandler.ok(res, reviews);
    } catch(err) {
        console.log(err);
        responseHandler.error(res);
    }
};

export default { createReview, removeReview, getReviewOfUser}
