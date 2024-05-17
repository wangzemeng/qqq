function DesignConfiguration(props) {
  //此处的customConfig已经封装完毕，可以直接使用
  const {Button, Input} = window.antd
  const {changeCustomConfig, customConfig} = props;
  const {useState} = window.React
  const [id, setId] = useState(customConfig.id)
  const idChange = ({target}) => {
    customConfig.id = target.value
    setId(target.value)
    changeCustomConfig(JSON.stringify(customConfig))
  }

  return (
    <div>
      <div>id:</div>
      <Input onChange={idChange} value={id}></Input>
    </div>
  );
}

export default DesignConfiguration;
