import Reactotron from 'reactotron-react-native';

Reactotron
  .configure({
    host: '10.210.27.8',
    port: 9090,
  })
  .useReactNative()
  .connect();

console.tron = Reactotron;

export default Reactotron;
