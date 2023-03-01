import { View, Text, ScrollView, TextInput, TouchableOpacity, Keyboard, Image } from "react-native";
import React from "react";
import { useTheme, useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import { fetchPetTypes } from "../redux/actions";
import LoadingGif from "../components/LoadingGif";
import { addNewPet } from "../redux/actions";

const FormAddPet = () => {
  const { colors } = useTheme();
  const [imagePet, setImagePet] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { petTypes } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchPetTypes());
    // console.log(petTypes);
  }, []);

  const [formData, setFormData] = useState({
    typePet: "",
    name: "",
    breed: "",
    age: "",
    weight: ""
  });

  const [valid, setValid] = useState({
    typePet: false,
    name: false,
    breed: false,
    age: false,
    weight: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = name => {
    if (name) {
      return val => {
        setFormData({ ...formData, [name]: val });
        setValid({ ...valid, [name]: true });
      };
    } else setValid({ ...valid, [name]: false });
  };

  const handleSelect = name => {
    setFormData({ ...formData, typePet: name });
    setValid({ ...valid, typePet: true });
    name === "perro"
      ? setImagePet("https://cdn-icons-png.flaticon.com/128/1998/1998627.png")
      : name === "gato"
      ? setImagePet("https://cdn-icons-png.flaticon.com/128/1998/1998592.png")
      : name === "pez"
      ? setImagePet("https://cdn-icons-png.flaticon.com/128/874/874960.png")
      : name === "pájaro"
      ? setImagePet("https://cdn-icons-png.flaticon.com/128/404/404013.png")
      : name === "hámster"
      ? setImagePet("https://cdn-icons-png.flaticon.com/128/6807/6807896.png")
      : setImagePet(
          "https://img.freepik.com/vector-gratis/coleccion-diferentes-caras-perros_1096-37.jpg"
        );
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  const handleValidation = async () => {
    Keyboard.dismiss();
    console.log(formData);

    if (!formData.typePet) {
      handleError("Por favor, seleccione un tipo de mascota", "typePet");
      setValid({
        ...valid,
        typePet: false
      });
    }
    if (!formData.name) {
      handleError("Por favor, introduzca un nombre", "name");
      setValid({
        ...valid,
        name: false
      });
    }
    if (!formData.breed) {
      handleError("Por favor, introduzca un raza", "breed");
      setValid({
        ...valid,
        breed: false
      });
    }
    if (!formData.age) {
      handleError("Por favor, introduzca la edad", "age");
      setValid({
        ...valid,
        age: false
      });
    }
    if (!formData.weight) {
      handleError("Por favor, introduzca el peso", "weight");
      setValid({
        ...valid,
        weight: false
      });
    }

    if (valid.typePet && valid.name && valid.breed && valid.age && valid.weight) {
      setTimeout(() => {
        dispatch(addNewPet(formData));
        alert(JSON.stringify(formData, null, 2));
      }, 100);
      navigation.goBack();
    }
  };

  if (!petTypes) {
    return <LoadingGif />;
  }

  return (
    <ScrollView>
      <View>
        <View className="p-5">
          <View>
            <View className="flex items-center mb-4">
              {!imagePet ? (
                <View>
                  <Image
                    style={{
                      width: 150,
                      height: 150,
                      resizeMode: "contain"
                    }}
                    source={{
                      uri: "https://img.freepik.com/vector-gratis/coleccion-diferentes-caras-perros_1096-37.jpg"
                    }}
                  />
                </View>
              ) : (
                <View className="rounded-full bg-white flex items-center">
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                      resizeMode: "contain"
                    }}
                    source={{
                      uri: imagePet
                    }}
                  />
                </View>
              )}
            </View>
            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg pb-1 font-bold">
                Tipo de mascota
              </Text>
              <View
                style={{ color: colors.text, borderColor: colors.text }}
                className="border rounded-lg"
              >
                <RNPickerSelect
                  placeholder={{ label: "Seleccionar tipo", value: null }}
                  style={{
                    placeholder: {
                      color: "black"
                    },
                    color: colors.text,
                    borderColor: colors.text
                  }}
                  onValueChange={handleSelect}
                  items={[
                    { label: petTypes[0]?.name, value: petTypes[0]?.name, color: colors.text },
                    { label: petTypes[1]?.name, value: petTypes[1]?.name, color: colors.text },
                    { label: petTypes[2]?.name, value: petTypes[2]?.name, color: colors.text },
                    { label: petTypes[3]?.name, value: petTypes[3]?.name, color: colors.text },
                    { label: petTypes[4]?.name, value: petTypes[4]?.name, color: colors.text }
                  ]}
                />
              </View>
              {!valid.typePet && <Text className="text-xs color-[#ff0000]">{errors.typePet}</Text>}
            </View>
            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg font-bold">
                Nombre
              </Text>
              <View
                style={{ color: colors.text, borderColor: colors.text }}
                className="border rounded-lg pl-3"
              >
                <TextInput
                  style={{ color: colors.text, borderColor: colors.text }}
                  onChangeText={handleChange("name")}
                />
              </View>
              {!valid.name && <Text className="text-xs color-[#ff0000]">{errors.name}</Text>}
            </View>

            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg font-bold">
                Raza
              </Text>
              <View
                style={{ color: colors.text, borderColor: colors.text }}
                className="border rounded-lg pl-3"
              >
                <TextInput
                  style={{ color: colors.text, borderColor: colors.text }}
                  onChangeText={handleChange("breed")}
                />
              </View>
              {!valid.breed && <Text className="text-xs color-[#ff0000]">{errors.breed}</Text>}
            </View>

            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg font-bold">
                Edad
              </Text>
              <View
                style={{ color: colors.text, borderColor: colors.text }}
                className="border rounded-lg pl-3"
              >
                <TextInput
                  style={{ color: colors.text, borderColor: colors.text }}
                  onChangeText={handleChange("age")}
                  keyboardType="numeric"
                />
              </View>
              {!valid.age && <Text className="text-xs color-[#ff0000]">{errors.age}</Text>}
            </View>

            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg font-bold">
                Peso
              </Text>
              <View
                style={{ color: colors.text, borderColor: colors.text }}
                className="border rounded-lg pl-3"
              >
                <TextInput
                  style={{ color: colors.text, borderColor: colors.text }}
                  onChangeText={handleChange("weight")}
                  keyboardType="numeric"
                />
              </View>
              {!valid.weight && <Text className="text-xs color-[#ff0000]">{errors.weight}</Text>}
            </View>
          </View>
        </View>

        <View className="px-5">
          <TouchableOpacity
            className="flex justify-center items-center bg-violet-700 py-2 rounded-lg mb-6"
            onPress={handleValidation}
          >
            <Text className="text-lg text-white">Agregar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default FormAddPet;
