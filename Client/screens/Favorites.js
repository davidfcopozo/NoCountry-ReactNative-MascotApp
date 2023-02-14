import { Image, ScrollView, Text, useColorScheme, View } from "react-native";
import { Link, useTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { sortUsersByRating } from "../redux/actions";
import { useEffect } from "react";
import Highlights from "../components/Highlights";

const Favorites = () => {
  const { colors } = useTheme();

  const dispatch = useDispatch();
  const sortedUsersByRating = useSelector(state => state.users.users);

  useEffect(() => {
    dispatch(sortUsersByRating());
  }, []);

  return (
    <ScrollView>
      <Highlights data={sortedUsersByRating}></Highlights>
    </ScrollView>
  );
};

export default Favorites;
