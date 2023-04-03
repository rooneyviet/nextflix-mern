import express from "express"
import { body } from "express-validator";
import reviewController from "../controllers/review.controller.js"
import tokenMiddleware from "../middlewares/token.middleware.js";
import requestHandler from "../handlers/request.handler.js";

const router = express.Router({mergeParams: true});

router.get(
    "/",
    tokenMiddleware.auth,
    reviewController.getReviewOfUser
    );

router.post(
    "/",
    tokenMiddleware.auth,
    body("mediaId")
      .exists().withMessage("mediaId is required")
      .isLength({ min: 1 }).withMessage("mediaId can not be empty"),
    body("content")
      .exists().withMessage("content is required")
      .isLength({ min: 1 }).withMessage("content can not be empty"),
    body("mediatype")
        .exists().withMessage("mediatype is required")
        .custom(type=> ["movie", "tv"].includes(type)).withMessage("mediatype invalid"),
    body("mediaTitle")
        .exists().withMessage("mediaTitle is required"),
    body("mediaPoster")
        .exists().withMessage("mediaPoster is required"),
    body("mediaRate")
        .exists().withMessage("mediaRate is required"),
    requestHandler.validate,
    reviewController.createReview
);

router.delete(
    "/",
    tokenMiddleware.auth,
    reviewController.removeReview
)
export default router;