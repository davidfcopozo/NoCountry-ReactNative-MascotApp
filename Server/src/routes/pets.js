const { Router } = require("express");
const { getUserPets, getPetById, addPet, updatePet, deletePet } = require("../controllers/pets");

const router = Router();

router.get("/", getUserPets);
router.get("/:id", getPetById);
router.post("/add", addPet);
router.patch("/:id", updatePet);
router.delete("/:id", deletePet);

module.exports = router;
