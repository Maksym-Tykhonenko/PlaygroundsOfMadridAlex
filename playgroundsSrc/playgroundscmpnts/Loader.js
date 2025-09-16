import { ImageBackground, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import AppBackground from './AppBackground';

const htmlLoader = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: transparent;
        }

        .load-row {
          width: 100px;
          height: 50px;
          line-height: 50px;
          text-align: center;
        }

        .load-row span {
          display: inline-block;
          width: 10px;
          height: 10px;
          margin: 0 3px;
          background: #f76002;
          border-radius: 50%;
          animation: up-down6 0.5s ease-in infinite alternate;
        }

        .load-row span:nth-child(2) {
          background: #e85b04c4;
          animation-delay: 0.16s;
        }

        .load-row span:nth-child(3) {
          background: #e85b0491;
          animation-delay: 0.32s;
        }

        .load-row span:nth-child(4) {
          background: #e85b0456;
          animation-delay: 0.48s;
        }

        @keyframes up-down6 {
          0% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(10px);
          }
        }
      </style>
    </head>
    <body>
      <div class="load-row">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </body>
    </html>
  `;

const Loader = () => {
  return (
    <View style={styles.container}>
      <AppBackground>
        <WebView
          originWhitelist={['*']}
          source={{ html: htmlLoader }}
          style={styles.fullscreen}
          scrollEnabled={false}
          backgroundColor="transparent"
        />
      </AppBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullscreen: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default Loader;
