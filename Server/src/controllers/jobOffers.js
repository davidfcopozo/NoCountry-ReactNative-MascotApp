const { JobOffer, User } = require("../db");
const { isValidNumber } = require("./../validations/index");

const getUserJobOffers = async (req, res) => {
  const { userId } = req.body;

  try {
    if (!userId) return res.status(400).json({ errorMessage: "UserId missing" });
    if (!isValidNumber(userId))
      return res.status(400).json({ errorMessage: "The userId type must be an integer" });

    const user = await User.findByPk(userId, { include: JobOffer });
    if (user === null)
      return res.status(404).json({ errorMessage: "There is no user with that id" });

    !user.dataValues.jobOffers.length
      ? res.status(404).json({
          errorMessage: `${user.dataValues.name} ${user.dataValues.surname} has no jobOffers to show`
        })
      : res.status(200).send(user.dataValues.jobOffers);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original ? error.original : error
    });
  }
};

const createJobOffer = async (req, res) => {
  const { name, description, price, img, categoryId, userId } = req.body;

  try {
    if (!name || !description || !price || !categoryId || !userId) {
      return res.status(400).json({ errorMessage: "Missing required fields", body: req.body });
    }

    let newJobOffer = await JobOffer.create({
      name,
      description,
      price,
      img,
      categoryId: categoryId,
      userId: userId
    });

    return res.status(201).json({ jobOffer: newJobOffer.dataValues });
  } catch (error) {
    return res.status(500).json({ error: error.original ? error.original : error });
  }
};

const updateJobOffer = async (req, res) => {
  const { name, description, price, img } = req.body;
  const { id } = req.params;

  try {
    await JobOffer.update(
      {
        name,
        description,
        price,
        img
      },
      {
        where: {
          id
        }
      }
    )
      .then(result => res.json(result))
      .catch(err => res.json(err));
  } catch (error) {
    return res.status(500).json({ errorMessage: error.original ? error.original : error });
  }
};

const deleteJobOffer = async (req, res) => {
  const { id } = req.params;
  try {
    await JobOffer.destroy({
      where: {
        id
      }
    });

    return res.status(204).json({ message: "Job Offer successfully deleted." });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.original ? error.original : error });
  }
};
module.exports = { getUserJobOffers, createJobOffer, updateJobOffer, deleteJobOffer };
