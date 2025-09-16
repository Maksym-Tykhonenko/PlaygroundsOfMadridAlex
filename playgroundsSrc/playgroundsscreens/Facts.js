import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import { useState } from 'react';

import AppBackground from '../playgroundscmpnts/AppBackground';
import Header from '../playgroundscmpnts/Header';
import MediumButton from '../playgroundscmpnts/MediumButton';
import { facts } from '../playgroundsdata/facts';
import { AnimatedFactCard } from '../playgroundscmpnts/AnimatedFactCard';

const { height } = Dimensions.get('window');

const Facts = ({}) => {
  const [visibleCount, setVisibleCount] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [firstIndex, setFirstIndex] = useState(0);
  const [showFacts, setShowFacts] = useState(true);

  const currentItems = facts.slice(firstIndex, firstIndex + visibleCount);

  const showNextItem = () => {
    if (firstIndex + visibleCount < facts.length && !isAnimating) {
      setIsAnimating(true);

      if (visibleCount < 3) {
        setVisibleCount(prev => prev + 1);
      } else {
        setFirstIndex(prev => prev + 1);
      }

      setTimeout(() => {
        setIsAnimating(false);
      }, 700);
    }
  };

  return (
    <AppBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Header title={'Interesting facts'} style={{ width: '60%' }} />
          <View style={{ alignItems: 'center' }}>
            <View style={styles.listContainer}>
              {currentItems.map((item, idx) => (
                <AnimatedFactCard
                  key={idx}
                  item={item}
                  index={idx}
                  isVisible={true}
                  delay={200}
                />
              ))}
            </View>
          </View>
          <View style={{ marginTop: 40, alignItems: 'center' }}>
            <View style={{ alignItems: 'center' }}>
              <Image source={require('../assets/images/facts.png')} />
              {showFacts && (
                <Image
                  source={require('../assets/images/facts2.png')}
                  style={styles.image}
                />
              )}
            </View>

            <MediumButton
              title={showFacts ? 'Start read facts!' : 'NEW FACT!'}
              style={{ top: -80 }}
              textStyle={styles.btnText}
              onPress={() => (showFacts ? setShowFacts(false) : showNextItem())}
            />
          </View>
        </View>
      </ScrollView>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: height * 0.072 },
  button: { width: 193, marginBottom: 30 },
  btnText: {
    fontWeight: '600',
    fontSize: 16,
  },
  description: {
    fontWeight: '700',
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
  },
  image: { position: 'absolute', bottom: 116 },
  listContainer: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    zIndex: 30,
    marginHorizontal: 75,
    top: 30,
  },
});

export default Facts;
