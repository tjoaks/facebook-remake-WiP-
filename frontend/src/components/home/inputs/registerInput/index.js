import { useField, ErrorMessage } from 'formik';
import './style.css';
import { useMediaQuery } from 'react-responsive';

export default function RegisterInput({ placeholder, bottom, ...props }) {
  const [field, meta] = useField(props);
  const desktopView = useMediaQuery({ query: '(min-width: 850px)' });
  return (
    <div className="input_wrap register_input_wrap">
      {meta.touched && meta.error && !bottom && (
        <div
          className={
            desktopView ? 'input_error input_error_desktop' : 'input_error'
          }
          styles={{ translate: 'translateY(2px)' }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={desktopView ? 'error_arrow_left' : 'error_arrow_top'}
            ></div>
          )}
        </div>
      )}
      <input
        className={meta.touched && meta.error ? 'input_error_border' : ''}
        placeholder={placeholder}
        type={field.type}
        name={field.name}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && bottom && (
        <div
          className={
            desktopView ? 'input_error input_error_desktop' : 'input_error'
          }
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={
                desktopView ? 'error_arrow_left' : 'error_arrow_bottom'
              }
            ></div>
          )}
        </div>
      )}

      {meta.touched && meta.error && (
        <i
          className="error_icon"
          style={{ top: `${!bottom && !desktopView ? '63%' : '15px'}` }}
        ></i>
      )}
    </div>
  );
}

/*notesss*/
