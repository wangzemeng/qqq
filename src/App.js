import { DesignConfiguration, Main } from "./components";

const renderMap = {
  main: Main,
  designConfiguration: DesignConfiguration,
  designConfigurationForData: DesignConfiguration,
};
const App = (props) => {
  let Comp = () => <></>;
  if (renderMap[props.type]) Comp = renderMap[props.type];
  return <Comp {...props} />
};
App.propTypes = {};

export default App;
