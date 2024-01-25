import { ReloadIcon } from '@radix-ui/react-icons';
import { Button, ButtonProps } from './ui/button';

type Props = {
  label?: string;
  loading?: boolean;
};

export const ButtonLoading = ({ label, loading, ...props }: Props & ButtonProps) => {
  return (
    <Button disabled={loading} className="w-full" type="button" {...props}>
      {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      {label}
    </Button>
  );
};
