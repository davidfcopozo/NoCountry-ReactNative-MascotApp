import { View, Text, ScrollView, TextInput, TouchableOpacity, Keyboard, Image } from "react-native";
import React from "react";
import { useTheme, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { updateUser } from "../redux/actions";
import * as ImagePicker from "expo-image-picker";

const FormEditProfile = () => {
  const colorScheme = "light";
  const { colors } = useTheme();
  const { currentUser } = useSelector(state => state.users);
  const user = currentUser?.data;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("Actualizar");

  const [formData, setFormData] = useState({
    name: user ? user.name : null,
    surname: user ? user.surname : null,
    city: user ? user.city : null,
    description: user ? user.description : null,
    services: [],
    pets: []
  });
  console.log(currentUser);

  const cloudinaryUpload = async () => {
    const data = new FormData();
    data.append("file", {
      uri: image,
      type: "image/*",
      name: "filename"
    });
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "ddlvn2tkf");
    const res = await fetch("https://api.cloudinary.com/v1_1/ddlvn2tkf/image/upload", {
      method: "post",
      body: data
    })
      .then(res => res.json())
      .then(data => {
        return data.secure_url;
      })
      .catch(err => {
        Alert.alert("An Error Occured While Uploading");
      });
    return res;
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [10, 10],
      quality: 1
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleChange = name => {
    if (name) {
      return val => {
        setFormData({ ...formData, [name]: val });
      };
    }
  };

  const handleSubmit = async () => {
    console.log("actualizando perfil");
    Keyboard.dismiss();

    const res = await cloudinaryUpload();

    dispatch(
      updateUser({
        formData,
        profile_pic: res,
        id: user?.id
      })
    );

    navigation.goBack();
  };

  return (
    <ScrollView>
      <View className="p-5 mx-auto max-w-2xl w-full">
        <View>
          <View>
            <View className="flex items-center mb-3">
              {image ? (
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    resizeMode: "cover"
                  }}
                  className="rounded-full"
                  source={{
                    uri: image
                  }}
                />
              ) : user.profile_pic ? (
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    resizeMode: "cover"
                  }}
                  className="rounded-full"
                  source={{
                    uri: user.profile_pic
                  }}
                />
              ) : (
                <View className="rounded-full bg-white flex items-center">
                  <Ionicons
                    name="person-circle-outline"
                    size={100}
                    fill={colorScheme === "dark" ? "#fff" : "#000"}
                  />
                </View>
              )}
            </View>
            <View
              className="flex justify-center items-center mb-5"
              style={{ color: colors.text, borderColor: colors.text }}
            >
              <TouchableOpacity
                className="bg-violet-700 py-2.5 px-6 rounded-lg"
                onPress={pickImage}
              >
                <Text className="text-white font-bold">Subir foto</Text>
              </TouchableOpacity>
            </View>

            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg font-bold">
                Nombre
              </Text>
              <View
                style={{ color: colors.text, borderColor: colors.text }}
                className="border rounded-lg"
              >
                <TextInput
                  className="p-2"
                  style={{ color: colors.text, borderColor: colors.text }}
                  onChangeText={handleChange("name")}
                  value={formData.name}
                />
              </View>
            </View>

            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg font-bold">
                Apellido
              </Text>
              <View
                style={{ color: colors.text, borderColor: colors.text }}
                className="border rounded-lg"
              >
                <TextInput
                  className="p-2"
                  style={{ color: colors.text, borderColor: colors.text }}
                  onChangeText={handleChange("surname")}
                  value={formData.surname}
                />
              </View>
            </View>

            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg font-bold">
                Ubicación
              </Text>
              <View
                style={{ color: colors.text, borderColor: colors.text }}
                className="border rounded-lg"
              >
                <TextInput
                  className="p-2"
                  style={{ color: colors.text, borderColor: colors.text }}
                  onChangeText={handleChange("city")}
                  value={formData.city}
                />
              </View>
            </View>

            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg font-bold">
                Sobre mi
              </Text>
              <View
                style={{ color: colors.text, borderColor: colors.text }}
                className="border rounded-lg"
              >
                <TextInput
                  className="p-2"
                  style={{ color: colors.text, borderColor: colors.text }}
                  onChangeText={handleChange("description")}
                  value={formData.description}
                />
              </View>
            </View>

            {/*             <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg font-bold">
                Servicios
              </Text>
              <View style={{ color: colors.text, borderColor: colors.text }}>
                {user.offers_services ? (
                  <Text
                    className="text-base"
                    style={{ color: colors.text, borderColor: colors.text }}
                  >
                    SI ofreces servicios
                  </Text>
                ) : (
                  <Text
                    className="text-base"
                    style={{ color: colors.text, borderColor: colors.text }}
                  >
                    No ofreces servicios
                  </Text>
                )}
              </View>
            </View>

            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg font-bold">
                Mascotas
              </Text>
              <View style={{ color: colors.text, borderColor: colors.text }}>
                {user.offers_services ? (
                  <Text
                    className="text-base"
                    style={{ color: colors.text, borderColor: colors.text }}
                  >
                    Si tiene mascota
                  </Text>
                ) : (
                  <Text
                    className="text-base"
                    style={{ color: colors.text, borderColor: colors.text }}
                  >
                    No tenes mascota
                  </Text>
                )}
              </View>
            </View> */}
          </View>
        </View>

        <View className="flex justify-center items-center">
          <TouchableOpacity
            className="bg-violet-700 py-2 px-6 rounded-lg"
            onPress={() => {
              handleSubmit(), setMessage("Guardando..");
            }}
          >
            <Text className="text-lg text-white font-bold">{message}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default FormEditProfile;
