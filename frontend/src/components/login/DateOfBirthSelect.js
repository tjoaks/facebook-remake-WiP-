import { useMediaQuery } from 'react-responsive';

export default function DateOfBirthSelect({
  bMonth,
  bDay,
  bYear,
  handleRegisterChange,
  months,
  days,
  years,
  dateError,
}) {
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
      style={{ marginBottom: `${dateError && '90px'}` }}
    >
      <select
        name="bMonth"
        value={bMonth}
        id="bMonth"
        onChange={handleRegisterChange}
      >
        {months.map((month, i) => (
          <option value={month} key={i}>
            {month}
          </option>
        ))}
      </select>
      <select
        name="bDay"
        value={bDay}
        id="bDay"
        onChange={handleRegisterChange}
      >
        {days.map((day, i) => (
          <option value={day} key={i}>
            {day}
          </option>
        ))}
      </select>
      <select
        name="bYear"
        value={bYear}
        id="bYear"
        onChange={handleRegisterChange}
      >
        {years.map((year, i) => (
          <option value={year} key={i}>
            {year}
          </option>
        ))}
      </select>
      {dateError && (
        <div className="input_error">
          <div className="error_arrow_bottom"></div>
          {dateError}
        </div>
      )}
    </div>
  );
}
