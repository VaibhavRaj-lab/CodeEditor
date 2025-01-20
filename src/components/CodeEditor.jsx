import { useRef, useState } from "react";
import { Box, HStack, IconButton, Text } from "@chakra-ui/react";
import { FaSun, FaMoon, FaRedo, FaRegSmile } from "react-icons/fa";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";
import { useColorMode } from "@chakra-ui/react";
import { motion } from "framer-motion";
import MonacoEditor from '@monaco-editor/react'; // Import Monaco Editor

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const { colorMode, toggleColorMode } = useColorMode();
  const [isCodeRunning, setIsCodeRunning] = useState(false);
  const [isCodeSuccess, setIsCodeSuccess] = useState(null);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const resetCode = () => {
    setValue(CODE_SNIPPETS[language]);
    setIsCodeSuccess(null);
  };

  const runCode = () => {
    setIsCodeRunning(true);
    setIsCodeSuccess(null);
    setTimeout(() => {
      setIsCodeRunning(false);
      const success = Math.random() > 0.5;
      setIsCodeSuccess(success ? "success" : "error");
    }, 2000);
  };

  return (
    <Box bgGradient="linear(to-r, teal.500, green.500)" borderRadius="md" p={4} boxShadow="lg" border="1px solid #2d2d2d" mt={6} position="relative" minHeight="100vh">
      <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 1 }} style={{ textAlign: "center", marginBottom: "20px", fontSize: "3xl", fontWeight: "bold", fontFamily: "'Roboto', sans-serif", color: colorMode === "dark" ? "white" : "black" }}>
        Code Editor
      </motion.div>

      <HStack spacing={4}>
        <Box w="50%" h="80vh">
          <LanguageSelector language={language} onSelect={onSelect} />
          <MonacoEditor
            height="100%"
            theme={colorMode === "dark" ? "vs-dark" : "light"}
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </Box>

        <Box w="50%" h="80vh" bg={colorMode === "dark" ? "#2d2d2d" : "#f5f5f5"} p={4} borderRadius="md" boxShadow="lg">
          <Text fontSize="lg" color={colorMode === "dark" ? "white" : "black"} mb={2}>Output</Text>
          <Output editorRef={editorRef} language={language} />
        </Box>
      </HStack>

      {/* Theme toggle and reset buttons */}
      <IconButton aria-label="Toggle Theme" icon={colorMode === "dark" ? <FaSun /> : <FaMoon />} onClick={toggleColorMode} position="absolute" top="10px" right="20px" colorScheme="teal" size="lg" borderRadius="full" />
      <IconButton aria-label="Reset Code" icon={<FaRedo />} onClick={resetCode} position="absolute" top="10px" right="100px" colorScheme="blue" size="lg" borderRadius="full" />
      <IconButton aria-label="Run Code" icon={<FaRegSmile />} onClick={runCode} position="absolute" bottom="20px" right="20px" colorScheme="green" size="lg" borderRadius="full" />

      {/* Success/Failure prompt */}
      {isCodeSuccess === "success" && (
        <motion.div animate={{ scale: 1.2 }} initial={{ scale: 0.8 }} transition={{ duration: 0.5 }} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "yellow", padding: "10px 20px", borderRadius: "20px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", color: "green", fontWeight: "bold", fontSize: "20px" }}>
          🎉 Congratulations! Code ran successfully! 🎆
        </motion.div>
      )}

      {isCodeSuccess === "error" && (
        <motion.div animate={{ scale: 1.2 }} initial={{ scale: 0.8 }} transition={{ duration: 0.5 }} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "red", padding: "10px 20px", borderRadius: "20px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", color: "white", fontWeight: "bold", fontSize: "20px" }}>
          😞 Oops! Something went wrong with the code. Try again. 🚫
        </motion.div>
      )}
    </Box>
  );
};

export default CodeEditor;
