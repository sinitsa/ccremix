import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Textarea,
    InputProps,
  } from "@chakra-ui/react";
  import { useField } from "remix-validated-form";
  
  type FormInputProps = {
    name: string;
    label: string;
    isRequired?: boolean;
  };
  
  export const FormTextarea = ({
    name,
    label,
    value,
    isRequired,
    ...rest
  }: FormInputProps & InputProps) => {
    const { getInputProps, error } = useField(name);
  
    return (
      <>
        <FormControl isInvalid={!!error} isRequired={isRequired}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Textarea
            {...getInputProps({
              id: name,
              ...rest,
            })}
          >{value}</Textarea>
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
      </>
    );
  };