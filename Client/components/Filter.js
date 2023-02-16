import { Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { searchView } from "../redux/actions";

const Filter = ({ openFilter, setOpenFilter, currentSearch}) => {
  const { colors } = useTheme();

  const [filters, setFilters] = useState({
    hair: false,
    walk: false,
    transport: false,
    care: false,
    training: false
  })

  const dispatch = useDispatch();

  function createQuery(){
    let filterBy = "?"

    filterBy = filters.walk? filterBy+"&walk=1" : filterBy
    filterBy = filters.care? filterBy+"&care=2" : filterBy
    filterBy = filters.transport?  filterBy+"&transport=3" : filterBy
    filterBy = filters.training? filterBy+"&training=4" : filterBy
    filterBy = filters.hair? filterBy+"&hair=5" : filterBy

    dispatch(searchView({...filters, ...currentSearch}));

    console.log(filterBy);
  }

  return (
    <View
      style={{
        color: colors.text,
        backgroundColor: colors.background,
        borderTopColor: colors.text
      }}
      className="p-5 mt-auto border-t"
    >
      <View className="flex flex-row justify-between w-full mb-8">
        <Ionicons
          style={{ color: colors.text }}
          onPress={() => setOpenFilter(!openFilter)}
          size={32}
          name="md-close-sharp"
        ></Ionicons>
        <Text style={{ color: colors.text }} className="flex text-2xl items-center font-bold">
          Filtros
        </Text>

        <Text style={{ width: 32 }}></Text>
      </View>

      <Text style={{ color: colors.text }} className="text-xl font-bold mb-3">
        Servicios
      </Text>

      <View className="flex flex-row flex-wrap gap-2">

        <TouchableOpacity className={"border rounded-md p-2"+ (filters.walk? " bg-violet-400 border-black/20" : " border-black/30 bg-violet-600")}  onPress={() => setFilters({...filters, walk : !filters.walk})}>
          <Text className="text-lg text-white">Paseador</Text>
        </TouchableOpacity>
        <TouchableOpacity className={"border rounded-md p-2"+ (filters.care? " bg-violet-400 border-black/20" : " border-black/30 bg-violet-600")}  onPress={() => setFilters({...filters, care : !filters.care})}>
          <Text className="text-lg text-white">Alojamiento</Text>
        </TouchableOpacity>
        <TouchableOpacity className={"border rounded-md p-2"+ (filters.transport? " bg-violet-400 border-black/20" : " border-black/30 bg-violet-600")}  onPress={() => setFilters({...filters, transport : !filters.transport})}>
          <Text className="text-lg text-white">Transporte</Text>
        </TouchableOpacity>
        <TouchableOpacity className={"border rounded-md p-2"+ (filters.training? " bg-violet-400 border-black/20" : " border-black/30 bg-violet-600")}  onPress={() => setFilters({...filters, training : !filters.training})}>
          <Text className="text-lg text-white">Entrenamiento</Text>
        </TouchableOpacity>
        <TouchableOpacity className={"border rounded-md p-2"+ (filters.hair? " bg-violet-400 border-black/20" : " border-black/30 bg-violet-600")} onPress={() => setFilters({...filters, hair : !filters.hair})}>
          <Text className="text-lg text-white">Corte de pelo</Text>
        </TouchableOpacity>

      </View>

      <View className="flex flex-row justify-center items-center py-20 gap-5">
        <TouchableOpacity
          style={{ borderColor: colors.text }}
          className="border rounded-md p-2 w-20 items-center"
          onPress={() => setFilters({
            hair: false,
            walk: false,
            transport: false,
            care: false,
            training: false
          })}
        >
          <Text style={{ color: colors.text }} className="text-lg">
            Limpiar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="border border-black/30 rounded-md p-2  w-20 items-center bg-violet-600"
          onPress={() => createQuery()}
        >
          <Text className="text-lg text-white">Aplicar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Filter;
