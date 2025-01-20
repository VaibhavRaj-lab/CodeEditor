import { useRef, useState } from "react";
import { Box, HStack, IconButton, Text } from "@chakra-ui/react";
import { FaSun, FaMoon, FaRedo, FaRegSmile } from "react-icons/fa";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./output";
import { useColorMode } from "@chakra-ui/react";
import { motion } from "framer-motion";
import MonacoEditor from '@monaco-editor/react'; // Import Monaco Editor

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const { colorMode, toggleColorMode } = useColorMode();
  const [isCodeRunning, setIsCodeRunning] = useState(false);
  const [isCodeSuccess, setIsCodeSuccess] = useState(false);

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
    console.log(isCodeSuccess)
    setIsCodeSuccess(true);
    // console.log(isCodeSuccess)

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
    <Box
      bgGradient="linear(to-r, teal.500, green.500)"
      borderRadius="md"
      p={6}
      boxShadow="lg"
      border="1px solid #2d2d2d"
      mt={6}
      position="relative"
      minHeight="100vh"
    >
      {/* Header */}
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "3xl",
          fontWeight: "bold",
          fontFamily: "'Roboto', sans-serif",
          color: colorMode === "dark" ? "white" : "black",
        }}
      >
        Code Editor
      </motion.div>

      {/* Main Content */}
      <HStack
        spacing={6}
        alignItems="flex-start"
        justifyContent="space-between"
        h="80vh"
      >
        {/* Code Editor Section */}
        <Box
          w={{ base: "100%", md: "48%" }}
          h="100%"
          bg={colorMode === "dark" ? "#1a1a1a" : "#ffffff"}
          p={4}
          borderRadius="md"
          boxShadow="lg"
        >
          <LanguageSelector language={language} onSelect={onSelect} />
          <MonacoEditor
            height="calc(100% - 50px)" // Ensure the editor fits well with the selector
            theme={colorMode === "dark" ? "vs-dark" : "light"}
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </Box>

        {/* Output Section */}
        <Box
          w={{ base: "100%", md: "48%" }}
          h="100%"
          bg={colorMode === "dark" ? "#2d2d2d" : "#f5f5f5"}
          p={4}
          borderRadius="md"
          boxShadow="lg"
        >
          {/* <Text
            fontSize="lg"
            color={colorMode === "dark" ? "white" : "black"}
            mb={2}
            fontWeight="semibold"
          >
        
          </Text> */}
          <Output editorRef={editorRef} language={language} codeRunning={isCodeSuccess} />
        </Box>
      </HStack>

      {/* Control Buttons */}
      <HStack
        spacing={4}
        position="absolute"
        top="10px"
        right="20px"
        alignItems="center"
      >
        <IconButton
          aria-label="Toggle Theme"
          icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
          onClick={toggleColorMode}
          colorScheme="teal"
          size="lg"
          borderRadius="full"
        />


      </HStack>

      {/* Success/Failure Prompts */}

    </Box>


  );
};

export default CodeEditor;
