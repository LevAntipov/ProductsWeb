import type { ReactNode } from 'react';

import { useNavigate } from 'react-router';

import { useAddCartItemMutation } from '@entities/cart/api/cart-api';
import type { ProductId } from '@entities/product/model/types';

import { authClient } from '@shared/lib/auth-client';
import { Button } from '@shared/ui/add-button/AddButton';

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
    <Button
      children={children}
      onClick={handleAddButtonClick}
      disabled={isLoading}
      className={className}
    />
  );
};
