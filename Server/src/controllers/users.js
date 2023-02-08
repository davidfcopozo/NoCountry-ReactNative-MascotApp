const axios = require("axios").default;
const {User, Auth} = require('../db.js');

const getUsersBestRating = async (req, res, next) => {
  try {
    const { data } = await axios.get("https://apimocha.com/mascot-app/users");
    const usersWithRating = data.filter(user => user.rating !== null);
    usersWithRating.sort((a, b) => b.rating - a.rating);
    res.status(200).json(usersWithRating);
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const userList = await User.findAll();
    res.json(userList);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}


const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, age, city, offers_services, description, profile_pic } = req.body;

    await User.update(
      {
          name,
          surname,
          age,
          city,
          offers_services,
          description,
          profile_pic
      },
      {
        where: {
          id
        }
      }
    ).then(result => 
      res.json(result)
    ).catch(err => 
      res.json(err)
    )

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Necesita Cambios - solo se uso para testear editar perfil */

const addUser = async (req, res) => {
  const { name, surname, age, city, offers_services, description, rating, profile_pic, email, password, isGoogle } = req.body;

  try {

    let auth = await Auth.create(
      {
        email,
        password,
        isGoogle
      }
    )

    let newUser = await User.create(
      {
        name,
        surname,
        age,
        city,
        offers_services,
        description,
        rating,
        profile_pic,
        auth_id: auth.id
      },
    );

    return res.json(newUser);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

/* Funcion de prueba */

const deleteProfile = async (req, res) => {
  const { id } = req.params;
  try {
    await Auth.destroy({
      where: {
        id
      }
    })

    await User.destroy({
      where: {
        id
      }
    });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


module.exports = { getUsersBestRating, getUsers, addUser, updateProfile, deleteProfile };
