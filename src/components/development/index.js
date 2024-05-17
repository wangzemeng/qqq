import {
  DesignConfiguration,
  Main
} from "../index.js"
import mockData, {
  mockCustomConfig,
  mockChangeCustomConfig,
  useRegisterComponent,
  triggerEvent
} from "./mockData.js"
import { DevelopmentWrapper } from 'sdata-plugin-adapter'

const { useState } = window.React
const Development = () => {
  const [customConfig, setCustomConfig] = useState(mockCustomConfig)

  let mainProps = {
    customConfig,
    useRegisterComponent,
    triggerEvent,
    ...mockData
  }

  const changeCustomConfig = (customConfig) => {
    setCustomConfig(JSON.parse(customConfig))
    mockChangeCustomConfig(customConfig)
  }

  return (
    <DevelopmentWrapper
      Main={Main}
      Configuration={DesignConfiguration}
      mainProps={mainProps}
      changeCustomConfig={changeCustomConfig}
    >
    </DevelopmentWrapper>
  )
}

Development.propTypes = {}

export default Development
