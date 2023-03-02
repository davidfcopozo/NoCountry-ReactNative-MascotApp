import { useTheme } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { FlatList, useWindowDimensions, View } from "react-native";
import OnboardingFooter from "../components/OnboardingFooter";
import OnboardingSlide from "../components/OnboardingSlide";

const slides = [
  {
    id: "1",
    image: require("../assets/People_with_dogs.png"),
    title: "Conectamos Mascoteros y dueños de mascotas",
    description:
      "Si necesitas algún tipo de cuidado para tu mascota, ofrecer tus servicios o ambos, en MascotApp lo puedes hacer."
  },
  {
    id: "2",
    image: require("../assets/pet-sitter-city.png"),
    title: "Encuentra y ofrece servicios en tu ciudad",
    description:
      "En cuestión de segundos podras encontrar Mascoteros cerca de tí u ofrecer tus servicios en tu ciudad."
  },
  {
    id: "3",
    image: require("../assets/pet-sitter-owner.png"),
    title: "¡A cuidar las mascotas!",
    description:
      "Contacta al Mascotero o comunícate con dueños de mascotas para contratar los servicios."
  }
];

const OnboardingScreen = ({ setFinishedOnboarding }) => {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef();

  const updateCurrentSlide = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const next = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlide}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <OnboardingSlide item={item} />}
      />
      <OnboardingFooter
        currentSlideIndex={currentSlideIndex}
        slides={slides}
        skip={skip}
        next={next}
        setFinishedOnboarding={setFinishedOnboarding}
      />
    </View>
  );
};

export default OnboardingScreen;
