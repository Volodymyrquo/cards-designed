import React, { Component } from 'react';
import { END_POINTS, fetchValidateName, makeFetch } from '../common/functions';
import iconEnter from '../images/sumra/icon-enter.svg';
import personIcon from '../images/sumra/icon-person.svg';
import personOrange from '../images/sumra/icon-person-orange.svg';
import iconBlock from '../images/sumra/icon-block.svg';
import checkGreen from '../images/sumra/icon-check-green.svg';

type Props = {
  /**
   * Function to step on click.
   */
  onStep: Function,
};

type State = {
  /**
   * Verification code.
   */
  verificationCode: String[],

  /**
   * User name check validate
   */
  invalidUserName: Boolean,

  /**
   * User name
   */
  username: String,
};

export class UserForm extends Component<Props, State> {
  /**
   * Initializes a new {@code ConfirmForm} instance.
   *
   * @param {Props} props - The React {@code Component} props to initialize
   * the new {@code ConfirmForm} instance with.
   */
  constructor(props) {
    super(props);

    const { state } = this.props;

    this.state = {
      ...state,

      username: '',
      invalidUserName: false,
    };

    this.timerID = null;
  }

  /**
   * Render
   *
   * @private
   * @returns {void}
   */
  render() {
    const { invalidUserName, username } = this.state;
    let { className } = this.props;

    className += ' user-signup-form';

    let message, personIconSrc, validIconSrc, filedsetClassName;

    if (!username) {
      filedsetClassName = 'sumra-input-fieldset';
      personIconSrc = personIcon;
      validIconSrc = null;
      message = null;
    } else {
      filedsetClassName = 'sumra-input-fieldset available';
      personIconSrc = personOrange;
      if (invalidUserName) {
        validIconSrc = iconBlock;
        message = (
          <div className='sumra-input-message error'>
            This username is already taken.
          </div>
        );
      } else {
        validIconSrc = checkGreen;
        message = (
          <div className='sumra-input-message success'>
            This username is available.
          </div>
        );
      }
    }

    return (
      <div className={className}>
        <h1 className='h1-title'>Enter username</h1>

        <form>
          <fieldset className={filedsetClassName}>
            <legend>User name</legend>

            <img
              className='sumra-input-fieldset-icon'
              src={personIconSrc}
              width='22'
              alt='person icon'
            />

            <input
              type='text'
              placeholder='Enter username'
              onChange={this._changeInput}
            />

            <img
              className='sumra-input-fieldset-icon-right'
              src={validIconSrc}
              width='22'
              alt='valid icon'
            />
          </fieldset>

          {message}

          <button className='sumra-Button' onClick={this._submitUserForm}>
            <img
              className='sumra-Button-icon-left'
              src={iconEnter}
              width='18'
              alt='icon enter'
            />

            <span>Submit</span>
          </button>
        </form>
      </div>
    );
  }

  /**
   * Set state after changed verification code.
   *
   * @param {Event} event - The HTML Event which details the form submission.
   * @private
   * @returns {void}
   */
  _changeInput = (event) => {
    const value = event.target.value;

    this.setState({ username: value });

    if (this.timerID) {
      clearTimeout(this.timerID);
    }

    this.timerID = setTimeout(() => {
      fetchValidateName(value)
        .then((response) => {
          if (response.status === 200) {
            this.setState({ invalidUserName: false });
          } else {
            this.setState({ invalidUserName: true });
          }
        })
        .catch(console.error);
    }, 300);
  };

  /**
   * Submit verification code.
   *
   * @param {Event} event - The HTML Event which details the form submission.
   * @protected
   * @returns {void}
   */
  _submitUserForm = async (event) => {
    event.preventDefault();

    if (this.state.invalidUserName) {
      return;
    }

    let response = await makeFetch(END_POINTS.REGISTRATION, {
      code: this.state.verificationCode,
      username: this.state.username,
    });

    if (response.ok) {
      console.log(response);
      const json = await response.json();
      alert(json);
      console.log(json);
    }
  };
}
