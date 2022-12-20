import { ChangeEvent, useCallback } from 'react';
import VectorType from '../../../vector/vector-type';

export interface VectorInputProps {
  vectorType: VectorType;
  onChange?: (newInput: string) => void;
  onDelete?: () => void;
}

const VectorInput = ({ vectorType, onChange, onDelete }: VectorInputProps) => {
  const onVectorChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange!(e.currentTarget.value);
    },
    [onChange]
  );

  const getPatternTitle = useCallback(() => {
    switch (vectorType) {
      case VectorType.REGULAR: {
        return 'Comma-separated list of numbers';
      }
      case VectorType.POLYNOMIAL: {
        return 'Function expression';
      }
    }
  }, [vectorType]);

  const getPattern = useCallback(() => {
    switch (vectorType) {
      case VectorType.REGULAR: {
        return '-?(\\d+(\\.)?\\d*|\\.\\d+)(\\s*,\\s*-?(\\d+(\\.)?\\d*|\\.\\d+))*';
      }
      case VectorType.POLYNOMIAL: {
        return '.*';
      }
    }
  }, [vectorType]);

  return (
    <li>
      <input
        title={getPatternTitle()}
        type="text"
        pattern={getPattern()}
        required
        onChange={onChange && onVectorChanged}
      />
      &nbsp;
      <button type="reset" onClick={onDelete}>
        Delete
      </button>
    </li>
  );
};

export default VectorInput;
