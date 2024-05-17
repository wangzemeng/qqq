import { start } from "sdata-plugin-adapter";
import App from "./App";
import { Development } from "./components";

start({
  App,
  Development,
  beforeBootstrap(callback){
    callback();
  },
});
