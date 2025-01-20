
import { Box } from '@chakra-ui/react';
import CodeEditor from './components/CodeEditor';

function App() {
  //const [count, setCount] = useState(0)

  return (
    <Box
      minH="100vh" px={6} py={8}>
      <CodeEditor />

    </Box>
  );


}

export default App;
