import Reactotron from 'reactotron-react-native';

Reactotron
  .configure({
    host: '172.20.10.5',
    port: 9090,
  })
  .useReactNative()
  .connect();

console.tron = Reactotron;

export default Reactotron;
