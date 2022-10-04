import { useMediaQuery } from 'react-responsive';

export default function GenderSelect({ handleRegisterChange, genderError }) {
  const view1 = useMediaQuery({
    query: '(min-width: 539px)',
  });
  const view2 = useMediaQuery({
    query: '(min-width: 850px)',
  });
  const view3 = useMediaQuery({
    query: '(min-width: 1170px)',
  });
  return (
    <div
      className="reg_grid"
      style={{ marginBottom: `${genderError && '90px'}` }}
    >
      <label htmlFor="male">
        Male{' '}
        <input
          type="radio"
          name="gender"
          id="male"
          value="male"
          onChange={handleRegisterChange}
        />
      </label>
      <label htmlFor="male">
        Female{' '}
        <input
          type="radio"
          name="gender"
          id="female"
          value="female"
          onChange={handleRegisterChange}
        />
      </label>
      <label htmlFor="male">
        Other{' '}
        <input
          type="radio"
          name="gender"
          id="other"
          value="other"
          onChange={handleRegisterChange}
        />
      </label>
      {genderError && (
        <div className="input_error gender_error">
          <div className="error_arrow_bottom"></div>
          {genderError}
        </div>
      )}
    </div>
  );
}
