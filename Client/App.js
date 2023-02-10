import { NativeWindStyleSheet } from "nativewind";
import { useState } from "react";
import { NativeRouter } from "react-router-native";
import { Provider } from "react-redux";
import { Image, View, Text, Pressable, useColorScheme, StatusBar } from "react-native";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import store from "./redux/store";

import { HomeIcon, MessageIcon, PawIcon, ProfileIcon, SearchIcon } from "./components/Icons";

import Index from "./screens/Index";
import Home from "./screens/Home";
import Post from "./screens/Post";
import Messages from "./screens/Messages";
import Message from "./screens/Message";
import Profile from "./screens/Profile";
import Search from "./screens/Search";
import AboutUs from "./screens/AboutUs";
import BlogPost from "./screens/BlogPost";

// Habilita Tailwind en React Native Web

NativeWindStyleSheet.setOutput({
  default: "native"
});

// Contenedor de Rutas

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Colores y Temas

const violet = "#7f4dff";
const lightColor = "#fff";
const darkColor = "#010101";

const CustomLight = {
  dark: false,
  colors: {
    background: lightColor,
    border: "#d8d8d8",
    card: lightColor,
    notification: "#ff3b30",
    primary: "#007aff",
    text: "#1c1c1e",
    textGray: "#777",
    violet: "#7f4dff"
  }
};

const CustomDark = {
  dark: true,
  colors: {
    background: darkColor,
    border: "#272729",
    card: darkColor,
    notification: "#ff453a",
    primary: "#0a84ff",
    text: "#fff",
    textGray: "#999",
    violet: "#7f4dff"
  }
};

// Navbar de paginas principales

function BottomNavigation({ isDarkMode, setDarkMode, colors }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerLeft: () => (
          <View className="flex flex-row items-center gap-2">
            <Image
              resizeMode="contain"
              style={{ width: 40, height: 40 }}
              source={require("./assets/logo.png")}
            />
            <View className="pt-1">
              <Image
                resizeMode="contain"
                style={{ width: 120, height: 40 }}
                source={require("./assets/MascotApp.png")}
              />
            </View>
          </View>
        ),
        headerRight: () => (
          <Ionicons
            onPress={() => setDarkMode(!isDarkMode)}
            name="moon-outline"
            size={30}
            color={isDarkMode ? "#fff" : "#000"}
          />
        ),
        headerTitle: "",
        headerStyle: {
          shadowColor: "transparent",
          borderBottomWidth: 0
        },
        headerLeftContainerStyle: {
          paddingLeft: 20
        },
        headerRightContainerStyle: {
          paddingRight: 20
        },
        tabBarStyle: {
          marginBottom: 2
        },
        headerTintColor: colors.text,
        tabBarActiveTintColor: violet,
        tabBarInactiveTintColor: "#999"
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

// Index de Rutas

function App() {
  const [isDarkMode, setDarkMode] = useState(false);

  const { colors } = useTheme();

  // Esto toma el tema del dispositivo
  // const scheme = useColorScheme();

  return (
    <NativeRouter>
      <Provider store={store}>
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

        <NavigationContainer theme={isDarkMode ? CustomDark : CustomLight}>
          <Stack.Navigator
            screenOptions={{
              headerTintColor: isDarkMode ? "#fff" : "#000"
            }}
          >
            <Stack.Screen name="Root" options={{ headerShown: false }}>
              {() => (
                <BottomNavigation
                  isDarkMode={isDarkMode}
                  setDarkMode={setDarkMode}
                  colors={colors}
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="Post"
              component={Post}
              options={({ route }) => ({ title: route.params.title })}
            />

            <Stack.Screen
              name="BlogPost"
              component={BlogPost}
              options={{
                title: "Blog"
              }}
            />

            <Stack.Screen
              name="Message"
              component={Message}
              options={({ route }) => ({ title: route.params.title })}
            />

            <Stack.Screen
              name="AboutUs"
              component={AboutUs}
              options={{
                title: "Acerca de Nosotros"
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </NativeRouter>
  );
}

export default App;
