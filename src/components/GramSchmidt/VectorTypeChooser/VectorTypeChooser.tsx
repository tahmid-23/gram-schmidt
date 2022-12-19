import { ChangeEvent, FC, useCallback } from 'react';
import VectorType from '../../../vector/vector-type';

interface VectorTypeChooserProps {
  onChange?: (vectorType: VectorType) => void;
}

const VectorTypeChooser: FC<VectorTypeChooserProps> = ({ onChange }) => {
  const onSetVectorType = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const vectorType =
        VectorType[e.currentTarget.value as keyof typeof VectorType];
      onChange!(vectorType);
    },
    [onChange]
  );

  return (
    <>
      <label htmlFor="id">Vector Type:</label>
      &nbsp;
      <select
        id="vector-type"
        title="Vector Type"
        onChange={onChange && onSetVectorType}
      >
        <option value={VectorType.REGULAR}>Regular</option>
        <option value={VectorType.POLYNOMIAL}>Polynomial</option>
      </select>
    </>
  );
};

export default VectorTypeChooser;
