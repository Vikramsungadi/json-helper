import { Button as ShadCNButton } from "@/components/ui/button"; // ShadCN Button

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <ShadCNButton
      onClick={onClick}
      className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-700 ${className}`}
    >
      {children}
    </ShadCNButton>
  );
};

export default Button;
