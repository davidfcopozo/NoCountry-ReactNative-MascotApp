import { View, Text } from "react-native";
import React from "react";
import { Formik } from "formik";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import axios from "axios";
import { useSelector } from "react-redux";

const FormEditProfile = () => {
  const colorScheme = "light";
  const { colors } = useTheme();
  const user = useSelector(state => state.users.currentUser);

  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState("");

  const uploadImage = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "Donde-Suena-Artists");
    setLoading(true);
    const res = await axios.post("https://api.cloudinary.com/v1_1/ds41xxspf/image/upload", data);
    res.data.secure_url ? setSuccess(true) : setSuccess(false);
    setImage(res.data.secure_url);
    setLoading(false);
  };

  return (
    <View>
      <Formik
        initialValues={{
          name: `${user.name} ${user.lastName}`,
          email: user.email,
          location: user.city,
          about: user.about,
          service: user.service,
          user_picture: user.user_picture
        }}
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = "Completa el campo por favor";
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid email address";
          } else if (!values.location) {
            errors.location = "Completa el campo por favor";
          } else if (!values.about) {
            errors.about = "Completa el campo por favor";
          } else if (!values.service) {
            errors.service = "Completa el campo por favor";
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
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
          /* and other goodies */
        }) => (
          <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
            <View className="p-5">
              <View className="flex items-center">
                {user.user_picture ? (
                  <View>
                    <Image
                      style={{
                        width: 100,
                        height: 100,
                        resizeMode: "contain"
                      }}
                      className="rounded-full"
                      source={{
                        uri: user.user_picture
                      }}
                    />
                  </View>
                ) : (
                  <View className="rounded-full bg-white flex items-center">
                    <Ionicons
                      name="person-circle-outline"
                      size={100}
                      fill={colorScheme === "dark" ? "#fff" : "#000"}
                    />
                  </View>
                )}
                <View className="flex justify-center items-center pt-3">
                  <input
                    style={{ color: colors.text }}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={uploadImage}
                    value={values.user_picture}
                  ></input>
                </View>
              </View>
              <View className="pt-4 pb-5 gap-y-2">
                <View className="gap-y-1">
                  <Text style={{ color: colors.text }} className="text-xl pb-1 font-bold">
                    Nombre
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
                      type="text"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                  </View>
                </View>
                <View className="gap-y-1">
                  <Text style={{ color: colors.text }} className="text-xl pb-1 font-bold">
                    Email
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
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                  </View>
                </View>
                <View className="gap-y-1">
                  <Text style={{ color: colors.text }} className="text-xl pb-1 font-bold">
                    Ubicación
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
                      name="location"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.location}
                    />
                  </View>
                </View>
                <View className="gap-y-1">
                  <Text style={{ color: colors.text }} className="text-xl mb-1 font-bold">
                    Sobre mi
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
                      name="about"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.about}
                    />
                  </View>
                </View>
                <View className="gap-y-1">
                  <Text style={{ color: colors.text }} className="text-xl font-bold">
                    Servicios
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
                      name="service"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.service}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View className="flex justify-center items-center">
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
    </View>
  );
};

export default FormEditProfile;
