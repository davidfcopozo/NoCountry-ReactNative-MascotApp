const admin = require("../../firebase");

async function decodeToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodeValue = await admin.auth().verifyIdToken(token);

    // Si se verifica el token del currentUser, se lo deja pasar a la ruta a través del next
    if (decodeValue) {
      console.log(decodeValue);
      return next();
    }

    // Caso contrario, se le envía un mensaje informándole que no tiene acceso
    return res.status(401).json({ errorMessage: "Unauthorized" });
  } catch (error) {
    return res.status(500).json({ errorMessage: "Internal Server Error" });
  }
}

module.exports = decodeToken;

/* 

PARA ENTENDER LA LÍNEA 5
(Lo que se haría en el front al llamar rutas del back)

If you are working with

import auth from '@react-native-firebase/auth';
then you can access the token with

const token = await response.user.getIdToken();
console.log('TokenID', token);
and after that, you can use it into

const response = await httpClient.get(url, { headers: { 'Authorization': "Bearer $token" } });

*/
