import { Text, View, TouchableOpacity } from "react-native";
import SearchBarFilter from "./SearchBarFilter";
import { Ionicons } from "@expo/vector-icons";

const Filter = ({ openFilter, setOpenFilter }) => {
  return (
    <View className="w-full py-7" style={{ marginLeft: "auto", marginRight: "auto" }}>
      <View className="pl-4">
        <Ionicons
          onPress={() => setOpenFilter(!openFilter)}
          size={32}
          name="md-close-sharp"
        ></Ionicons>
      </View>
      <Text className="flex text-2xl justify-center font-bold">Filtros</Text>
      <Text className="text-lg font-medium p-4">Servicios</Text>
      <View className="flex flex-row flex-wrap pl-4 gap-5 justify-center">
        <TouchableOpacity className="flex w-32 border rounded-md p-2 bg-purple-600">
          <Text className="text-lg text-white">Corte de pelo</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex items-center w-36 border rounded-md p-2 bg-purple-600">
          <Text className="text-lg text-white">Entretenimiento</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex items-center w-32 border rounded-md p-2 bg-purple-600">
          <Text className="text-lg text-white">Paseador</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex items-center w-32 border rounded-md p-2 bg-purple-600">
          <Text className="text-lg text-white">Transporte</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex items-center w-32 border rounded-md p-2 bg-purple-600">
          <Text className="text-lg text-white">Cuidado</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-lg font-medium p-4 pt-5">Buscar Ciudad</Text>
      <View className="pl-4">
        <SearchBarFilter></SearchBarFilter>
      </View>

      <View className="flex flex-row pt-20 justify-center gap-5">
        <TouchableOpacity className="flex items-center w-20 border rounded-md px-5 py-1">
          <Text className="text-lg">Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex items-center w-20 border rounded-md px-5 py-1 bg-purple-600">
          <Text className="text-lg text-white">Aplicar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Filter;
