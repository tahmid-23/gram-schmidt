import { useNavigate } from 'react-router-dom';

const QuickNavigation = () => {
  const navigate = useNavigate();

  const onClickHome = () => {
    navigate('/');
  };

  const onClickBack = () => {
    navigate(-1);
  };

  return (
    <>
      <button type="button" onClick={onClickHome}>
        Home
      </button>
      &nbsp;
      <button type="button" onClick={onClickBack}>
        Back
      </button>
    </>
  );
};

export default QuickNavigation;
