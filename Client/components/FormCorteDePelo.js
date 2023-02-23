import { View, Text, ScrollView, Alert } from "react-native";
import React from "react";
import { Formik } from "formik";
import { useTheme } from "@react-navigation/native";

const FormCorteDePelo = () => {
  const colorScheme = "light";
  const { colors } = useTheme();

  return (
    <ScrollView>
      <Formik
        initialValues={{
          startDate: "",
          serviceType: "",
          cantSessions: 0,
          horarioSessions: "",
          infoAditional: "",
          question: ""
        }}
        validate={values => {
          const errors = {};
          if (!values.startDate) {
            errors.startDate = "Completa el campo por favor";
          }
          if (!values.serviceType) {
            errors.serviceType = "Completa el campo por favor";
          }
          if (!values.cantSessions) {
            errors.cantSessions = "Completa el campo por favor";
          }
          if (!values.horarioSessions) {
            errors.horarioSessions = "Completa el campo por favor";
          }
          if (!values.infoAditional) {
            errors.infoAditional = "Completa el campo por favor";
          }
          if (!values.question) {
            errors.question = "Completa el campo por favor";
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
          /* and other goodies */
        }) => (
          <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
            <View className="p-5">
              <View className="pb-5 gap-y-2">
                <View className="gap-y-1">
                  <Text style={{ color: colors.text }} className="text-xl pb-1 font-bold">
                    Fecha de inicio
                  </Text>
                  <View>
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
                  <Text style={{ color: colors.text }} className="text-xl pb-1 font-bold">
                    Tipo de servicio
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
                      name="serviceType"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="default">Seleccionar</option>
                      <option>Basico</option>
                      <option>Full</option>
                      <option>Afeitado</option>
                    </select>
                  </View>
                  <Text className="text-red-600 font-bold">{errors.serviceType}</Text>
                </View>
                <View className="gap-y-1">
                  <Text style={{ color: colors.text }} className="text-xl pb-1 font-bold">
                    Cantidad de sesiones
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
                      name="cantSessions"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </View>
                  <Text className="text-red-600 font-bold">{errors.cantSessions}</Text>
                </View>
                <View className="gap-y-1">
                  <Text style={{ color: colors.text }} className="text-xl mb-1 font-bold">
                    Horario de sesiones
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
                      type="time"
                      name="horarioSessions"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </View>
                  <Text className="text-red-600 font-bold">{errors.horarioSessions}</Text>
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
                <View className="gap-y-1">
                  <Text style={{ color: colors.text }} className="text-xl mb-1 font-bold">
                    Necesita que pasen a buscar a la mascota?
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
                      name="question"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="default">Seleccionar</option>
                      <option>Si</option>
                      <option>No</option>
                    </select>
                  </View>
                  <Text className="text-red-600 font-bold">{errors.question}</Text>
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

export default FormCorteDePelo;
