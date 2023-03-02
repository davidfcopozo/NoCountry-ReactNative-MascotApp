const { Request, User } = require("../db");
const { isValidNumber } = require("../validations");

const getUserRequests = async (req, res) => {
  const { userId } = req.body;

  try {
    if (!userId || !isValidNumber(userId))
      return res
        .status(400)
        .json({ errorMessage: "The userId is required and must be an integer" });

    const user = await User.findByPk(userId);
    if (user === null)
      return res.status(404).json({ errorMessage: "There is no user with that id" });

    const requestList = await Request.findAll({
      where: {
        userId
      }
    });

    requestList.length ? res.status(200).json(requestList) : res.status(200).json([]);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original ? error.original : error
    });
  }
};

const createRequest = async (req, res) => {
  const { hired_user_id, categoryId, jobOfferId, userId } = req.body;

  try {
    if (!hired_user_id || !categoryId || !jobOfferId || !userId) {
      return res.status(400).json({ errorMessage: "Missing required fields" });
    }

    if (
      !isValidNumber(hired_user_id) ||
      !isValidNumber(categoryId) ||
      !isValidNumber(jobOfferId) ||
      !isValidNumber(userId)
    )
      return res.status(400).json({
        errorMessage: "All fields must be integer type"
      });

    const newRequest = await Request.create({
      hired_user_id,
      categoryId,
      jobOfferId,
      userId,
      date: Date.now(-3)
    });

    return res.status(201).json(newRequest.dataValues);
  } catch (error) {
    return res.status(500).json({ errorMessage: error.original ? error.original : error });
  }
};

module.exports = { getUserRequests, createRequest };
