import { View, Text, ScrollView, Alert } from "react-native";
import React from "react";
import { Formik } from "formik";
import { useTheme } from "@react-navigation/native";

const FormTransporte = () => {
  const colorScheme = "light";
  const { colors } = useTheme();

  return (
    <ScrollView>
      <Formik
        initialValues={{
          confirmation: "",
          searchDate: "",
          ubicationSearch: "",
          ubicationGoTo: "",
          question: "",
          infoAditional: ""
        }}
        validate={values => {
          const errors = {};
          if (!values.confirmation) {
            errors.confirmation = "Completa el campo por favor";
          }
          if (!values.searchDate) {
            errors.searchDate = "Completa el campo por favor";
          }
          if (!values.ubicationSearch) {
            errors.ubicationSearch = "Completa el campo por favor";
          }
          if (!values.ubicationGoTo) {
            errors.ubicationGoTo = "Completa el campo por favor";
          }
          if (!values.question) {
            errors.question = "Completa el campo por favor";
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
                  <Text style={{ color: colors.text }} className="text-xl pb-1 font-bold">
                    Fecha que hay que buscar a la mascota
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
                      name="searchDate"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </View>
                  <Text className="text-red-600 font-bold">{errors.searchDate}</Text>
                </View>
                <View className="gap-y-1">
                  <Text style={{ color: colors.text }} className="text-xl pb-1 font-bold">
                    Donde hay que buscarlo?
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
                      name="ubicationSearch"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </View>
                  <Text className="text-red-600 font-bold">{errors.ubicationSearch}</Text>
                </View>
                <View className="gap-y-1">
                  <Text style={{ color: colors.text }} className="text-xl pb-1 font-bold">
                    Donde hay que llevarlo?
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
                      name="ubicationGoTo"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </View>
                  <Text className="text-red-600 font-bold">{errors.ubicationGoTo}</Text>
                </View>
                <View className="gap-y-1">
                  <Text style={{ color: colors.text }} className="text-xl mb-1 font-bold">
                    Hay que devolverlo al mismo lugar?
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

export default FormTransporte;
