import { useTheme } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { FlatList, useWindowDimensions, View } from "react-native";
import OnboardingFooter from "../components/OnboardingFooter";
import OnboardingSlide from "../components/OnboardingSlide";
import slides from "../db/onboardingSlides";

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
        renderItem={({ item }) => (
          <OnboardingSlide image={item.image} title={item.title} description={item.description} />
        )}
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
