const { Router } = require("express");
const { getUserPets, getPetInfo, addPet, updatePet, deletePet } = require("../controllers/pets");

const router = Router();

router.get("/", getUserPets);
router.get("/:id", getPetInfo);
router.post("/add", addPet);
router.patch("/:id/update", updatePet);
router.delete("/:id/delete", deletePet);

module.exports = router;
