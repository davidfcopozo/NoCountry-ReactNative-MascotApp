import { Text, View, Image, Pressable, ScrollView } from "react-native";
import { Link, useTheme } from "@react-navigation/native";

const Shortcuts = ({ navigate }) => {
  const { colors } = useTheme();

  return navigate === false ? (
    <View className="flex flex-wrap flex-row py-5 gap-4 justify-center">
      <View className="gap-y-2">
        <View className="bg-pink-200 items-center p-4 rounded-xl">
          <Image
            style={{
              width: 55,
              height: 55,
              resizeMode: "contain"
            }}
            source={require("../assets/pet_haircut.png")}
          />
        </View>
        <Text className="text-center font-bold" style={{ color: colors.text }}>
          Corte de Pelo
        </Text>
      </View>

      <View className="gap-y-2">
        <View className="bg-pink-200 items-center p-4 rounded-xl">
          <Image
            style={{
              width: 55,
              height: 55,
              resizeMode: "contain"
            }}
            source={require("../assets/pet_walk.png")}
          />
        </View>
        <Text className="text-center font-bold" style={{ color: colors.text }}>
          Paseador
        </Text>
      </View>

      <View className="gap-y-2">
        <View className="bg-pink-200 items-center p-4 rounded-xl">
          <Image
            style={{
              width: 55,
              height: 55,
              resizeMode: "contain"
            }}
            source={require("../assets/pet_transport.png")}
          />
        </View>
        <Text className="text-center font-bold" style={{ color: colors.text }}>
          Transporte
        </Text>
      </View>

      <View className="gap-y-2">
        <View className="bg-pink-200 items-center p-4 rounded-xl">
          <Image
            style={{
              width: 55,
              height: 55,
              resizeMode: "contain"
            }}
            source={require("../assets/pet_care.png")}
          />
        </View>
        <Text className="text-center font-bold" style={{ color: colors.text }}>
          Cuidado
        </Text>
      </View>

      <View className="gap-y-2">
        <View className="bg-pink-200 items-center p-4 rounded-xl">
          <Image
            style={{
              width: 55,
              height: 55,
              resizeMode: "contain"
            }}
            source={require("../assets/pet_training.png")}
          />
        </View>
        <Text className="text-center font-bold" style={{ color: colors.text }}>
          Entrenamiento
        </Text>
      </View>
    </View>
  ) : (
    <View className="flex items-center justify-center mt-16">
      <View className="flex justify-center pt-4">
        <Text style={{ color: colors.text }} className="flex justify-center text-xl font-semibold">
          Elige un servicio
        </Text>
      </View>
      <View className="flex flex-wrap flex-row py-5 px-5 gap-4 justify-center items-center">
        <Link
          to={{
            screen: "FormJobOffers",
            params: { category: "Peluqueria", title: "Corte de pelo" }
          }}
        >
          <View className="gap-y-2">
            <View className="bg-pink-200 items-center p-4 rounded-xl">
              <Image
                style={{
                  width: 55,
                  height: 55,
                  resizeMode: "contain"
                }}
                source={require("../assets/pet_haircut.png")}
              />
            </View>
            <Text className="text-center font-bold" style={{ color: colors.text }}>
              Corte de Pelo
            </Text>
          </View>
        </Link>

        <Link
          to={{
            screen: "FormJobOffers",
            params: { category: "Paseo", title: "Paseador" }
          }}
        >
          <View className="gap-y-2">
            <View className="bg-pink-200 items-center p-4 rounded-xl">
              <Image
                style={{
                  width: 55,
                  height: 55,
                  resizeMode: "contain"
                }}
                source={require("../assets/pet_walk.png")}
              />
            </View>
            <Text className="text-center font-bold" style={{ color: colors.text }}>
              Paseador
            </Text>
          </View>
        </Link>

        <Link
          to={{
            screen: "FormJobOffers",
            params: { category: "Transporte", title: "Transporte" }
          }}
        >
          <View className="gap-y-2">
            <View className="bg-pink-200 items-center p-4 rounded-xl">
              <Image
                style={{
                  width: 55,
                  height: 55,
                  resizeMode: "contain"
                }}
                source={require("../assets/pet_transport.png")}
              />
            </View>
            <Text className="text-center font-bold" style={{ color: colors.text }}>
              Transporte
            </Text>
          </View>
        </Link>

        <Link
          to={{
            screen: "FormJobOffers",
            params: { category: "Alojamiento", title: "Cuidado" }
          }}
        >
          <View className="gap-y-2">
            <View className="bg-pink-200 items-center p-4 rounded-xl">
              <Image
                style={{
                  width: 55,
                  height: 55,
                  resizeMode: "contain"
                }}
                source={require("../assets/pet_care.png")}
              />
            </View>
            <Text className="text-center font-bold" style={{ color: colors.text }}>
              Cuidado
            </Text>
          </View>
        </Link>

        <Link
          to={{
            screen: "FormJobOffers",
            params: { category: "Entrenamiento", title: "Entrenamiento" }
          }}
        >
          <View className="gap-y-2">
            <View className="bg-pink-200 items-center p-4 rounded-xl">
              <Image
                style={{
                  width: 55,
                  height: 55,
                  resizeMode: "contain"
                }}
                source={require("../assets/pet_training.png")}
              />
            </View>
            <Text className="text-center font-bold" style={{ color: colors.text }}>
              Entrenamiento
            </Text>
          </View>
        </Link>
      </View>
    </View>
  );
};

export default Shortcuts;
