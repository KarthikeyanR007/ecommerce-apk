import Reactotron from 'reactotron-react-native';

Reactotron
  .configure({
    host: '192.168.8.184',
    port: 9090,
  })
  .useReactNative()
  .connect();

console.tron = Reactotron;

export default Reactotron;
