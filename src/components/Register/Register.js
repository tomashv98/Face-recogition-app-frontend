import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }
  onNameChange = e => {
    this.setState({ name: e.target.value });
  };

  onEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  onPasswordChange = e => {
    this.setState({ password: e.target.value });
  };


  onSubmitRegister = async () => {
    try {
      const response = await fetch(`https://face-recognition-bytom.herokuapp.com/register`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        }),
      });
      const parsedResponse = await response.json();
      if (parsedResponse.message) {
         alert(parsedResponse.message);
      } else if (parsedResponse.user) {
        this.props.onRouteChange('home')
      } else {
        alert('Something went wrong! Check server console');
      } 
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
        <main className='pa4 black-80'>
          <form className='measure '>
            <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
              <legend className='f4 fw6 ph0 mh0'>Register</legend>
              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='name'>
                  Name
                </label>
                <input
                  onChange={this.onNameChange}
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='text'
                  name='name'
                  id='name'
                />
              </div>
              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                  Email
                </label>
                <input
                  onChange={this.onEmailChange}
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='email'
                  name='email-address'
                  id='email-address'
                />
              </div>
              <div className='mv3'>
                <label className='db fw6 lh-copy f6' htmlFor='password'>
                  Password
                </label>
                <input
                  onChange={this.onPasswordChange}
                  className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='password'
                  name='password'
                  id='password'
                />
              </div>
            </fieldset>
            <div className=''>
              <input
                onClick={e => {
                  e.preventDefault();
                  this.onSubmitRegister();
                }}
                className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                type='submit'
                value='Register'
              />
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default Register;
