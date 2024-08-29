import { Button as NextButton, ButtonProps as NextButtonProps } from "@nextui-org/button";

interface ButtonProps extends NextButtonProps {
  children: React.ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <NextButton {...props}>
      {children}
    </NextButton>
  );
}
