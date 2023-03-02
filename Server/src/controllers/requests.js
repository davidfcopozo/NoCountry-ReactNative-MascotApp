const { Request } = require("../db");

const createRequest = async (req, res) => {
  const { hired_user_id, categoryId, jobOfferId, userId } = req.body;

  try {
    if (!hired_user_id || !categoryId || !jobOfferId || !userId) {
      return res.status(400).json({ errorMessage: "Missing required fields", body: req.body });
    }

    const newRequest = await Request.create({
      hired_user_id,
      date: Date.now(-3),
      categoryId,
      jobOfferId,
      userId
    });

    return res.status(201).json({ request: newRequest.dataValues });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.original ? error.original : error });
  }
};

const getUserRequests = async (req, res) => {
  const { userId } = req.params;

  try {
    const requestList = await Request.findAll({
      where: {
        userId: userId
      }
    });

    return res.status(200).json(requestList);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original ? error.original : error
    });
  }
};

module.exports = { createRequest, getUserRequests };
