const { JobOffer } = require("../db");

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
module.exports = { createJobOffer, updateJobOffer, deleteJobOffer };
