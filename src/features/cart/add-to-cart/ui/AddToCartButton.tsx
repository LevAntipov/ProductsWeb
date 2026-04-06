import type { ReactNode } from 'react';

import { useNavigate } from 'react-router';

import type { ProductId } from '@entities/product/model/types';

import { useAddCartItemMutation } from '@shared/api';
import { authClient } from '@shared/lib/auth-client';
import { AddButton } from '@shared/ui/add-button/AddButton';

interface AddToCartButtonProps {
  id: ProductId;
  quantity?: number;
  onSuccess?: () => void;
  children: ReactNode;
  className: string;
}
export const AddToCartButton = ({
  id,
  quantity = 1,
  children,
  onSuccess,
  className,
}: AddToCartButtonProps) => {
  const navigate = useNavigate();
  const { data } = authClient.useSession();
  const [addItem, { isLoading }] = useAddCartItemMutation();

  const handleAddButtonClick = async () => {
    if (!data) return navigate('/auth');
    await addItem({ productId: id, quantity });
    onSuccess && onSuccess();
  };

  return (
    <AddButton
      children={children}
      onClick={handleAddButtonClick}
      disabled={isLoading}
      className={className}
    />
  );
};
