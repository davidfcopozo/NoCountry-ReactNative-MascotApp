import {
  Text,
  View,
  Modal,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
  TextInput
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useTheme } from "@react-navigation/native";
import { Children, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { actionLogin } from "../redux/reducers/users";
import { addFavourite, deleteFavourite, fetchFavourites, logOutUser } from "../redux/actions";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import VisitorOptions from "./VisitorOptions";

const UserProfile = ({ route }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { currentUser } = useSelector(state => state.users);
  const user = route?.params ? route.params.user : currentUser?.data;
  const favorited = useSelector(state => state.users.favouriteUsers);
  const userActive = route?.params?.user ? false : true;

  const handleLogOut = () => {
    dispatch(actionLogin(false));
    dispatch(logOutUser());
  };

  const addFavorite = () => {
    dispatch(addFavourite({ currentUser, id: user.id }));
    dispatch(fetchFavourites(currentUser));
  };

  const delFavorite = () => {
    dispatch(deleteFavourite({ currentUser, id: user.id }));
    dispatch(fetchFavourites(currentUser));
  };

  const verifyFavorite = id => {
    const res = favorited
      ?.filter(fav => {
        return fav.id === id;
      })
      .map(res => {
        return res.id;
      });

    return +res === id;
  };

  if (!user)
    return (
      <View>
        <VisitorOptions></VisitorOptions>
      </View>
    );

  return (
    <ScrollView className="p-5 gap-y-5">
      <View className="flex flex-row pl-2">
        {user.profile_pic ? (
          <Image
            style={{
              width: 100,
              height: 100,
              resizeMode: "contain"
            }}
            className="rounded-full"
            source={{
              uri: user.profile_pic
            }}
          />
        ) : (
          <View className="flex justify-center h-[105px] rounded-full bg-white">
            <Ionicons name="person-circle-outline" size={100} />
          </View>
        )}

        <View className="flex justify-between flex-row w-full flex-shrink pl-4">
          <View className="flex flex-col gap-y-2">
            <Text style={{ color: colors.text }} className="text-2xl font-bold -mb-1">
              {user.name} {user.surname}
            </Text>
            <Text numberOfLines={1} style={{ color: colors.textGray }} className="text-sm -mb-1">
              {user.city}
            </Text>
            {user.rating ? (
              <View className="flex flex-row items-center">
                {Children.toArray(
                  Array.from(Array(user.rating)).map(star => (
                    <Ionicons name="star" size={10} color="#ffe100" />
                  ))
                )}
                <Text style={{ color: colors.textGray }} className="text-xs ml-1">
                  {user.rating ? "(" + user.rating + ")" : undefined}
                </Text>
              </View>
            ) : (
              <Text className="text-xs text-white p-1 font-bold bg-violet-600 w-28 text-center rounded-sm">
                Usuario Nuevo
              </Text>
            )}

            {userActive ? (
              <View className="flex flex-row">
                <Pressable
                  style={{ color: colors.text, borderColor: colors.text }}
                  className="border"
                >
                  <Link to={{ screen: "Configuration" }} style={{ padding: 8 }}>
                    <Text style={{ color: colors.text }} className="text-sm font-bold">
                      Configuracion
                    </Text>
                  </Link>
                </Pressable>
              </View>
            ) : (
              <Link
                to={
                  currentUser?.data?.id
                    ? { screen: "Message", params: { user } }
                    : { screen: "Perfil" }
                }
              >
                <View
                  style={{ borderColor: colors.border }}
                  className="flex justify-center items-center border mr-auto"
                >
                  <Text style={{ color: colors.text }} className="py-2 px-5 font-medium">
                    Chatear
                  </Text>
                </View>
              </Link>
            )}
          </View>

          {!userActive ? (
            verifyFavorite(user.id) ? (
              <Ionicons onPress={() => delFavorite()} name="heart" size={30} color={colors.text} />
            ) : (
              <Ionicons
                onPress={() =>
                  currentUser?.data?.id ? addFavorite() : navigation.navigate("Perfil")
                }
                name="heart-outline"
                size={30}
                color={colors.text}
              />
            )
          ) : undefined}
        </View>
      </View>

      <View className="mt-8">
        <Text style={{ color: colors.text }} className="text-xl mb-1 font-bold">
          Sobre mi
        </Text>
        <Text style={{ color: colors.text }} className="text-base">
          {!userActive
            ? user.description
              ? user.description
              : user.name + " todavia no completo este campo."
            : currentUser?.data?.id
            ? user.description
              ? user.description
              : "Aun no completaste este campo."
            : ""}
        </Text>
      </View>

      <View>
        <Text style={{ color: colors.text }} className="text-xl font-bold mb-1">
          Servicios
        </Text>

        {user.offers_services ? (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className="mt-3 gap-x-5"
          >
            <View className="w-36 relative shadow-md rounded-lg overflow-hidden bg-white/10">
              <Image
                className="h-24"
                source={{
                  uri: "https://www.lavanguardia.com/files/content_image_mobile_filter/uploads/2022/05/21/628955615d048.jpeg"
                }}
              />

              <View className="p-2">
                <Text
                  numberOfLines={1}
                  style={{ color: colors.text }}
                  className="text-base font-semibold -mb-1 flex justify-center"
                >
                  {user.categories[0]?.name}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{ color: colors.textGray }}
                  className="text-sm flex justify-center"
                >
                  En {user.city}
                </Text>
              </View>
            </View>

            <View className="w-36 relative shadow-md rounded-lg overflow-hidden bg-white/10">
              <Image
                className="h-24"
                source={{
                  uri: "https://www.lavanguardia.com/files/content_image_mobile_filter/uploads/2022/05/21/628955615d048.jpeg"
                }}
              />

              <View className="p-2">
                <Text
                  numberOfLines={1}
                  style={{ color: colors.text }}
                  className="text-base font-semibold -mb-1 flex justify-center"
                >
                  {user.categories[0]?.name}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{ color: colors.textGray }}
                  className="text-sm flex justify-center"
                >
                  En {user.city}
                </Text>
              </View>
            </View>

            <View className="w-36 relative shadow-md rounded-lg overflow-hidden bg-white/10">
              <Image
                className="h-24"
                source={{
                  uri: "https://www.lavanguardia.com/files/content_image_mobile_filter/uploads/2022/05/21/628955615d048.jpeg"
                }}
              />

              <View className="p-2">
                <Text
                  numberOfLines={1}
                  style={{ color: colors.text }}
                  className="text-base font-semibold -mb-1 flex justify-center"
                >
                  {user.categories[0]?.name}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{ color: colors.textGray }}
                  className="text-sm flex justify-center"
                >
                  En {user.city}
                </Text>
              </View>
            </View>
          </ScrollView>
        ) : (
          <View>
            <Text style={{ color: colors.text }} className="text-base">
              No ofrece servicios
            </Text>
          </View>
        )}
      </View>

      <View>
        <Text style={{ color: colors.text }} className="text-xl font-bold mb-1">
          Mascotas
        </Text>

        {userActive ? (
          <View className="mt-3">
            {userActive ? (
              <View className="flex flex-row gap-x-5">
                <View className="w-36 relative shadow-md rounded-lg overflow-hidden bg-white/10">
                  <Image
                    className="h-24"
                    source={{
                      uri: "https://img.freepik.com/vector-gratis/coleccion-diferentes-caras-perros_1096-37.jpg"
                    }}
                  />

                  <View className="p-2">
                    <Text
                      numberOfLines={1}
                      style={{ color: colors.text }}
                      className="text-base font-semibold -mb-1 flex justify-center"
                    >
                      Nombre
                    </Text>

                    <Text
                      numberOfLines={1}
                      style={{ color: colors.textGray }}
                      className="text-sm flex justify-center"
                    >
                      Raza
                    </Text>
                  </View>
                </View>
                <Pressable onPress={() => navigation.navigate({ name: "FormAddPet" })}>
                  <View className="w-36 relative shadow-md rounded-lg overflow-hidden bg-white/10">
                    <Image
                      className="h-24"
                      source={{
                        uri: "https://thumbs.dreamstime.com/b/agregue-el-icono-signo-m-s-m%C3%A1s-simple-a%C3%B1ade-la-cruz-del-vector-de-muestra-ade-ejemplo-148041788.jpg"
                      }}
                    />

                    <View className="p-2">
                      <Text
                        numberOfLines={1}
                        style={{ color: colors.text }}
                        className="text-base font-semibold -mb-1 flex justify-center"
                      >
                        Agregar mascota
                      </Text>

                      <Text
                        numberOfLines={1}
                        style={{ color: colors.textGray }}
                        className="text-sm flex justify-center"
                      >
                        Toca aqui
                      </Text>
                    </View>
                  </View>
                </Pressable>
              </View>
            ) : (
              <View>
                <Text style={{ color: colors.text }} className="text-base">
                  No tiene mascotas
                </Text>
                <Pressable onPress={() => navigation.navigate({ name: "FormAddPet" })}>
                  <View className="w-36 relative shadow-md rounded-lg overflow-hidden bg-white/10">
                    <Image
                      className="h-24"
                      source={{
                        uri: "https://thumbs.dreamstime.com/b/agregue-el-icono-signo-m-s-m%C3%A1s-simple-a%C3%B1ade-la-cruz-del-vector-de-muestra-ade-ejemplo-148041788.jpg"
                      }}
                    />

                    <View className="p-2">
                      <Text
                        numberOfLines={1}
                        style={{ color: colors.text }}
                        className="text-base font-semibold -mb-1 flex justify-center"
                      >
                        Agregar
                      </Text>

                      <Text
                        numberOfLines={1}
                        style={{ color: colors.textGray }}
                        className="text-sm flex justify-center"
                      >
                        Toca aqui
                      </Text>
                    </View>
                  </View>
                </Pressable>
              </View>
            )}
          </View>
        ) : user.offers_services ? (
          <View className="mt-3">
            {user.offers_services ? (
              <View className="w-36 relative shadow-md rounded-lg overflow-hidden bg-white/10">
                <Image
                  className="h-24"
                  source={{
                    uri: "https://img.freepik.com/vector-gratis/coleccion-diferentes-caras-perros_1096-37.jpg"
                  }}
                />

                <View className="p-2">
                  <Text
                    numberOfLines={1}
                    style={{ color: colors.text }}
                    className="text-base font-semibold -mb-1 flex justify-center"
                  >
                    Nombre
                  </Text>

                  <Text
                    numberOfLines={1}
                    style={{ color: colors.textGray }}
                    className="text-sm flex justify-center"
                  >
                    Raza
                  </Text>
                </View>
              </View>
            ) : (
              <Text style={{ color: colors.text }} className="text-base">
                No tiene mascotas
              </Text>
            )}
          </View>
        ) : (
          <Text style={{ color: colors.text }} className="text-base">
            No tiene mascotas
          </Text>
        )}
      </View>

      {user.offers_services ? (
        <View>
          <Text style={{ color: colors.text }} className="text-xl font-bold mb-1">
            Reseñas
          </Text>

          {user.offers_services ? (
            <View className="shadow-md py-3 px-4 rounded-lg  bg-white/10 mt-2">
              <View className="flex flex-row items-center gap-x-6">
                <View className="">
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      resizeMode: "contain"
                    }}
                    className="rounded-full"
                    source={{
                      uri: "https://p16-tiktok-va-h2.ibyteimg.com/img/musically-maliva-obj/1665843987269638~c5_720x720.jpeg"
                    }}
                  />
                </View>
                <View className="flex flex-col gap-y-1">
                  <View>
                    <Text style={{ color: colors.text }} className="text-base font-medium">
                      Pepito
                    </Text>
                  </View>
                  <View>
                    <Text numberOfLines={1} style={{ color: colors.textGray }} className="text-sm">
                      De San Juan
                    </Text>
                  </View>
                  <View className="">
                    <Text style={{ color: colors.text }} className="text-sm">
                      Muy bueno el compromiso
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View>
              <Text style={{ color: colors.text }} className="text-base">
                No tiene reseñas
              </Text>
            </View>
          )}
        </View>
      ) : undefined}

      {userActive ? (
        <View className="flex justify-center items-center">
          <TouchableOpacity
            onPress={handleLogOut}
            className="bg-violet-700 py-2 px-4 rounded-lg mt-10"
          >
            <Text className="text-xl text-white">Cerrar sesion</Text>
          </TouchableOpacity>
        </View>
      ) : undefined}
    </ScrollView>
  );
};

export default UserProfile;
