import Reactotron from 'reactotron-react-native';

Reactotron
  .configure({
    host: '10.167.130.8',
    port: 9090,
  })
  .useReactNative()
  .connect();

console.tron = Reactotron;

export default Reactotron;
