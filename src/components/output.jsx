import { useEffect, useState } from "react";
import { Box, Button, Text, useToast, IconButton } from "@chakra-ui/react";
import { executeCode } from "../api";
import { FaRedo } from "react-icons/fa";

const Output = ({ editorRef, language, iscodeSuccess }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState(false);
  useEffect(() => {
    console.log(iscodeSuccess)

    return () => {
      console.log(iscodeSuccess)
    }
  }, [iscodeSuccess])
  const codeOuput = () => {
    setOutput(null)
    console.log(output)
  }
  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      iscodeSuccess = true
      console.log("heloo")
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w="50%">
      {/* <Text mb={2} fontSize="lg">

      </Text> */}
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      <IconButton
        aria-label="Reset Code"
        icon={<FaRedo />}
        ml={2}
        mb={3}
        onClick={codeOuput}
        colorScheme="blue"
        size="lg"
        borderRadius="full"
      />
      <Box
        height="75vh"
        p={2}
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}

        borderColor={isError ? "red.500" : "#333"}
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}

      </Box>
    </Box>
  );
};
export default Output;