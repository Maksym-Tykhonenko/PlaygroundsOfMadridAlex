import LinearGradient from 'react-native-linear-gradient';

const AppBackground = ({ children }) => {
  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={['#1A0030', '#0A0015']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {children}
    </LinearGradient>
  );
};

export default AppBackground;
