const { JobOffer, User, Category } = require("../db");
const { isValidNumber, isValidString } = require("./../validations/index");

const getUserJobOffers = async (req, res) => {
  const { userId } = req.body;

  try {
    if (!userId) return res.status(400).json({ errorMessage: "UserId missing" });
    if (!isValidNumber(userId))
      return res.status(400).json({ errorMessage: "The userId must be an integer" });

    const user = await User.findByPk(userId, { include: JobOffer });
    if (user === null)
      return res.status(404).json({ errorMessage: "There is no user with that id" });

    !user.dataValues.jobOffers.length
      ? res.status(404).json({
          errorMessage: `${user.dataValues.name} ${user.dataValues.surname} has no jobOffers to show`
        })
      : res.status(200).json(user.dataValues.jobOffers);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original ? error.original : error
    });
  }
};

const createJobOffer = async (req, res) => {
  const { name, description, price, img, categoryId, userId } = req.body;

  try {
    // Validaciones varias
    if (!name || !description || !price || !categoryId || !userId) {
      return res.status(400).json({ errorMessage: "Missing required fields", body: req.body });
    }

    if (!isValidString(name) || !isValidString(description))
      return res.status(400).json({
        errorMessage: "Name and description fields must be string type"
      });

    if (!isValidNumber(price) || !isValidNumber(categoryId) || !isValidNumber(userId))
      return res.status(400).json({
        errorMessage: "Price, categoryId and userId fields must be integers"
      });

    if (img && !isValidString(img))
      return res.status(400).json({
        errorMessage: "The img must be a string"
      });

    const category = await Category.findByPk(categoryId);
    if (category === null)
      return res.status(404).json({ errorMessage: "There is no category with that id" });

    const user = await User.findByPk(userId);
    if (user === null)
      return res.status(404).json({ errorMessage: "There is no user with that id" });

    // Averiguo si el usuario ya tiene una jobOffer brindando la misma categoría (servicio)
    const userJobOfferWithCategory = await User.findOne({
      where: {
        id: userId
      },
      include: {
        model: JobOffer,
        where: {
          categoryId
        }
      }
    });

    // Si no la tiene, la creo
    if (userJobOfferWithCategory === null) {
      const newJobOffer = await JobOffer.create({
        name,
        description,
        price,
        img,
        categoryId,
        userId
      });

      // Como el usuario se ha creado una jobOffer, seteo su propiedad offers_services en true
      await user.update({ offers_services: true });

      return res.status(201).json(newJobOffer.dataValues);
    }

    // Si efectivamente la tiene, mando mensaje de error
    return res
      .status(400)
      .json({ errorMessage: "The user has already a jobOffer with that categoryId" });
  } catch (error) {
    return res.status(500).json({ error: error.original ? error.original : error });
  }
};

const updateJobOffer = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, img } = req.body;

  try {
    if (!isValidNumber(id))
      return res.status(400).json({ errorMessage: "The id type must be an integer" });

    if (!name && !description && !price && !img)
      return res.status(400).json({
        errorMessage: "There is nothing to update. Please, change a field first"
      });

    if ((name && !isValidString(name)) || (description && !isValidString(description)))
      return res.status(400).json({
        errorMessage: "Name and description fields must be string type"
      });

    if (price && !isValidNumber(price))
      return res.status(400).json({
        errorMessage: "The price must be an integer"
      });

    if (img && !isValidString(img))
      return res.status(400).json({
        errorMessage: "The img must be a string"
      });

    const jobOffer = await JobOffer.findByPk(id);
    if (jobOffer === null)
      return res.status(404).json({ errorMessage: "There is no jobOffer with that id" });

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
    );

    return res.status(200).json({ message: "The jobOffer has been updated successfully" });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.original ? error.original : error });
  }
};

const deleteJobOffer = async (req, res) => {
  const { id } = req.params;

  try {
    if (!isValidNumber(id))
      return res.status(400).json({ errorMessage: "The id type must be an integer" });

    const jobOffer = await JobOffer.findByPk(id);
    if (jobOffer === null)
      return res.status(404).json({ errorMessage: "There is no jobOffer with that id" });

    await JobOffer.destroy({
      where: {
        id
      }
    });

    return res.status(200).json({ message: "The jobOffer has been deleted successfully" });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.original ? error.original : error });
  }
};

module.exports = { getUserJobOffers, createJobOffer, updateJobOffer, deleteJobOffer };
