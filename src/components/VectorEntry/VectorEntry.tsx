import { FC } from 'react';
import VectorType from '../../vector/vector-type';

interface VectorInputProps {
  vectorType: VectorType;
  onChange?: (newInput: string) => void;
  onDelete?: () => void;
}

const VectorInput: FC<VectorInputProps> = ({
  vectorType,
  onChange,
  onDelete,
}) => {
  const getPatternTitle = () => {
    switch (vectorType) {
      case VectorType.REGULAR: {
        return 'Comma-separated list of numbers';
      }
      case VectorType.POLYNOMIAL: {
        return 'Function expression';
      }
    }
  };

  const getPattern = () => {
    switch (vectorType) {
      case VectorType.REGULAR: {
        return '(\\s*-?\\d+(\\.\\d+)?)(\\s*,\\s*-?\\d+(\\.\\d+)?)*';
      }
      case VectorType.POLYNOMIAL: {
        return '.*';
      }
    }
  };

  return (
    <li>
      <input
        title={getPatternTitle()}
        type="text"
        pattern={getPattern()}
        required
        onChange={
          onChange &&
          ((e) => {
            onChange(e.currentTarget.value);
          })
        }
      />
      &nbsp;
      <button type="button" onClick={onDelete}>
        Delete
      </button>
    </li>
  );
};

export default VectorInput;
