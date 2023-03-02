const { Review, User, Request, Auth } = require("../db");
const { isValidNumber, isValidString } = require("../validations");

const getUserReviews = async (req, res) => {
  const { userId } = req.body;

  try {
    if (!userId || !isValidNumber(userId))
      return res
        .status(400)
        .json({ errorMessage: "The userId is required and must be an integer" });

    const user = await User.findByPk(userId);
    if (user === null)
      return res.status(404).json({ errorMessage: "There is no user with that id" });

    const reviewList = await Review.findAll({
      where: {
        userId
      }
    });

    // Calcular el promedio de stars que se debe renderizar en el front

    const starsArray = reviewList.map(review => review.stars);
    const totalStars = starsArray.reduce((accumulator, currentValue) => accumulator + currentValue);
    const numberOfReviews = reviewList.length;
    const averageStars = totalStars / numberOfReviews;

    // Puedo mandarlo redondeado para simplificar
    // const averageRounded = Math.round(averageStars);

    reviewList.length
      ? res.status(200).json({ reviews: reviewList, averageStars })
      : res.status(200).json([]);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original ? error.original : error
    });
  }
};

const createReview = async (req, res) => {
  const { id } = req.params;
  const { reviewer_user_id, stars, description } = req.body;

  try {
    // Validaciones varias

    if (!isValidNumber(id))
      return res.status(400).json({ errorMessage: "The id type must be an integer" });

    if (!reviewer_user_id || !isValidNumber(reviewer_user_id))
      return res
        .status(400)
        .json({ errorMessage: "The rewiewer_user_id is required and must be an integer" });

    if (reviewer_user_id === parseInt(id))
      return res.status(400).json({ errorMessage: "A user cannot be self-reviewed" });

    if (!stars || !isValidNumber(stars) || stars < 1 || stars > 5)
      return res.status(400).json({
        errorMessage: "The stars are required and must be an integer between 1 and 5 included"
      });

    if (description && !isValidString(description))
      return res.status(400).json({ errorMessage: "Description field must be string type" });

    // Los usuarios (tanto el reseñador como el reseñado) deben existir y estar autenticados

    // const userReviewed = await User.findByPk(id, { include: Auth });
    // const userReviewer = await User.findByPk(reviewer_user_id, { include: Auth });

    // if (!userReviewed || userReviewed?.dataValues.authId === null)
    //   return res.status(404).json({
    //     errorMessage: "The user you are trying to review does not exist or is not authenticated"
    //   });

    // if (!userReviewer || userReviewer?.dataValues.authId === null)
    //   return res.status(404).json({
    //     errorMessage:
    //       "The user that is trying to give the review does not exist or is not authenticated"
    //   });

    // Para dejar su reseña, el reseñador debe haber contratado previamente al reseñado

    // const userRequested = await Request.findOne({
    //   where: {
    //     hired_user_id: id,
    //     userId: reviewer_user_id
    //   }
    // });

    // if (!userRequested)
    //   return res.status(404).json({
    //     errorMessage: "The user that is trying to give the review has not hired the other user yet"
    //   });

    // Si todo va bien, y el proceso pasa todas las validaciones y chequeos de arriba, se emite finalmente la reseña

    const newReview = await Review.create({
      reviewer_user_id,
      description,
      stars,
      userId: id
    });

    return res.status(201).json(newReview.dataValues);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original ? error.original : error
    });
  }
};

module.exports = { getUserReviews, createReview };
