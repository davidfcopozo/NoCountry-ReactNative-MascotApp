import { withExpoSnack, useColorScheme } from "nativewind";

import { View, Image, Text, StatusBar } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Search from "./screens/Search";
import Index from "./screens/Index";
import Home from "./screens/Home";
import Messages from "./screens/Messages";
import Message from "./screens/Message";
import Profile from "./screens/Profile";
import Post from "./screens/Post";
import {
  HomeIcon,
  MessageIcon,
  PawIcon,
  ProfileIcon,
  SearchIcon
} from "./components/Icons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Root de colores de Dark y Light Mode

const DarkModeColor = "#000";
const LightModeColor = "#fff";

//NavBar de abajo, se usaria como links para pasar a una vista, renderiza en el orden en que esta declarado

function BottomNav() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitle: "",
        headerStyle: {
          height: 110,
          shadowColor: "transparent",
          backgroundColor:
            colorScheme === "dark" ? DarkModeColor : LightModeColor
        },
        headerLeft: () => (
          <Image
            style={{ marginLeft: 15, resizeMode: "contain" }}
            className="h-12 w-12"
            source={require("./assets/logo.png")}
          />
        ),
        headerRight: () => (
          <Ionicons
            onPress={toggleColorScheme}
            style={{ marginRight: 20 }}
            name="moon-outline"
            size={30}
            color={colorScheme === "dark" ? "#fff" : "#000"}
          />
        ),
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor:
            colorScheme === "dark" ? DarkModeColor : LightModeColor,
          marginBottom: 15
        },
        tabBarActiveTintColor: "#7f4dff",
        tabBarInactiveTintColor:
          colorScheme === "dark" ? LightModeColor : "#000"
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={Index}
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: props => <HomeIcon color={props.color} />
        }}
      />
      <Tab.Screen
        name="Buscar"
        component={Search}
        options={({ route }) => ({
          tabBarLabel: "Buscar",
          tabBarIcon: props => <SearchIcon color={props.color} />
        })}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Explorar",
          tabBarIcon: props => <PawIcon color={props.color} />
        }}
      />
      <Tab.Screen
        name="Mensajes"
        component={Messages}
        options={{
          tabBarLabel: "Mensajes",
          tabBarIcon: props => <MessageIcon color={props.color} />,
          tabBarBadge: 3
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: props => <ProfileIcon color={props.color} />
        }}
      />
    </Tab.Navigator>
  );
}

//Nav Container renderiza por defecto el BottomNav
// Screen 1 : headershow desactiva el titulo para pasarle la prioridad al BottomNav
// Screen 2 : Post renderiza los posts de Mascoteros cerca de ti
// Screen 3 : Renderiza el Mensaje entre Cliente y Cuidador

function App() {
  const { colorScheme } = useColorScheme();

  return (
    <>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: colorScheme === "dark" ? DarkModeColor : LightModeColor
          }
        }}
      >
        <Stack.Navigator>
          <Stack.Screen
            name="Root"
            component={BottomNav}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Post"
            component={Post}
            options={({ route }) => ({ title: route.params.title })}
          />
          <Stack.Screen
            name="Message"
            component={Message}
            options={({ route }) => ({ title: route.params.title })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default withExpoSnack(App);
