import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import cx from 'classnames';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { validateEmail } from '../../utils';
import styles from './styles.scss';
import { contact } from '../../store';

const ContactForm = ({ disabled, actionLabel }) => {
  const router = useRouter();
  const contactInfo = useSelector(contact.selectors.info);
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [letter, setLetter] = useState('');
  const [nameIsValid, setNameIsValid] = useState(false);
  const [organizationIsValid, setOrganizationIsValid] = useState(false);
  const [roleIsValid, setRoleIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [bypaseValidationForName, setbypaseValidationForName] = useState(true);
  const [
    bypaseValidationForOrganization,
    setbypaseValidationForOrganization
  ] = useState(true);
  const [bypaseValidationForEmail, setbypaseValidationForEmail] = useState(
    true
  );
  const [bypaseValidationForRole, setbypaseValidationForRole] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setNameIsValid(name.length > 1);
  }, [name]);

  useEffect(() => {
    setOrganizationIsValid(organization.length > 0);
  }, [organization]);

  useEffect(() => {
    setRoleIsValid(role.length > 0);
  }, [role]);

  useEffect(() => {
    setEmailIsValid(validateEmail(email));
  }, [email]);

  useEffect(() => {
    if (nameIsValid && organizationIsValid && roleIsValid && emailIsValid) {
      dispatch(
        contact.actions.update({
          name,
          organization,
          role,
          email,
          letter
        })
      );
    } else {
      dispatch(contact.actions.update(null));
    }
  }, [nameIsValid, organizationIsValid, roleIsValid, emailIsValid, letter]);

  return (
    <form
      className={cx(styles.contactForm)}
      noValidate
      autoComplete='off'
      id='-search-'
    >
      <TextField
        InputLabelProps={{ shrink: false }}
        className={styles.textField}
        error={!nameIsValid && !bypaseValidationForName}
        helperText={
          !bypaseValidationForName && !nameIsValid
            ? 'Please enter more than 1 characters'
            : undefined
        }
        id='name'
        required
        placeholder='Name'
        variant='filled'
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        onBlur={() => {
          setbypaseValidationForName(false);
        }}
      />
      <TextField
        className={styles.textField}
        error={!organizationIsValid && !bypaseValidationForOrganization}
        helperText={
          !bypaseValidationForOrganization && !organizationIsValid
            ? 'This field is required'
            : undefined
        }
        id='organization'
        required
        placeholder='Organization'
        variant='filled'
        value={organization}
        onChange={(e) => {
          setOrganization(e.target.value);
        }}
        onBlur={() => {
          setbypaseValidationForOrganization(false);
        }}
      />
      <TextField
        className={styles.textField}
        error={!roleIsValid && !bypaseValidationForRole}
        helperText={
          !bypaseValidationForRole && !roleIsValid
            ? 'This field is required'
            : undefined
        }
        id='role'
        required
        placeholder='Role'
        variant='filled'
        value={role}
        onChange={(e) => {
          setRole(e.target.value);
        }}
        onBlur={() => {
          setbypaseValidationForRole(false);
        }}
      />
      <TextField
        className={styles.textField}
        error={!emailIsValid && !bypaseValidationForEmail}
        helperText={
          !bypaseValidationForEmail && !emailIsValid
            ? 'Please enter a valid email address'
            : undefined
        }
        id='email'
        required
        placeholder='Email'
        variant='filled'
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        onBlur={() => {
          setbypaseValidationForEmail(false);
        }}
      />
      <TextField
        className={styles.textField}
        multiline
        rows={1}
        rowsMax={4}
        id='letter'
        placeholder='Note'
        variant='filled'
        value={letter}
        onChange={(e) => {
          setLetter(e.target.value);
        }}
      />
      <Button
        color='primary'
        className={styles.sendBtn}
        variant='outlined'
        onClick={() => {
          router.push('/thank-you', undefined, { shallow: true });
        }}
        disabled={!contactInfo || disabled}
      >
        <div className={styles.btnTxt}>{actionLabel}</div>
      </Button>
    </form>
  );
};

export default ContactForm;
