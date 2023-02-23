import { View, Text, ScrollView, Alert } from "react-native";
import React from "react";
import { Formik } from "formik";
import { useTheme } from "@react-navigation/native";

const FormPaseador = () => {
  const colorScheme = "light";
  const { colors } = useTheme();

  return (
    <ScrollView>
      <Formik
        initialValues={{
          petType: "",
          razaType: "",
          size: "",
          age: "",
          weight: "",
          confirmation: "",
          cantWalksDay: 0,
          cantDaysWalk: 0,
          startDate: "",
          ubicationService: "",
          infoAditional: ""
        }}
        validate={values => {
          const errors = {};
          if (!values.petType) {
            errors.petType = "Completa el campo por favor";
          }
          if (!values.razaType) {
            errors.razaType = "Completa el campo por favor";
          }
          if (!values.size) {
            errors.size = "Completa el campo por favor";
          }
          if (!values.age) {
            errors.age = "Completa el campo por favor";
          }
          if (!values.weight) {
            errors.weight = "Completa el campo por favor";
          }
          if (!values.confirmation) {
            errors.confirmation = "Completa el campo por favor";
          }
          if (!values.cantWalksDay) {
            errors.cantWalksDay = "Completa el campo por favor";
          }
          if (!values.cantDaysWalk) {
            errors.cantDaysWalk = "Completa el campo por favor";
          }
          if (!values.startDate) {
            errors.startDate = "Completa el campo por favor";
          }
          if (!values.ubicationService) {
            errors.ubicationService = "Completa el campo por favor";
          }
          if (!values.infoAditional) {
            errors.infoAditional = "Completa el campo por favor";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          handleBlur,

          isSubmitting
        }) => (
          <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
            <View className="p-5">
              <View className="pb-5 gap-y-2">
                <View className="gap-y-1">
                  <Text style={{ color: colors.text }} className="text-xl pb-1 font-bold">
                    Tipo de mascota
                  </Text>
                  <View className="">
                    <select
                      style={{
                        height: "30px",
                        fontSize: 17,
                        border: "0.5px solid",
                        paddingLeft: "10px",
                        borderRadius: "6px"
                      }}
                      defaultValue="default"
                      name="petType"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="default">Seleccionar</option>
                      <option>Perro</option>
                      <option>Gato</option>
                      <option>Pez</option>
                      <option>Pajaro</option>
                      <option>Hamster</option>
                    </select>
                  </View>
                  <Text className="text-red-600 font-bold">{errors.petType}</Text>
                </View>
                <View className="gap-y-1">
                  <Text style={{ color: colors.text }} className="text-xl pb-1 font-bold">
                    Raza
                  </Text>
                  <View className="">
                    <select
                      style={{
                        height: "30px",
                        fontSize: 17,
                        border: "0.5px solid",
                        paddingLeft: "10px",
                        borderRadius: "6px"
                      }}
                      defaultValue="default"
                      name="razaType"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="default">Seleccionar</option>
                      <option>Labrador</option>
                      <option>Caniche</option>
                      <option>Bulldog</option>
                    </select>
                  </View>
                  <Text className="text-red-600 font-bold">{errors.razaType}</Text>
                </View>
                <View className="gap-y-1">
                  <Text style={{ color: colors.text }} className="text-xl pb-1 font-bold">
                    Tamaño de la mascota
                  </Text>
                  <View className="">
                    <select
                      style={{
                        height: "30px",
                        fontSize: 17,
                        border: "0.5px solid",
                        paddingLeft: "10px",
                        borderRadius: "6px"
                      }}
                      defaultValue="default"
                      name="size"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="default">Seleccionar</option>
                      <option>Pequeño</option>
                      <option>Mediano</option>
                      <option>Grande</option>
                    </select>
                  </View>
                  <Text className="text-red-600 font-bold">{errors.size}</Text>
                </View>
                <View className="gap-y-1">
                  <Text style={{ color: colors.text }} className="text-xl mb-1 font-bold">
                    Edad
                  </Text>
                  <View className="">
                    <input
                      style={{
                        height: "30px",
                        fontSize: 17,
                        border: "0.5px solid",
                        paddingLeft: "10px",
                        borderRadius: "6px"
                      }}
                      type="number"
                      name="age"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </View>
                  <Text className="text-red-600 font-bold">{errors.age}</Text>
                </View>
                <View className="gap-y-1">
                  <Text style={{ color: colors.text }} className="text-xl font-bold">
                    Peso
                  </Text>
                  <View className="">
                    <input
                      style={{
                        height: "30px",
                        fontSize: 17,
                        border: "0.5px solid",
                        paddingLeft: "10px",
                        borderRadius: "6px"
                      }}
                      type="number"
                      name="weight"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </View>
                  <Text className="text-red-600 font-bold">{errors.weight}</Text>
                </View>
                <View className="gap-y-1">
                  <Text style={{ color: colors.text }} className="text-xl mb-1 font-bold">
                    Confirmar mascota
                  </Text>
                  <View className="">
                    <select
                      style={{
                        height: "30px",
                        fontSize: 17,
                        border: "0.5px solid",
                        paddingLeft: "10px",
                        borderRadius: "6px"
                      }}
                      defaultValue="default"
                      name="confirmation"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="default">Seleccionar</option>
                      <option>Si</option>
                      <option>No</option>
                    </select>
                  </View>
                  <Text className="text-red-600 font-bold">{errors.confirmation}</Text>
                </View>
                <View className="gap-y-1">
                  <Text style={{ color: colors.text }} className="text-xl mb-1 font-bold">
                    Cantidad de caminatas por dia
                  </Text>
                  <View className="">
                    <input
                      style={{
                        height: "30px",
                        fontSize: 17,
                        border: "0.5px solid",
                        paddingLeft: "10px",
                        borderRadius: "6px"
                      }}
                      type="number"
                      name="cantWalksDay"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </View>
                  <Text className="text-red-600 font-bold">{errors.cantWalksDay}</Text>
                </View>
                <View className="gap-y-1">
                  <Text style={{ color: colors.text }} className="text-xl mb-1 font-bold">
                    Cantidad de dias que requiere caminar
                  </Text>
                  <View className="">
                    <input
                      style={{
                        height: "30px",
                        fontSize: 17,
                        border: "0.5px solid",
                        paddingLeft: "10px",
                        borderRadius: "6px"
                      }}
                      type="number"
                      name="cantDaysWalk"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </View>
                  <Text className="text-red-600 font-bold">{errors.cantDaysWalk}</Text>
                </View>
                <View className="gap-y-1">
                  <Text style={{ color: colors.text }} className="text-xl mb-1 font-bold">
                    Fecha de inicio
                  </Text>
                  <View className="">
                    <input
                      style={{
                        height: "30px",
                        fontSize: 17,
                        border: "0.5px solid",
                        paddingLeft: "10px",
                        borderRadius: "6px"
                      }}
                      type="date"
                      name="startDate"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </View>
                  <Text className="text-red-600 font-bold">{errors.startDate}</Text>
                </View>
                <View className="gap-y-1">
                  <Text style={{ color: colors.text }} className="text-xl mb-1 font-bold">
                    Donde necesita el servicio
                  </Text>
                  <View className="">
                    <input
                      style={{
                        height: "30px",
                        fontSize: 17,
                        border: "0.5px solid",
                        paddingLeft: "10px",
                        borderRadius: "6px"
                      }}
                      type="text"
                      name="ubicationService"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </View>
                  <Text className="text-red-600 font-bold">{errors.ubicationService}</Text>
                </View>
                <View className="gap-y-1">
                  <Text style={{ color: colors.text }} className="text-xl font-bold">
                    Informacion adicional
                  </Text>

                  <View className="">
                    <textarea
                      style={{
                        height: "100px",
                        fontSize: 17,
                        border: "0.5px solid",
                        paddingLeft: "10px",
                        borderRadius: "6px"
                      }}
                      type="text"
                      name="infoAditional"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </View>
                  <Text className="text-red-600 font-bold">{errors.infoAditional}</Text>
                </View>
              </View>
            </View>

            <View className="flex justify-center items-center pb-7">
              <button
                style={{
                  padding: 10,
                  fontSize: 20,
                  width: "300px",
                  backgroundColor: "#7f4dff",
                  border: "none",
                  borderRadius: "10px"
                }}
                type="submit"
                disabled={isSubmitting}
              >
                <Text className="text-white text-xl">Enviar</Text>
              </button>
            </View>
          </form>
        )}
      </Formik>
    </ScrollView>
  );
};

export default FormPaseador;
