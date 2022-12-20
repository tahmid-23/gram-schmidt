import { ChangeEvent, useCallback, useId } from 'react';
import VectorType from '../../../vector/vector-type';

export interface VectorTypeChooserProps {
  onChange?: (vectorType: VectorType) => void;
}

const VectorTypeChooser = ({ onChange }: VectorTypeChooserProps) => {
  const vectorTypeId = useId();

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
      <label htmlFor={vectorTypeId}>Vector Type:</label>
      &nbsp;
      <select
        id={vectorTypeId}
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
